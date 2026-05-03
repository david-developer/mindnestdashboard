import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Trash2, Calendar, Clock, BookOpen, Tag } from "lucide-react";
import { JournalEntryType } from "./journal";

interface JournalEntryProps {
  entry: JournalEntryType;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

const getMoodColor = (mood: number) => {
  if (mood >= 80) return "#3AA76D";
  if (mood >= 60) return "#F5A623";
  return "#88C0F7";
};

const getMoodEmoji = (mood: number) => {
  if (mood >= 80) return "😊";
  if (mood >= 60) return "😐";
  if (mood >= 40) return "😔";
  return "😢";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
};

export function JournalEntry({ entry, onToggleFavorite, onDelete, index }: JournalEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(entry.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const readingTime = Math.max(1, Math.ceil(entry.wordCount / 200));
  const moodColor = getMoodColor(entry.mood);
  const preview = entry.content.substring(0, 150) + (entry.content.length > 150 ? "..." : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div
        className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all hover:shadow-lg cursor-pointer relative overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Mood indicator bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, ${moodColor} 0%, ${moodColor}80 100%)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 mt-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
              <h3 className="font-semibold text-lg">{entry.title}</h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(entry.date)}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {entry.time}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {readingTime} min
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <motion.button
              onClick={() => onToggleFavorite(entry.id)}
              className="p-2 hover:bg-background rounded-xl transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`w-4 h-4 ${
                  entry.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className={`p-2 rounded-xl transition-colors ${
                showDeleteConfirm
                  ? "bg-red-500 text-white"
                  : "hover:bg-background text-muted-foreground"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-muted-foreground leading-relaxed">
                {preview}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <Tag className="w-3 h-3 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-background rounded-lg text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expand indicator */}
        {!isExpanded && entry.content.length > 150 && (
          <div className="mt-3 text-xs text-[#3AA76D] font-medium">
            Click to read more →
          </div>
        )}
      </div>

      {/* Delete confirmation message */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 mt-2 text-center"
          >
            Click delete again to confirm
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
