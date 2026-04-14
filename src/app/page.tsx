import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-accent">Hook</span>flow
          </h1>
          <p className="text-xl text-foreground/70 max-w-xl mx-auto mb-8">
            Build automated workflows with webhooks, scheduled triggers, and API
            actions. Connect anything to everything.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex px-8 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Open Dashboard
          </Link>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl w-full">
          <div className="bg-card border border-card-border rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">1</div>
            <h3 className="font-semibold mb-2">Choose a Trigger</h3>
            <p className="text-sm text-foreground/60">
              Manual button, incoming webhook URL, or scheduled interval
            </p>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">2</div>
            <h3 className="font-semibold mb-2">Set an Action</h3>
            <p className="text-sm text-foreground/60">
              Send an HTTP request, log data, or send an email notification
            </p>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">3</div>
            <h3 className="font-semibold mb-2">Watch it Run</h3>
            <p className="text-sm text-foreground/60">
              See real-time execution logs with status, timing, and details
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-16 max-w-3xl w-full">
          {[
            { title: "Webhooks", desc: "Unique URL for each flow" },
            { title: "HTTP Actions", desc: "GET, POST, PUT, DELETE" },
            { title: "Execution Logs", desc: "Real-time status tracking" },
            { title: "Toggle On/Off", desc: "Enable or disable any flow" },
            { title: "Scheduled", desc: "Cron-style triggers" },
            { title: "Email Alerts", desc: "Send notifications" },
          ].map((f) => (
            <div key={f.title} className="text-center p-3">
              <div className="font-semibold text-sm text-accent">{f.title}</div>
              <div className="text-xs text-foreground/50 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-foreground/40 border-t border-card-border">
        <p>
          Built with AI-assisted development using{" "}
          <span className="text-accent">Claude Code</span>. Open source on{" "}
          <a href="https://github.com/rumizenzz/hookflow" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
      </footer>
    </main>
  );
}
