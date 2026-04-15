import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero — centered with flow diagram */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
          <span className="text-accent">Hook</span>flow
        </h1>
        <p className="text-lg text-foreground/60 max-w-lg mx-auto mb-8 text-center leading-relaxed">
          Build automated workflows with webhooks, scheduled triggers, and API actions. Connect anything to everything.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex px-8 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors text-lg mb-16"
        >
          Open Dashboard
        </Link>

        {/* Visual flow diagram — 3 nodes connected by animated lines */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between gap-2">
            {/* Trigger node */}
            <div className="flex-1 bg-card border-2 border-accent/30 rounded-xl p-5 text-center relative">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">Trigger</h3>
              <p className="text-[11px] text-foreground/40">Webhook · Cron · Manual</p>
            </div>

            {/* Arrow 1 */}
            <div className="flex items-center gap-1 px-1 shrink-0">
              <div className="w-8 sm:w-16 h-px border-t-2 border-dashed border-accent/30" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" className="text-accent/50" /></svg>
            </div>

            {/* Process node */}
            <div className="flex-1 bg-card border-2 border-amber-500/30 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">Process</h3>
              <p className="text-[11px] text-foreground/40">Filter · Transform · Log</p>
            </div>

            {/* Arrow 2 */}
            <div className="flex items-center gap-1 px-1 shrink-0">
              <div className="w-8 sm:w-16 h-px border-t-2 border-dashed border-accent/30" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" className="text-accent/50" /></svg>
            </div>

            {/* Action node */}
            <div className="flex-1 bg-card border-2 border-blue-500/30 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">Action</h3>
              <p className="text-[11px] text-foreground/40">HTTP · Email · Alert</p>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {["Webhooks", "HTTP Requests", "Cron Schedules", "Execution Logs", "Toggle Flows", "Email Alerts"].map((f) => (
            <span key={f} className="px-3 py-1.5 bg-card border border-card-border rounded-full text-xs text-foreground/60">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-foreground/40 border-t border-card-border">
        Built by{" "}
        <a href="https://github.com/rumizenzz" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">rumizenzz</a>
        . Open source on{" "}
        <a href="https://github.com/rumizenzz/hookflow" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </footer>
    </main>
  );
}
