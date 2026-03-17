import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tag, BookText, UserCheck, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface ContextCardsProps {
  topTags: Array<{ tag: string; count: number }>;
  recentHighlights: string[];
  counselorSuggestion?: {
    name: string;
    specialty: string;
  };
  onBrowseCounselors: () => void;
}

export function ContextCards({ topTags, recentHighlights, counselorSuggestion, onBrowseCounselors }: ContextCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="space-y-3"
    >
      <h4 className="px-1">This Week</h4>
      
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {/* Top Tags Card */}
        <Card className="shrink-0 w-64 shadow-md shadow-black/5 border-border snap-start">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Tag className="h-4 w-4" />
              <span className="font-medium text-sm">Top Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {topTags.map(({ tag, count }) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {tag} <span className="ml-1 text-xs opacity-70">×{count}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Journal Highlights Card */}
        <Card className="shrink-0 w-64 shadow-md shadow-black/5 border-border snap-start">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <BookText className="h-4 w-4" />
              <span className="font-medium text-sm">Journal Highlights</span>
            </div>
            <div className="space-y-2">
              {recentHighlights.map((highlight, index) => (
                <p key={index} className="text-sm text-muted-foreground line-clamp-2">
                  "{highlight}"
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Counselor Suggestion Card */}
        {counselorSuggestion && (
          <Card className="shrink-0 w-64 shadow-md shadow-black/5 border-border border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent snap-start">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-secondary">
                <UserCheck className="h-4 w-4" />
                <span className="font-medium text-sm">Counselor Suggestion</span>
              </div>
              <div>
                <p className="text-sm font-medium">{counselorSuggestion.name}</p>
                <p className="text-xs text-muted-foreground">{counselorSuggestion.specialty}</p>
              </div>
              <button
                onClick={onBrowseCounselors}
                className="w-full flex items-center justify-between text-sm text-secondary hover:underline"
              >
                <span>Browse counselors</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
