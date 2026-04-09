/**
 * ComparisonTable — Server component.
 * White background. Two-column comparison matching reference site.
 * Cash offer column has dark #0F172A header, Traditional column is light.
 */
import type { ComparisonRow } from "../types/index";

interface ComparisonTableProps {
  headline: string;
  subheadline?: string;
  cashOfferLabel?: string;
  traditionalLabel?: string;
  rows: ComparisonRow[];
  closingText?: string;
  variant?: "horizontal" | "vertical";
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: "Best For", cashOffer: "Homeowners who want a faster, simpler sale", traditional: "Homeowners who want to test the market for the highest possible price" },
  { feature: "Closing Time", cashOffer: "As little as 7 days", traditional: "Typically 30 to 90+ days" },
  { feature: "Commissions / Fees", cashOffer: "No agent commissions. Terms depend on the buyer and transaction structure.", traditional: "Agent commissions plus typical closing costs" },
  { feature: "Repairs Required", cashOffer: "Often sold as-is", traditional: "Repairs, cleaning, and prep are often needed" },
  { feature: "Appraisal / Financing", cashOffer: "May avoid appraisal and lender delays when working with cash buyers", traditional: "Often depends on buyer financing and appraisal" },
  { feature: "Showings", cashOffer: "Usually minimal property access", traditional: "Multiple showings and open houses are common" },
  { feature: "Certainty", cashOffer: "More speed and convenience, depending on the buyer", traditional: "Potential for higher market value, but with more time and uncertainty" },
];

export function ComparisonTable({
  headline,
  subheadline = "Every homeowner's situation is different. Some want speed, simplicity, and certainty. Others are willing to go through the full sales process in hopes of getting top market value. We help you compare both options so you can choose what works best for you.",
  cashOfferLabel = "Sell to a Cash Buyer in the Network",
  traditionalLabel = "List on the Market",
  rows = DEFAULT_ROWS,
  closingText,
}: ComparisonTableProps) {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="comparison-heading">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="comparison-heading" className="text-3xl lg:text-4xl font-bold text-[#0F172A]">
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">{subheadline}</p>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-[#0F172A] bg-gray-50 border border-gray-200 rounded-tl-xl w-1/3"></th>
                <th className="px-6 py-4 text-center font-bold text-white bg-[#0F172A] border border-[#0F172A] w-1/3">
                  {cashOfferLabel}
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-tr-xl w-1/3">
                  {traditionalLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-semibold text-[#0F172A] bg-white border border-gray-200">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center bg-[#0F172A]/5 border border-[#0F172A]/20">
                    <span className="inline-flex items-center gap-1.5 text-[#0F172A] font-semibold">
                      <svg className="h-4 w-4 text-[#E8521A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {row.cashOffer}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 bg-white border border-gray-200">
                    {row.traditional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {closingText && (
          <p className="mt-8 text-center text-gray-500 max-w-2xl mx-auto">
            {closingText}
          </p>
        )}
      </div>
    </section>
  );
}
