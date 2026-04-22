import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface MoodCircleItem {
  id: string;
  name: string;
  initials: string;
  mood: number;
  message: string;
  timestamp: string;
}

interface MoodCircleFeedProps {
  friends: MoodCircleItem[];
  onCheckIn: (friendId: string) => void;
  onReact: (friendId: string) => void;
}

const getMoodColor = (mood: number) => {
  if (mood < 40) return "#EF4444";
  if (mood < 60) return "#F59E0B";
  return "#22C55E";
};

export function MoodCircleFeed({ friends, onCheckIn, onReact }: MoodCircleFeedProps) {
  const [reactedIds, setReactedIds] = useState<Set<string>>(new Set());

  const handleReact = (friendId: string) => {
    setReactedIds(prev => new Set(prev).add(friendId));
    onReact(friendId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card className="shadow-lg shadow-black/5 border-border">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4>Mood Circle</h4>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <UserPlus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <div className="space-y-3">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
              >
                <div className="relative shrink-0">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {friend.initials}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card"
                    style={{ backgroundColor: getMoodColor(friend.mood) }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-sm">{friend.name}</span>
                    <span className="text-xs text-muted-foreground">{friend.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {friend.message}
                  </p>
                </div>

                <div className="flex gap-1 shrink-0">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReact(friend.id);
                      }}
                      aria-label="React with heart"
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors ${
                          reactedIds.has(friend.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCheckIn(friend.id);
                      }}
                      aria-label="Check in"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {friends.length === 0 && (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Add friends to see their mood updates
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}