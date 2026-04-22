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
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="shrink-0 w-64 shadow-md shadow-black/5 border-border snap-start hover:shadow-lg transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Tag className="h-4 w-4" />
                <span className="font-medium text-sm">Top Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topTags.map(({ tag, count }, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge 
                      variant="secondary"
                      className="bg-primary/10 text-primary cursor-pointer"
                    >
                      {tag} <span className="ml-1 text-xs opacity-70">×{count}</span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Journal Highlights Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="shrink-0 w-64 shadow-md shadow-black/5 border-border snap-start hover:shadow-lg transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-accent">
                <BookText className="h-4 w-4" />
                <span className="font-medium text-sm">Journal Highlights</span>
              </div>
              <div className="space-y-2">
                {recentHighlights.map((highlight, index) => (
                  <motion.p 
                    key={index} 
                    className="text-sm text-muted-foreground line-clamp-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    "{highlight}"
                  </motion.p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Counselor Suggestion Card */}
        {counselorSuggestion && (
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shrink-0 w-64 shadow-md shadow-black/5 border-border border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent snap-start hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-secondary">
                  <UserCheck className="h-4 w-4" />
                  <span className="font-medium text-sm">Counselor Suggestion</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{counselorSuggestion.name}</p>
                  <p className="text-xs text-muted-foreground">{counselorSuggestion.specialty}</p>
                </div>
                <motion.button
                  onClick={onBrowseCounselors}
                  className="w-full flex items-center justify-between text-sm text-secondary hover:underline"
                  whileHover={{ x: 2 }}
                >
                  <span>Browse counselors</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
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