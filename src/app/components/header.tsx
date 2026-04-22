import { Plus, BookOpen, Share2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface HeaderProps {
  userName: string;
  streak: number;
  onCheckIn: () => void;
  onAddJournal: () => void;
  onShareMood: () => void;
}

export function Header({ userName, streak, onCheckIn, onAddJournal, onShareMood }: HeaderProps) {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Evening";
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <motion.div 
            className="min-w-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground truncate">
              {timeOfDay()}, {userName}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-primary to-accent text-white shrink-0 px-2.5 py-0.5"
            >
              🔥 {streak} day{streak !== 1 ? 's' : ''}
            </Badge>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="icon" 
              variant="ghost"
              className="h-9 w-9"
              onClick={onCheckIn}
              aria-label="Check-in"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="icon" 
              variant="ghost"
              className="h-9 w-9"
              onClick={onAddJournal}
              aria-label="Add Journal"
            >
              <BookOpen className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="icon" 
              variant="ghost"
              className="h-9 w-9"
              onClick={onShareMood}
              aria-label="Share Mood"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}