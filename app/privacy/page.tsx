"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LiquidGlass } from "@/components/liquid-glass"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black">
      {/* Liquid Glass effect */}
      <LiquidGlass width={300} height={200} className="fixed top-6 left-6 z-50" />

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-white leading-relaxed text-base" style={{ fontFamily: "Times New Roman, serif" }}>
            <p className="mb-4">
              <span className="font-bold">Privacy Policy</span>
            </p>
            <p className="mb-4">
              <span className="font-bold">Last Updated: August 25, 2025</span>
            </p>
            <p className="mb-4">
              AriaReply is committed to protecting your privacy and ensuring that your personal information is handled
              responsibly. This Privacy Policy outlines what data we collect, how we use it, and the choices you have
              regarding your information when you use AriaReply.
            </p>

            <p className="mb-4">
              <span className="font-bold">1. Information We Collect</span>
            </p>
            <p className="mb-4">
              We may collect the following categories of information:
              <br />• Account Information: Email address, device information, and basic authentication details when you
              create or access your account.
              <br />• Message Data: To generate responses, AriaReply may process the content of your messages. Message
              data is handled securely and is not used to train shared models unless explicitly stated.
              <br />• Usage Information: Interaction logs, performance metrics, and feature usage patterns to improve
              platform reliability and functionality.
              <br />• Technical Data: IP address, device type, operating system, and diagnostic information for security
              and troubleshooting.
            </p>

            <p className="mb-4">
              <span className="font-bold">2. How We Use Your Information</span>
            </p>
            <p className="mb-4">
              We use collected information to:
              <br />• Provide, maintain, and improve AriaReply's services.
              <br />• Deliver AI-generated responses and personalized user experiences.
              <br />• Ensure platform safety, security, and fraud prevention.
              <br />• Communicate updates, support information, or service-related notices.
              <br />• Conduct analytics to enhance performance and product development.
            </p>

            <p className="mb-4">
              <span className="font-bold">3. How We Protect Your Information</span>
            </p>
            <p className="mb-4">
              We implement administrative, technical, and physical safeguards designed to protect your data from
              unauthorized access, alteration, or disclosure. While no system is entirely immune to risk, we
              continuously improve our security practices to meet industry standards.
            </p>

            <p className="mb-4">
              <span className="font-bold">4. Data Sharing and Third Parties</span>
            </p>
            <p className="mb-4">
              We do not sell or rent your personal information.
              <br />
              We may share data only in the following cases:
              <br />• Service Providers: Trusted vendors who support operations such as hosting, analytics, or
              infrastructure.
              <br />• Legal Requirements: When required to comply with applicable laws, regulations, or legal requests.
              <br />• Security Purposes: To protect the integrity, rights, or safety of AriaReply users and systems.
              <br />
              <br />
              All third parties are contractually obligated to handle data in accordance with this policy.
            </p>

            <p className="mb-4">
              <span className="font-bold">5. Data Retention</span>
            </p>
            <p className="mb-4">
              We retain information only for as long as necessary to provide our services, meet legal obligations, or
              improve system performance. You may request deletion of your data at any time, subject to legitimate
              business or legal requirements.
            </p>

            <p className="mb-4">
              <span className="font-bold">6. Your Rights and Choices</span>
            </p>
            <p className="mb-4">
              Depending on your location, you may have the right to:
              <br />• Access the personal information we hold about you.
              <br />• Request correction or deletion of your data.
              <br />• Opt out of non-essential data collection.
              <br />• Request a copy of your data in a portable format.
              <br />
              <br />
              To exercise any of these rights, contact us at ariareplyai@gmail.com.
            </p>

            <p className="mb-4">
              <span className="font-bold">7. Children's Privacy</span>
            </p>
            <p className="mb-4">
              AriaReply is not intended for use by individuals under the age of 13. We do not knowingly collect personal
              information from children.
            </p>

            <p className="mb-4">
              <span className="font-bold">8. International Data Transfers</span>
            </p>
            <p className="mb-4">
              Because AriaReply operates across multiple regions, your data may be processed in countries outside your
              residence. We apply appropriate safeguards to ensure compliance with applicable data protection laws.
            </p>

            <p className="mb-4">
              <span className="font-bold">9. Changes to This Policy</span>
            </p>
            <p className="mb-4">
              We may update this Privacy Policy as our services evolve. Any changes will be posted with an updated "Last
              Updated" date. Continued use of AriaReply after such changes constitutes acceptance of the revised policy.
            </p>

            <p className="mb-4">
              <span className="font-bold">10. Contact Us</span>
            </p>
            <p>
              For questions about this Privacy Policy or our data practices, please contact us at:
              <br />
              ariareplyai@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
