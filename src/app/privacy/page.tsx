import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@boldstreet/shared-layout";
import { getNavItems } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: `Privacy Policy | ${config.siteName}`,
    robots: { index: false, follow: false },
  };
}

export const revalidate = 600;

export default async function PrivacyPage() {
  const siteConfig = await getSiteConfig();
  const navItems = getNavItems(siteConfig.siteName);
  
  return (
    <>
      <SiteHeader config={siteConfig} navItems={navItems} currentPath="/privacy" />
      <main className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none prose-headings:text-[#0F172A] prose-a:text-[#E8521A]">
          <h1>Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last Updated: March 2026</p>
          
          <p>
            {`Bold Street, Inc. ("Company", "we", "us", or "our") and ${siteConfig.siteName} respect your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit this website and our practices for collecting, using, maintaining, protecting, and disclosing that information.`}
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect several types of information from and about users of our website, including:</p>
          <ul>
            <li><strong>Personal Information:</strong> Information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, and property details when you submit a form to request a cash offer.</li>
            <li><strong>Usage Details:</strong> Information about your internet connection, the equipment you use to access our website, and usage details collected automatically as you navigate through the site (such as IP addresses and browser information).</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
          <ul>
            <li>To present our website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us, including evaluating your property for a potential cash offer.</li>
            <li>To contact you regarding your property submission via phone, SMS/text message, or email.</li>
            <li>To fulfill any other purpose for which you provide it.</li>
            <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
          </ul>

          <h2>3. SMS and Text Message Communications</h2>
          <p>
            {`By providing your phone number and submitting our lead form, you expressly consent to receive text messages (SMS) from Bold Street, Inc. and ${siteConfig.siteName} and our affiliated local real estate partners regarding your property inquiry. Message and data rates may apply. You may opt-out of receiving text messages at any time by replying "STOP" to any message you receive from us.`}
          </p>

          <h2>4. Disclosure of Your Information</h2>
          <p>We may disclose aggregated information about our users without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
          <ul>
            <li>To our subsidiaries and affiliates.</li>
            <li>To contractors, service providers, and other third parties we use to support our business (such as local real estate agents who will evaluate your property).</li>
            <li>To fulfill the purpose for which you provide it.</li>
            <li>To comply with any court order, law, or legal process, including responding to any government or regulatory request.</li>
          </ul>
          <p><strong>We do not sell your personal information to third-party data brokers.</strong></p>

          <h2>5. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website.
          </p>

          <h2>6. Changes to Our Privacy Policy</h2>
          <p>
            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at: <br />
            <strong>Bold Street, Inc.</strong><br />
            Email: privacy@boldstreet.ai
          </p>
        </div>
      </main>
      <SiteFooter config={siteConfig} navItems={navItems} />
    </>
  );
}
