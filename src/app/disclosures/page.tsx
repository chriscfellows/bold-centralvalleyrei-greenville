import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@boldstreet/shared-layout";
import { getNavItems } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const navItems = getNavItems(siteConfig.siteName);
  // Only generate metadata if this is a realtor-type client
  if (siteConfig.companyType !== "realtor") {
    return { robots: { index: false, follow: false } };
  }
  return {
    title: "Disclosures | " + siteConfig.siteName,
    robots: { index: false, follow: false },
  };
}

export default async function DisclosuresPage() {
  const siteConfig = await getSiteConfig();
  const navItems = getNavItems(siteConfig.siteName);

  // Only render for realtor-type clients — return 404 for cash buyers
  if (siteConfig.companyType !== "realtor") {
    notFound();
  }

  const companyName = siteConfig.siteName;
  const owner = siteConfig.owner ?? "";
  const ownerLicense = siteConfig.ownerLicense ?? "";
  const licenseState = siteConfig.licenseState ?? "";
  const disclosureAgency = siteConfig.disclosureAgency ?? "";
  const disclosureCashbuyer = siteConfig.disclosureCashbuyer ?? "";
  const brokerageName = siteConfig.brokerageName ?? "";
  const brokerageLicense = siteConfig.brokerageLicense ?? "";

  return (
    <>
      <SiteHeader config={siteConfig} navItems={navItems} currentPath="/disclosures" />
      <main className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none prose-headings:text-[#0F172A] prose-a:text-[#E8521A]">
          <h1>{companyName} &mdash; Licensing, Disclosures, and Cash Buyer Relationships</h1>

          <h2>About {companyName}</h2>
          <p>
            {companyName} is a licensed real estate team
            {owner && ` led by ${owner}`}
            {ownerLicense && ` (${ownerLicense})`},
            {brokerageName && ` affiliated with ${brokerageName}`}
            {brokerageLicense && ` (Broker ${brokerageLicense})`}.
            {" "}{companyName} provides real estate brokerage services, including facilitating
            the sale of residential properties through multiple channels: direct cash buyer
            connections, preparation-for-sale services, and traditional MLS listings.
          </p>

          <h2>Cash Buyer Relationship Disclosure</h2>
          <p>
            When you request a cash offer through this website, {companyName} may connect you
            with independent, pre-vetted third-party real estate investors (&ldquo;Cash
            Buyers&rdquo;) from our buyer network. {companyName} does not typically purchase
            properties directly as a principal.
            {owner && ` However, ${owner}, affiliated entities, or members of the ${companyName} team may, from time to time, purchase properties as principals for investment purposes.`}
            {disclosureCashbuyer && ` ${disclosureCashbuyer}`}
          </p>

          <h2>Resale and Profit Disclosure</h2>
          <p>
            Cash Buyers in our network are real estate investors. They may repair, renovate,
            and/or resell any properties purchased, potentially for a profit. The cash offer you
            receive may be below the property&rsquo;s potential market value if the property were
            listed on the open market after repairs or improvements. {companyName} encourages all
            sellers to consider all available options &mdash; including traditional MLS listing
            and our preparation-for-sale program &mdash; before accepting a cash offer. You are
            under no obligation to accept any offer.
          </p>

          <h2>Compensation Disclosure</h2>
          <p>
            {companyName} may receive a referral fee, commission, or other compensation from the
            Cash Buyer in connection with the transaction. This compensation does not reduce the
            cash offer you receive. The amount or rate of real estate commissions is not fixed by
            law and is set by each broker individually. All compensation arrangements will be
            disclosed to you in writing
            {licenseState ? ` as required by ${licenseState} law` : ""}.
          </p>

          <h2>Agency Relationship</h2>
          <p>
            When facilitating a cash sale, {companyName} acts as the buyer&rsquo;s representative
            unless otherwise disclosed in writing.
            {disclosureAgency && ` ${disclosureAgency}`}
            {owner && ` If ${owner} or an affiliated entity is the buyer, a dual agency or principal disclosure will be provided as required by law.`}
          </p>

          <h2>No Legal, Tax, or Investment Advice</h2>
          <p>
            Information provided on this website does not constitute legal, financial, tax, or
            investment advice. You are encouraged to seek independent professional advice before
            entering into any real estate transaction. {companyName} makes no guarantees regarding
            the value of any property or the terms of any offer received through this website.
          </p>

          <hr className="my-8" />
          <p className="text-sm text-gray-500">
            {[owner, ownerLicense, brokerageName, brokerageLicense].filter(Boolean).join(" | ")}
            {(owner || ownerLicense || brokerageName || brokerageLicense) && " | "}
            Equal Housing
          </p>
        </div>
      </main>
      <SiteFooter config={siteConfig} navItems={navItems} />
    </>
  );
}
