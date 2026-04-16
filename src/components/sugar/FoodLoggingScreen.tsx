import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, X, Pencil, Check } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  sugar: number;
}

interface FoodLoggingScreenProps {
  onBack: () => void;
  onReview: (items: FoodItem[]) => void;
}


const FoodLoggingScreen = ({ onBack, onReview }: FoodLoggingScreenProps) => {
  const [input, setInput] = useState("");
  const [sugarInput, setSugarInput] = useState("");
  const [items, setItems] = useState<FoodItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [nextId, setNextId] = useState(1);

  const addItem = (name: string, sugar: number) => {
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: nextId, name: name.trim(), sugar }]);
    setNextId((p) => p + 1);
    setInput("");
    setSugarInput("");
  };

  const addFromInput = () => {
    const sugar = parseInt(sugarInput) || 5;
    addItem(input, sugar);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const startEdit = (item: FoodItem) => {
    setEditingId(item.id);
    setEditValue(String(item.sugar));
  };

  const confirmEdit = () => {
    if (editingId === null) return;
    const val = parseInt(editValue) || 0;
    setItems((prev) =>
      prev.map((i) => (i.id === editingId ? { ...i, sugar: val } : i))
    );
    setEditingId(null);
  };

  const total = items.reduce((s, i) => s + i.sugar, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
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
            onKeyDown={(e) => e.key === "Enter" && addFromInput()}
            placeholder="Enter food or drink…"
            className="flex-1 py-3 px-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <input
            value={sugarInput}
            onChange={(e) => setSugarInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && addFromInput()}
            placeholder="g"
            className="w-16 py-3 px-2 text-center rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <button
            onClick={addFromInput}
            className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          Estimate sugar in grams
        </p>


        {/* Items list */}
        <div className="space-y-2">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="flex items-center justify-between p-3 rounded-xl bg-card shadow-sm border border-border"
              >
                <span className="font-semibold text-foreground">
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  {editingId === item.id ? (
                    <>
                      <input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && confirmEdit()}
                        className="w-14 text-center py-1 rounded-lg border border-border text-sm font-semibold bg-muted text-foreground focus:outline-none"
                      />
                      <button
                        onClick={confirmEdit}
                        className="w-7 h-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-bold text-primary bg-sugar-blue px-3 py-1 rounded-full">
                        {item.sugar}g
                      </span>
                      <button
                        onClick={() => startEdit(item)}
                        className="w-7 h-7 rounded-lg bg-muted text-muted-foreground flex items-center justify-center"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 rounded-lg bg-muted text-muted-foreground flex items-center justify-center"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/90 backdrop-blur-lg border-t border-border px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-foreground">
          Total: <span className="text-primary">{total}g</span>
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
  );
};

export default FoodLoggingScreen;
