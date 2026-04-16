import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StartScreen from "@/components/sugar/StartScreen";
import FoodLoggingScreen from "@/components/sugar/FoodLoggingScreen";
import SummaryScreen from "@/components/sugar/SummaryScreen";
import FeedbackScreen from "@/components/sugar/FeedbackScreen";

interface FoodItem {
  id: number;
  name: string;
  sugar: number;
}

const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [items, setItems] = useState<FoodItem[]>([]);

  const total = items.reduce((s, i) => s + i.sugar, 0);

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === 0 && (
          <motion.div key="start" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <StartScreen onStart={() => setScreen(1)} />
          </motion.div>
        )}
        {screen === 1 && (
          <motion.div key="log" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <FoodLoggingScreen
              onBack={() => setScreen(0)}
              onReview={(foodItems) => {
                setItems(foodItems);
                setScreen(2);
              }}
            />
          </motion.div>
        )}
        {screen === 2 && (
          <motion.div key="summary" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <SummaryScreen
              items={items}
              onBack={() => setScreen(1)}
              onFeedback={() => setScreen(3)}
            />
          </motion.div>
        )}
        {screen === 3 && (
          <motion.div key="feedback" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <FeedbackScreen
              total={total}
              onBack={() => setScreen(2)}
              onDone={() => {
                setScreen(0);
                setItems([]);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
