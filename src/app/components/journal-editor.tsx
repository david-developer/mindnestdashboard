import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Sparkles, Smile, Meh, Frown, Cloud, CheckCircle2 } from "lucide-react";
import { JournalEntryType } from "./journal";

const MOOD_OPTIONS = [
  { value: 20, emoji: "😢", label: "Struggling", color: "#88C0F7" },
  { value: 40, emoji: "😔", label: "Difficult", color: "#9BA8C4" },
  { value: 60, emoji: "😐", label: "Okay", color: "#F5A623" },
  { value: 80, emoji: "🙂", label: "Good", color: "#7FBF7F" },
  { value: 100, emoji: "😊", label: "Great", color: "#3AA76D" },
];

const QUICK_TAGS = [
  "gratitude", "anxiety", "achievement", "self-care", "therapy",
  "friends", "family", "work", "school", "health",
  "mindfulness", "growth", "challenge", "joy", "breakthrough"
];

interface JournalEditorProps {
  onSave: (entry: Omit<JournalEntryType, "id" | "date" | "time">) => void;
  onCancel: () => void;
  initialPrompt?: string;
}

export function JournalEditor({ onSave, onCancel, initialPrompt }: JournalEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(60);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showAutoSave, setShowAutoSave] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus on content area when component mounts
    contentRef.current?.focus();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (content || title) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setShowAutoSave(true);
        setTimeout(() => setShowAutoSave(false), 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [content, title]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
      onSave({
        title: title.trim() || "Untitled Entry",
        content: content.trim(),
        mood,
        tags: selectedTags,
        wordCount,
      });
      setIsSaving(false);
    }, 500);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const selectedMood = MOOD_OPTIONS.find(m => m.value === mood) || MOOD_OPTIONS[2];
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AA76D]/5 via-background to-[#88C0F7]/5">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-card rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">New Journal Entry</h1>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                  <AnimatePresence>
                    {showAutoSave && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-[#3AA76D]"
                      >
                        <Cloud className="w-3 h-3" />
                        Saved
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <motion.button
              onClick={handleSave}
              disabled={isSaving || (!title.trim() && !content.trim())}
              className="bg-[#3AA76D] text-white px-6 py-2.5 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSaving ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Entry
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Mood selector */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <label className="text-sm font-medium mb-3 block">How are you feeling?</label>
            <div className="flex flex-wrap gap-3">
              {MOOD_OPTIONS.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    mood === option.value
                      ? "border-current shadow-lg scale-105"
                      : "border-border/50 hover:border-border"
                  }`}
                  style={{
                    color: mood === option.value ? option.color : undefined,
                    backgroundColor: mood === option.value ? `${option.color}15` : undefined,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium text-sm">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Writing prompt suggestion */}
          {initialPrompt && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#3AA76D]/10 to-[#88C0F7]/10 rounded-2xl p-4 border border-[#3AA76D]/20"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#3AA76D] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Feeling stuck? Try this:</p>
                  <p className="font-medium">{initialPrompt}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Title input */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <input
              type="text"
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-2xl font-semibold placeholder:text-muted-foreground/50 focus:outline-none"
              maxLength={100}
            />
          </div>

          {/* Content area */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 min-h-[400px]">
            <textarea
              ref={contentRef}
              placeholder="Start writing... Let your thoughts flow freely. This is your safe space."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[350px] bg-transparent resize-none text-lg leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <label className="text-sm font-medium mb-3 block">Add tags (optional)</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-[#3AA76D] text-white"
                      : "bg-card border border-border hover:border-[#3AA76D]/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Encouragement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center text-sm text-muted-foreground italic"
          >
            "Writing is a way of talking without being interrupted." — Jules Renard
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
