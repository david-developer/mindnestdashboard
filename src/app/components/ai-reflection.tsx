import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BookmarkPlus, ThumbsUp, User, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";

interface AIReflectionProps {
  mood: number;
  tags: string[];
  onSaveToJournal: () => void;
  onMarkHelpful: () => void;
  onDiscussWithCounselor: () => void;
}

export function AIReflection({ mood, tags, onSaveToJournal, onMarkHelpful, onDiscussWithCounselor }: AIReflectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate contextual reflection based on mood and tags
  const getReflection = () => {
    if (mood < 40) {
      return {
        summary: "That sounds tough — you're not alone in feeling this way.",
        full: "It's completely okay to have difficult moments. When things feel overwhelming, sometimes the smallest steps can help shift our perspective. You're being brave by checking in with yourself. That takes real courage.",
        actions: [
          "Try a 5-minute breathing exercise",
          "Reach out to a friend or trusted person",
          "Write down one thing you're grateful for today"
        ]
      };
    } else if (mood < 60) {
      return {
        summary: "You're doing okay — that's something worth acknowledging.",
        full: "Being in the middle zone is normal. Not every day needs to be amazing. You're showing up and being honest about how you feel. That consistency builds resilience over time.",
        actions: [
          "Take a short walk or stretch",
          "Listen to a favorite song",
          "Set one small, achievable goal for today"
        ]
      };
    } else {
      return {
        summary: "Great to see you feeling positive today!",
        full: "It's wonderful that you're in a good space right now. These moments are worth savoring. Consider what's contributing to this feeling — it might help you create more of these experiences.",
        actions: [
          "Note what made today feel good",
          "Share your positive energy with someone",
          "Plan something you're looking forward to"
        ]
      };
    }
  };

  const reflection = getReflection();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="shadow-lg shadow-black/5 border-border">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">Companion</span>
                <span className="text-xs text-muted-foreground">AI Reflection</span>
              </div>
              <p className="text-sm">
                {isExpanded ? reflection.full : reflection.summary}
              </p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 pl-13"
            >
              <div>
                <p className="text-sm font-medium mb-2">Small steps you might try:</p>
                <ul className="space-y-1.5">
                  {reflection.actions.map((action, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveToJournal}
            >
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Save to Journal
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkHelpful}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDiscussWithCounselor}
            >
              <User className="mr-2 h-4 w-4" />
              Discuss
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}
