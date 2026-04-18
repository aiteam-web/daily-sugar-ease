export interface SugarEntry {
  date: string; // ISO date
  total: number;
  score: number;
  level: "high" | "medium" | "low";
}

const KEY = "sugar-history";

export const getLevel = (total: number): "high" | "medium" | "low" => {
  if (total >= 40) return "high";
  if (total >= 20) return "medium";
  return "low";
};

export const computeScore = (total: number) =>
  Math.max(0, Math.min(100, Math.round(100 - (total / 60) * 100)));

export const loadHistory = (): SugarEntry[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SugarEntry[]) : [];
  } catch {
    return [];
  }
};

export const saveEntry = (total: number) => {
  const entry: SugarEntry = {
    date: new Date().toISOString(),
    total,
    score: computeScore(total),
    level: getLevel(total),
  };
  const list = loadHistory();
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
};
