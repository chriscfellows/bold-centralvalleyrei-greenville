import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@boldstreet/shared-layout";
import { getNavItems } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: `Terms of Use | ${config.siteName}`,
    robots: { index: false, follow: false },
  };
}

export const revalidate = 600;

export default async function TermsPage() {
  const siteConfig = await getSiteConfig();
  const navItems = getNavItems(siteConfig.siteName);
  
  return (
    <>
      <SiteHeader config={siteConfig} navItems={navItems} currentPath="/terms" />
      <main className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none prose-headings:text-[#0F172A] prose-a:text-[#E8521A]">
          <h1>Terms of Use</h1>
          <p className="text-sm text-gray-500">Last Updated: March 2026</p>

          <p>
            {`These Terms of Use ("Terms") govern your access to and use of this website, operated by Bold Street, Inc. ("Company", "we", "us", or "our"), for ${siteConfig.siteName}. By accessing or using the website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, do not use our website.`}
          </p>

          <h2>1. Website Purpose and Services</h2>
          <p>
            This website provides a platform for property owners to request a cash offer for their real estate. By submitting your property information, you are requesting that we, or our affiliated local real estate partners, evaluate your property and potentially make an offer to purchase it. <strong>Submitting your information does not obligate you to sell your property, nor does it obligate us to make an offer or purchase your property.</strong>
          </p>

          <h2>2. User Representations</h2>
          <p>By using this website and submitting your property information, you represent and warrant that:</p>
          <ul>
            <li>You are at least 18 years of age.</li>
            <li>You are the legal owner of the property submitted, or you have the express legal authority to act on behalf of the owner.</li>
            <li>All information you provide is true, accurate, current, and complete to the best of your knowledge.</li>
          </ul>

          <h2>3. Communications Consent (TCPA)</h2>
          <p>
            By submitting your contact information, you expressly consent to be contacted by Bold Street, Inc. and our authorized partners via phone calls, SMS/text messages, and emails regarding your property inquiry. This consent applies even if your number is on a corporate, state, or national Do Not Call list. You may opt-out of SMS communications at any time by replying "STOP".
          </p>

          <h2>4. Intellectual Property Rights</h2>
          <p>
            The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Bold Street, Inc., its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            YOUR USE OF THE WEBSITE AND ITS CONTENT IS AT YOUR OWN RISK. THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            {`IN NO EVENT WILL BOLD STREET, INC., ${siteConfig.siteName.toUpperCase()}, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.`}
          </p>

          <h2>7. Governing Law and Jurisdiction</h2>
          <p>
            All matters relating to the website and these Terms, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the State of Arizona without giving effect to any choice or conflict of law provision or rule.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <br />
            <strong>Bold Street, Inc.</strong><br />
            Email: legal@boldstreet.ai
          </p>
        </div>
      </main>
      <SiteFooter config={siteConfig} navItems={navItems} />
    </>
  );
}
