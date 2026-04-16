import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  sugar: number;
}

interface SummaryScreenProps {
  items: FoodItem[];
  onBack: () => void;
  onFeedback: () => void;
}

const drinkKeywords = ["tea", "coffee", "juice", "shake", "soda", "milk", "water", "latte", "smoothie"];
const snackKeywords = ["snack", "chips", "cookie", "biscuit", "cracker", "bar", "candy", "chocolate", "dessert", "cake", "ice cream"];

const categorize = (items: FoodItem[]) => {
  let drinks = 0, snacks = 0, meals = 0;
  items.forEach((item) => {
    const lower = item.name.toLowerCase();
    if (drinkKeywords.some((k) => lower.includes(k))) drinks += item.sugar;
    else if (snackKeywords.some((k) => lower.includes(k))) snacks += item.sugar;
    else meals += item.sugar;
  });
  return { drinks, snacks, meals };
};

const SummaryScreen = ({ items, onBack, onFeedback }: SummaryScreenProps) => {
  const total = items.reduce((s, i) => s + i.sugar, 0);
  const { drinks, snacks, meals } = categorize(items);
  const max = Math.max(drinks, snacks, meals, 1);

  const categories = [
    { label: "Drinks", value: drinks, color: "bg-sugar-blue-strong" },
    { label: "Snacks", value: snacks, color: "bg-sugar-peach-strong" },
    { label: "Meals", value: meals, color: "bg-sugar-green-strong" },
  ];

  const topCategory = categories.reduce((a, b) => (a.value > b.value ? a : b));
  const comparison = total > 32 ? "Higher than yesterday" : "Lower than your usual intake";

  return (
    <div className="flex flex-col min-h-screen gradient-peach px-6 py-4">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center shadow-sm self-start mb-6"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </motion.button>

      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-extrabold text-foreground mb-2"
      >
        Today's Sugar
      </motion.h1>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring" }}
        className="text-center my-6"
      >
        <span className="text-6xl font-extrabold text-foreground">{total}g</span>
        <p className="text-lg text-muted-foreground mt-1">total</p>
      </motion.div>

      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-card/80 backdrop-blur rounded-2xl p-4 shadow-sm mb-6"
      >
        <p className="text-sm font-semibold text-muted-foreground mb-1">Compared to recent</p>
        <p className="text-base font-bold text-foreground">{comparison}</p>
      </motion.div>

      {/* Breakdown */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-card/80 backdrop-blur rounded-2xl p-4 shadow-sm space-y-4 mb-6"
      >
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span className="text-foreground">{cat.label}</span>
              <span className="text-muted-foreground">{cat.value}g</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cat.value / max) * 100}%` }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className={`h-full rounded-full ${cat.color}`}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Insight */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card/80 backdrop-blur rounded-2xl p-4 shadow-sm mb-8"
      >
        <p className="text-sm text-foreground font-semibold">
          💡 Most of your sugar came from <span className="text-primary">{topCategory.label.toLowerCase()}</span>
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileTap={{ scale: 0.96 }}
        onClick={onFeedback}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25"
      >
        See Feedback
      </motion.button>
    </div>
  );
};

export default SummaryScreen;
