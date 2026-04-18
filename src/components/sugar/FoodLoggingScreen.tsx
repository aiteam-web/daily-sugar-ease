import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, X } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  sugar: number;
}

interface FoodLoggingScreenProps {
  onBack: () => void;
  onReview: (items: FoodItem[]) => void;
}

const QUICK_CHIPS = [
  "Tea/Coffee",
  "Cold Drink",
  "Juice",
  "Mithai",
  "Biscuits",
  "Packaged Snacks",
  "Dessert",
  "Fruit",
];

const sugarLabel = (g: number) => {
  if (g <= 7) return { text: "Low sugar", color: "text-sugar-green-strong" };
  if (g <= 15) return { text: "Moderate", color: "text-amber-600" };
  return { text: "High sugar", color: "text-rose-500" };
};

const SugarSlider = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const label = sugarLabel(value);
  const pct = (value / 30) * 100;

  return (
    <div className="mt-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs font-semibold text-muted-foreground">How sugary was it?</span>
        <span className="text-sm font-extrabold text-foreground">~{value}g</span>
      </div>

      <div className="relative h-8 flex items-center">
        <div
          className="absolute inset-x-0 h-2 rounded-full"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--sugar-green-strong)), hsl(45 90% 55%), hsl(0 80% 60%))",
          }}
        />
        <input
          type="range"
          min={0}
          max={30}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground/80
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-card
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-foreground/80"
          style={{ background: "transparent" }}
        />
      </div>

      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mt-0.5 px-0.5">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>

      <p className={`text-xs font-bold mt-1 ${label.color}`}>{label.text}</p>
    </div>
  );
};

const FoodLoggingScreen = ({ onBack, onReview }: FoodLoggingScreenProps) => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<FoodItem[]>([]);
  const [nextId, setNextId] = useState(1);

  const addItem = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setItems((prev) => [...prev, { id: nextId, name: trimmed, sugar: 10 }]);
    setNextId((p) => p + 1);
    setInput("");
  };

  const updateSugar = (id: number, sugar: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, sugar } : i)));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const total = items.reduce((s, i) => s + i.sugar, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div className="gradient-blue px-6 pt-4 pb-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center shadow-sm mb-4"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-extrabold text-foreground"
          >
            What did you have today?
          </motion.h1>
        </div>

        <div className="flex-1 px-6 pt-4 pb-32 space-y-5 overflow-y-auto">
          {/* Input */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem(input)}
              placeholder="Enter food or drink…"
              className="flex-1 py-3 px-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button
              onClick={() => addItem(input)}
              className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md"
            >
              <Plus className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => addItem(chip)}
                className="px-3 py-1.5 rounded-full bg-card border border-border text-sm font-semibold text-foreground shadow-sm active:scale-95 transition-transform"
              >
                + {chip}
              </button>
            ))}
          </div>

          {/* Items list */}
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="p-4 rounded-2xl bg-card shadow-sm border border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{item.name}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg bg-muted text-muted-foreground flex items-center justify-center"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <SugarSlider value={item.sugar} onChange={(v) => updateSugar(item.id, v)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/90 backdrop-blur-lg border-t border-border px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            Total: <span className="text-primary">~{total}g</span>
          </span>
          <button
            onClick={() => items.length > 0 && onReview(items)}
            disabled={items.length === 0}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-md disabled:opacity-40 active:scale-95 transition-transform"
          >
            Review Intake
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodLoggingScreen;
