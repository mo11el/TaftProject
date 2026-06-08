import { readFileSync } from 'fs';
import { join } from 'path';

export default function AcapulcoPage() {
  // Read the HTML file
  const filePath = join(process.cwd(), 'app/acapulco/theacapulco.html');
  const htmlContent = readFileSync(filePath, 'utf-8');

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
