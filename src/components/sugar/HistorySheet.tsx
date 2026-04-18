import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { History } from "lucide-react";
import { SugarEntry } from "@/lib/sugarHistory";

interface HistorySheetProps {
  entries: SugarEntry[];
}

const levelStyle: Record<SugarEntry["level"], string> = {
  high: "bg-sugar-peach text-rose-600",
  medium: "bg-sugar-yellow text-amber-700",
  low: "bg-sugar-green text-sugar-green-strong",
};

const levelLabel: Record<SugarEntry["level"], string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const HistorySheet = ({ entries }: HistorySheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="View history"
          className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <History className="w-5 h-5 text-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-extrabold">Your History</SheetTitle>
        </SheetHeader>

        {entries.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-semibold">No check-ins yet</p>
            <p className="text-sm">Complete your first check-in to see it here.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {entries.map((e) => (
              <div
                key={e.date}
                className="p-4 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {new Date(e.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-base font-extrabold text-foreground">~{e.total}g</p>
                    <p className="text-xs font-bold text-primary">{e.score}/100</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${levelStyle[e.level]}`}>
                    {levelLabel[e.level]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HistorySheet;
