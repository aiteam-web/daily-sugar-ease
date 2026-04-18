import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import HistorySheet from "./HistorySheet";
import { loadHistory } from "@/lib/sugarHistory";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const history = loadHistory();
  return (
    <div className="flex flex-col min-h-screen gradient-main px-6 py-4 items-center">
      <div className="w-full max-w-md flex flex-col min-h-screen">
        <div className="flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <HistorySheet entries={history} />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="text-6xl mb-2"
          >
            🍬
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-foreground"
          >
            Track Today's Sugar 🍬
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Log what you ate in seconds
          </motion.p>

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            className="mt-8 w-full max-w-xs py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25"
          >
            Start Check-in
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
