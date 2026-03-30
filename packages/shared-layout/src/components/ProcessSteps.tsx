/**
 * ProcessSteps — Server component.
 * White background, large numbered circle outline style matching reference site.
 */
import type { ProcessStep } from "../types/index";

interface ProcessStepsProps {
  headline: string;
  subheadline?: string;
  steps: ProcessStep[];
  variant?: "light" | "dark";
}

export function ProcessSteps({ headline, subheadline, steps, variant = "light" }: ProcessStepsProps) {
  const bg = variant === "dark" ? "bg-[#0F172A] text-white" : "bg-white";
  const headingColor = variant === "dark" ? "text-white" : "text-[#0F172A]";
  const subColor = variant === "dark" ? "text-white/70" : "text-gray-500";
  const circleStyle = variant === "dark"
    ? "border-white/30 text-white"
    : "border-gray-300 text-[#0F172A]";
  const titleColor = variant === "dark" ? "text-white" : "text-[#0F172A]";
  const descColor = variant === "dark" ? "text-white/70" : "text-gray-600";

  return (
    <section className={`${bg} py-16 lg:py-24`} aria-labelledby="process-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="process-heading" className={`text-3xl lg:text-4xl font-bold ${headingColor}`}>
            {headline}
          </h2>
          {subheadline && (
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${subColor}`}>{subheadline}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full border-2 ${circleStyle} flex items-center justify-center mb-6`}>
                <span className="text-3xl font-bold">{step.number}</span>
              </div>
              <h3 className={`text-lg font-bold mb-3 ${titleColor}`}>{step.title}</h3>
              <p className={`text-sm leading-relaxed ${descColor}`}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
