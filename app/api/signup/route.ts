import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const SHEET_ID = process.env.GOOGLE_SHEET_ID
    const GOOGLE_API_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

    if (!SHEET_ID || !GOOGLE_API_KEY) {
      console.error("[v0] Missing Google Sheets credentials")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    let credentials
    try {
      // Trim whitespace and parse the service account key
      const trimmedKey = GOOGLE_API_KEY.trim()
      credentials = JSON.parse(trimmedKey)
    } catch (parseError) {
      console.error("[v0] Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:", parseError)
      console.error("[v0] Key starts with:", GOOGLE_API_KEY.substring(0, 50))
      return NextResponse.json({ error: "Invalid service account configuration" }, { status: 500 })
    }

    // Get access token using service account
    const jwtToken = await getGoogleAccessToken(credentials)

    // Append to Google Sheet
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:B:append?valueInputOption=USER_ENTERED`

    const timestamp = new Date().toISOString()

    const response = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[email, timestamp]],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Google Sheets API error:", JSON.stringify(errorData, null, 2))

      if (errorData.error?.code === 403) {
        if (errorData.error.message.includes("API has not been used")) {
          return NextResponse.json(
            { error: "Google Sheets API is not enabled. Please enable it in Google Cloud Console." },
            { status: 500 },
          )
        }
        return NextResponse.json(
          { error: "Permission denied. Please check that the service account has access to the sheet." },
          { status: 500 },
        )
      }

      return NextResponse.json({ error: "Failed to save email" }, { status: 500 })
    }

    console.log("[v0] New signup saved to Google Sheets:", email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 })
  }
}

async function getGoogleAccessToken(credentials: any) {
  const { client_email, private_key } = credentials

  // Create JWT
  const header = {
    alg: "RS256",
    typ: "JWT",
  }

  const now = Math.floor(Date.now() / 1000)
  const claim = {
    iss: client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  }

  // Import crypto for signing
  const { subtle } = globalThis.crypto

  // Encode header and claim
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedClaim = base64UrlEncode(JSON.stringify(claim))
  const signatureInput = `${encodedHeader}.${encodedClaim}`

  // Import private key
  const keyData = private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, "")
  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0))

  const cryptoKey = await subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  )

  // Sign the JWT
  const signature = await subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(signatureInput))

  const encodedSignature = base64UrlEncode(signature)
  const jwt = `${signatureInput}.${encodedSignature}`

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  })

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

function base64UrlEncode(data: string | ArrayBuffer): string {
  let base64: string
  if (typeof data === "string") {
    base64 = btoa(data)
  } else {
    base64 = btoa(String.fromCharCode(...new Uint8Array(data)))
  }
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}
