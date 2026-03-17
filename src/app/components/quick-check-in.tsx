import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Sparkles, BookPlus } from "lucide-react";
import { motion } from "motion/react";

interface QuickCheckInProps {
  onReflect: (mood: number, tags: string[]) => void;
  onAddJournal: () => void;
}

const MOOD_EMOJIS = ["😞", "😕", "😐", "🙂", "😊", "😄"];
const MOOD_COLORS = ["#EF4444", "#F59E0B", "#FCD34D", "#84CC16", "#22C55E", "#10B981"];
const MOOD_NAMES = ["Struggling", "Down", "Okay", "Good", "Happy", "Amazing"];
const SUGGESTED_TAGS = ["exam", "sleep", "stressed", "tired", "happy", "anxious", "motivated"];

export function QuickCheckIn({ onReflect, onAddJournal }: QuickCheckInProps) {
  const [mood, setMood] = useState([50]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const getMoodIndex = (value: number) => Math.min(Math.floor(value / 20), 5);
  const currentMoodIndex = getMoodIndex(mood[0]);
  const currentEmoji = MOOD_EMOJIS[currentMoodIndex];
  const currentColor = MOOD_COLORS[currentMoodIndex];
  const currentMoodName = MOOD_NAMES[currentMoodIndex];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : prev.length < 3 ? [...prev, tag] : prev
    );
  };

  const handleReflect = () => {
    onReflect(mood[0], selectedTags);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg shadow-black/5 border-border">
        <CardContent className="p-6 space-y-5">
          <div>
            <h3 className="mb-1">How are you right now?</h3>
            <p className="text-sm text-muted-foreground">
              One quick check helps notice patterns.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-3">
              <motion.p
                key={currentMoodName}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-semibold tracking-wide"
                style={{ color: currentColor }}
              >
                {currentMoodName}
              </motion.p>
              <motion.div 
                className="text-6xl"
                key={currentEmoji}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {currentEmoji}
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <Slider
                value={mood}
                onValueChange={setMood}
                max={100}
                step={1}
                className="cursor-pointer"
                style={{
                  '--slider-color': currentColor
                } as React.CSSProperties}
              />
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>Not great</span>
                <span>Amazing</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm mb-3 block">What's happening? (Pick up to 3)</label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag) 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-md"
              onClick={handleReflect}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Reflect
            </Button>
            <Button 
              variant="outline"
              onClick={onAddJournal}
              className="shrink-0"
            >
              <BookPlus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}