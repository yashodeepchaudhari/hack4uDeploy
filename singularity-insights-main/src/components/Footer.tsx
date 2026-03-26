import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">Hacker Logs</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wearable biomechanical monitoring for injury prevention and performance optimization.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Dashboard</li>
              <li>Analytics</li>
              <li>System Architecture</li>
              <li>Reports</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>team@hackerlogs.dev</li>
              <li>GitHub</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          © 2026 Hacker Logs. Built by Team Hacker Logs.
        </div>
      </div>
    </footer>
  );
}
