
import { Hero } from "@/components/hero";
import { ReportProjects } from "@/components/report-projects";
import { CurrentlyBuilding } from "@/components/currently-building";
import { CareerTimeline } from "@/components/career-timeline";
import { DeliveryLifecycle } from "@/components/delivery-lifecycle";
import { ContactSection } from "@/components/contact-section";


export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Hero />

      <ReportProjects skillsFooter={<CurrentlyBuilding className="mt-6" />} />
      <DeliveryLifecycle />
      <CareerTimeline />
     
      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-y border-slate-200 bg-slate-100/60 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
              A little about me
            </p>
            <h2
              id="about-heading"
              className="max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              I speak both
              <br />
              the language of mathematics
              <br />
              and the language of business.
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            <p>
              I started my career rooted heavily in probability, distributions,
              and statistical models.
            </p>
            <p>
              While I love diving deep into complex code and
              data architecture, my ultimate goal is simple:
              <b> making data speak</b> so businesses can move forward with absolute confidence.
            </p>
          </div>
        </div>
      </section>

       <ContactSection />

    </main>
  );
}

