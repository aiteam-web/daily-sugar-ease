import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface FeedbackScreenProps {
  total: number;
  onDone: () => void;
  onBack: () => void;
}

const FeedbackScreen = ({ total, onDone, onBack }: FeedbackScreenProps) => {
  const isHigh = total > 35;
  const title = isHigh ? "Let's cut it down a bit" : "Nice progress! 🎉";
  const message = isHigh
    ? "Your sugar intake is increasing this week. Try reducing sugar in drinks to improve."
    : "You're keeping your sugar in check. Keep up the great work!";

  return (
    <div className={`flex flex-col min-h-screen px-6 py-4 items-center ${isHigh ? "gradient-peach" : "gradient-green"}`}>
      <div className="w-full max-w-md flex flex-col min-h-screen">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center shadow-sm self-start mb-6"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </motion.button>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-5xl mb-2"
        >
          {isHigh ? "🍭" : "✨"}
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-extrabold text-foreground"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground text-base max-w-xs leading-relaxed"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-card/80 backdrop-blur rounded-2xl p-5 shadow-sm w-full max-w-xs mt-4 space-y-3"
        >
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Today's Total</span>
            <span className="text-sm font-bold text-foreground">{total}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Streak</span>
            <span className="text-sm font-bold text-foreground">2-day 🔥</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 pb-6"
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
