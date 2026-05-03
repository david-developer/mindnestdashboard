import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JournalEditor } from "./journal-editor";
import { JournalEntry } from "./journal-entry";
import { PenLine, Sparkles, Search, Filter, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

export interface JournalEntryType {
  id: string;
  date: string;
  time: string;
  mood: number;
  title: string;
  content: string;
  tags: string[];
  wordCount: number;
  isFavorite?: boolean;
}

const MOCK_ENTRIES: JournalEntryType[] = [
  {
    id: "1",
    date: "2026-05-02",
    time: "9:15 PM",
    mood: 75,
    title: "A day of small victories",
    content: "Today was surprisingly good. I managed to finish that presentation I'd been dreading, and it actually went well. The team seemed engaged, and I got some great feedback. I realized that sometimes the things we worry about most end up being the most rewarding. I've been trying to practice gratitude more, and today I'm grateful for supportive colleagues and the courage to push through my anxiety.",
    tags: ["work", "achievement", "gratitude"],
    wordCount: 78,
    isFavorite: true,
  },
  {
    id: "2",
    date: "2026-05-01",
    time: "7:30 AM",
    mood: 55,
    title: "Morning thoughts",
    content: "Woke up feeling a bit anxious about the week ahead. I know I have a lot on my plate, but I'm trying to remind myself to take things one step at a time. Sometimes the anticipation is worse than the actual event. I'm going to focus on what I can control today and let go of the rest.",
    tags: ["anxiety", "mindfulness"],
    wordCount: 62,
  },
  {
    id: "3",
    date: "2026-04-30",
    time: "10:45 PM",
    mood: 85,
    title: "Weekend reflections",
    content: "What a wonderful weekend! Spent quality time with friends, went for a long walk in the park, and finally finished that book I've been reading. Feeling recharged and ready for the week. It's amazing how much difference a little self-care makes.",
    tags: ["weekend", "friends", "self-care"],
    wordCount: 47,
    isFavorite: true,
  },
  {
    id: "4",
    date: "2026-04-28",
    time: "6:00 PM",
    mood: 40,
    title: "Tough day",
    content: "Today was hard. Everything felt overwhelming, and I couldn't shake this heavy feeling. But I'm writing this entry, and that's something. Dr. Chen reminded me that it's okay to have bad days. They don't define me.",
    tags: ["difficult", "therapy"],
    wordCount: 40,
  },
];

const WRITING_PROMPTS = [
  "What made you smile today?",
  "Describe a moment when you felt proud of yourself.",
  "What's one thing you're grateful for right now?",
  "How are you feeling, and why?",
  "What would make tomorrow a little better?",
  "Write a letter to your future self.",
  "What's been on your mind lately?",
  "Describe something beautiful you noticed today.",
  "What challenged you today, and how did you handle it?",
  "What would you tell a friend who felt the way you do?",
];

interface JournalProps {
  onBack: () => void;
}

export function Journal({ onBack }: JournalProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [entries, setEntries] = useState<JournalEntryType[]>(MOCK_ENTRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMood, setFilterMood] = useState<"all" | "good" | "neutral" | "difficult">("all");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show a random prompt when component mounts
    const randomPrompt = WRITING_PROMPTS[Math.floor(Math.random() * WRITING_PROMPTS.length)];
    setCurrentPrompt(randomPrompt);
    setTimeout(() => setShowPrompt(true), 500);
  }, []);

  const handleSaveEntry = (entry: Omit<JournalEntryType, "id" | "date" | "time">) => {
    const now = new Date();
    const newEntry: JournalEntryType = {
      id: Date.now().toString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      ...entry,
    };
    setEntries([newEntry, ...entries]);
    setIsWriting(false);
    toast.success("Entry saved to your journal ✨");
  };

  const handleToggleFavorite = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    ));
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success("Entry deleted");
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMood = filterMood === "all" ||
                       (filterMood === "good" && entry.mood >= 70) ||
                       (filterMood === "neutral" && entry.mood >= 50 && entry.mood < 70) ||
                       (filterMood === "difficult" && entry.mood < 50);

    return matchesSearch && matchesMood;
  });

  if (isWriting) {
    return (
      <JournalEditor
        onSave={handleSaveEntry}
        onCancel={() => setIsWriting(false)}
        initialPrompt={currentPrompt}
      />
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#3AA76D]/5 via-background to-[#88C0F7]/5">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={onBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <PenLine className="w-6 h-6 text-[#3AA76D]" />
                Your Journal
              </h1>
            </div>
            <motion.button
              onClick={() => setIsWriting(true)}
              className="bg-gradient-to-r from-[#3AA76D] to-[#88C0F7] text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              New Entry
            </motion.button>
          </div>

          {/* Inspiring prompt */}
          <AnimatePresence>
            {showPrompt && !isWriting && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-r from-[#3AA76D]/10 to-[#88C0F7]/10 rounded-2xl p-4 mb-4 border border-[#3AA76D]/20"
              >
                <p className="text-sm text-muted-foreground mb-1">Writing prompt:</p>
                <p className="text-foreground font-medium">{currentPrompt}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3AA76D]/50 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterMood("all")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterMood === "all"
                    ? "bg-[#3AA76D] text-white"
                    : "bg-card/50 text-muted-foreground hover:bg-card"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMood("good")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterMood === "good"
                    ? "bg-[#3AA76D] text-white"
                    : "bg-card/50 text-muted-foreground hover:bg-card"
                }`}
              >
                Good
              </button>
              <button
                onClick={() => setFilterMood("neutral")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterMood === "neutral"
                    ? "bg-[#F5A623] text-white"
                    : "bg-card/50 text-muted-foreground hover:bg-card"
                }`}
              >
                Neutral
              </button>
              <button
                onClick={() => setFilterMood("difficult")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterMood === "difficult"
                    ? "bg-[#88C0F7] text-white"
                    : "bg-card/50 text-muted-foreground hover:bg-card"
                }`}
              >
                Difficult
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Entries */}
      <div className="container mx-auto px-4 py-8">
        {filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <PenLine className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No entries yet</p>
            <p className="text-muted-foreground text-sm mb-6">
              Start writing to capture your thoughts and feelings
            </p>
            <motion.button
              onClick={() => setIsWriting(true)}
              className="bg-[#3AA76D] text-white px-6 py-3 rounded-2xl font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              Write Your First Entry
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {filteredEntries.map((entry, index) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteEntry}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    <Toaster position="top-center" />
    </>
  );
}
