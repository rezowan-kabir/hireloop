import Image from "next/image";
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Star,
  UserSearch,
} from "lucide-react";
import globe from "@/app/images/globe.png";

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
] as const;

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

function StatCards({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid max-w-6xl grid-cols-2 gap-4 px-6 sm:gap-6 lg:grid-cols-4 ${className}`}
    >
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c0c0e]/90 p-5 shadow-2xl backdrop-blur-md sm:aspect-[312/254] sm:p-6"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 w-fit">
            <Icon className="size-5 text-white/90 sm:size-6" aria-hidden />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {value}
            </span>
            <span className="text-sm font-medium text-white/60 sm:text-base">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#010103]">
      {/* Glow layers behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[min(1200px,140%)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(92,83,254,0.30),transparent)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -left-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(220,2,206,0.12),transparent)] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-16 text-center sm:pt-20">
        {/* Badge matching image */}
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden
            className="hidden h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-[#5c53fe] sm:block"
          />
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#121215] px-4 py-2 shadow-lg backdrop-blur-md sm:px-5 sm:py-2.5">
            <div className="grid size-6 place-items-center rounded-full bg-violet-600/20 text-violet-400">
              <Briefcase className="size-3.5" aria-hidden />
            </div>
            <span className="font-mono text-xs font-semibold tracking-wide text-white uppercase sm:text-sm">
              50,000+{" "}
              <span className="text-white/70 font-normal">
                new jobs this month
              </span>
            </span>
          </div>
          <span
            aria-hidden
            className="hidden h-px w-20 bg-gradient-to-l from-transparent via-white/20 to-[#5c53fe] sm:block"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:mt-8 sm:text-5xl lg:text-[64px] lg:leading-[1.1]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-[700px] text-base leading-relaxed text-white/60 sm:text-lg sm:leading-8">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar matching image */}
        <form className="mt-8 flex w-full max-w-[784px] flex-col gap-2 rounded-2xl border border-white/10 bg-[#0d0d10] p-2 shadow-2xl backdrop-blur-md sm:mt-10 sm:h-16 sm:flex-row sm:items-center sm:gap-0 sm:pl-4">
          <div className="flex h-12 w-full items-center gap-3 px-3 sm:h-full sm:px-0">
            <Search className="size-5 shrink-0 text-white/40" aria-hidden />
            <input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40 sm:text-base"
            />
          </div>

          <span
            aria-hidden
            className="hidden h-8 w-px shrink-0 bg-white/10 mx-3 sm:block"
          />

          <div className="flex h-12 w-full items-center gap-3 px-3 sm:h-full sm:px-0 sm:max-w-[240px]">
            <MapPin className="size-5 shrink-0 text-white/40" aria-hidden />
            <input
              type="search"
              name="location"
              placeholder="Location or Remote"
              className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40 sm:text-base"
            />
          </div>

          <button
            type="submit"
            aria-label="Search jobs"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-violet-600 text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 sm:mt-0 sm:ml-2 sm:size-12 sm:shrink-0"
          >
            <Search className="size-5" aria-hidden />
          </button>
        </form>

        {/* Trending chips matching image */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-xs font-medium text-white/50 sm:text-sm">
            Trending Position:
          </span>
          {trending.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-[#161619] px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/20 sm:text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Globe visual + overlay + stats */}
      <div className="relative mx-auto mt-12 max-w-6xl">
        <div className="relative aspect-[16/9] min-h-[320px] w-full overflow-hidden sm:min-h-[420px] lg:min-h-[580px]">
          <Image
            src={globe}
            alt=""
            aria-hidden
            priority
            className="absolute inset-0 h-full w-full object-cover object-bottom select-none opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-transparent to-transparent" />

          <p className="absolute inset-x-0 top-[28%] mx-auto max-w-[650px] px-6 text-center text-xl font-semibold tracking-tight text-white/90 sm:text-2xl md:top-[40%] md:text-4xl lg:text-[40px] lg:leading-[1.2]">
            Assisting over <span className="text-violet-400">15,000</span> job
            seekers find their dream positions.
          </p>
        </div>

        <StatCards className="relative z-10 mx-auto -mt-16 pb-20 sm:-mt-28 lg:-mt-44 lg:pb-24" />
      </div>
    </section>
  );
}

