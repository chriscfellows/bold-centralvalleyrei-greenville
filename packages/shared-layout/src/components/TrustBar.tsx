/**
 * TrustBar — Server component.
 * White background trust signals with icons. Matches reference site layout.
 */
export function TrustBar() {
  const signals = [
    {
      label: "Licensed Agents",
      icon: (
        <svg className="h-10 w-10 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.458 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-1.42-.297-2.772-.828-4H12a2 2 0 00-2 2v1" />
        </svg>
      ),
    },
    {
      label: "Local Experts",
      icon: (
        <svg className="h-10 w-10 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      label: "Cash Offers",
      icon: (
        <svg className="h-10 w-10 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Fast Closing",
      icon: (
        <svg className="h-10 w-10 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#F1F5F9] border-b border-gray-200 py-10 lg:py-14" aria-label="Trust signals">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {signals.map((signal, i) => (
            <div key={i} className="flex flex-col items-center gap-3 text-center">
              {signal.icon}
              <span className="text-base font-bold text-[#0F172A] tracking-wide">{signal.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
