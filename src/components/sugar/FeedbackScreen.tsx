import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

interface FeedbackScreenProps {
  total: number;
  onDone: () => void;
  onBack: () => void;
}

const computeScore = (total: number) => Math.max(0, Math.min(100, Math.round(100 - (total / 60) * 100)));

const getLevel = (total: number): "high" | "medium" | "low" => {
  if (total >= 40) return "high";
  if (total >= 20) return "medium";
  return "low";
};

const CONTENT = {
  high: {
    title: "Let's cut it down a bit",
    emoji: "🍭",
    gradient: "gradient-peach",
    tips: [
      "Reduce sugar in tea/coffee",
      "Avoid sugary drinks like soda",
      "Choose fruit instead of dessert",
    ],
  },
  medium: {
    title: "You're on the right track",
    emoji: "🌿",
    gradient: "gradient-blue",
    tips: [
      "Watch hidden sugars in snacks",
      "Try slightly reducing portion sizes",
    ],
  },
  low: {
    title: "Great job!",
    emoji: "✨",
    gradient: "gradient-green",
    tips: [
      "Great control today",
      "Keep maintaining this habit",
    ],
  },
};

const FeedbackScreen = ({ total, onDone, onBack }: FeedbackScreenProps) => {
  const level = getLevel(total);
  const score = computeScore(total);
  const { title, emoji, gradient, tips } = CONTENT[level];

  return (
    <div className={`flex flex-col min-h-screen px-6 py-4 items-center ${gradient}`}>
      <div className="w-full max-w-md flex flex-col min-h-screen">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center shadow-sm self-start mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>

        <div className="flex-1 flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl mb-1"
          >
            {emoji}
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-3xl font-extrabold text-foreground"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="bg-card/80 backdrop-blur rounded-2xl p-5 shadow-sm w-full mt-2 flex justify-around"
          >
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Total</p>
              <p className="text-2xl font-extrabold text-foreground">~{total}g</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Score</p>
              <p className="text-2xl font-extrabold text-primary">{score}<span className="text-sm text-muted-foreground">/100</span></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-card/80 backdrop-blur rounded-2xl p-5 shadow-sm w-full mt-2 text-left space-y-3"
          >
            <p className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Tips for you
            </p>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <motion.li
                  key={tip}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="text-sm text-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pb-6 pt-4"
        >
          <button
            onClick={onDone}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25 active:scale-[0.97] transition-transform"
          >
            Done
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackScreen;
