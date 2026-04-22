import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy, Flame, TrendingUp, Star } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { Badge as BadgeUI } from "./ui/badge";
import { Progress } from "./ui/progress";

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

interface ProgressRewardsProps {
  streak: number;
  totalCheckIns: number;
  badges: Badge[];
  onBadgeClick: (badgeId: string) => void;
}

export function ProgressRewards({ streak, totalCheckIns, badges, onBadgeClick }: ProgressRewardsProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [displayStreak, setDisplayStreak] = useState(0);
  const [displayCheckIns, setDisplayCheckIns] = useState(0);
  
  // Animated counter effect
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const streakIncrement = streak / steps;
    const checkInsIncrement = totalCheckIns / steps;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayStreak(Math.round(streakIncrement * currentStep));
        setDisplayCheckIns(Math.round(checkInsIncrement * currentStep));
      } else {
        setDisplayStreak(streak);
        setDisplayCheckIns(totalCheckIns);
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [streak, totalCheckIns]);

  const nextMilestone = Math.ceil(totalCheckIns / 10) * 10;
  const progressToNext = ((totalCheckIns % 10) / 10) * 100;

  const streakPercentage = Math.min((streak / 30) * 100, 100);
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray - (streakPercentage / 100) * strokeDasharray;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <Card className="shadow-lg shadow-black/5 border-border">
        <CardContent className="p-6 space-y-5">
          <h4>Progress & Rewards</h4>

          {/* Streak Ring */}
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <svg className="w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="45"
                  fill="none"
                  stroke="url(#streakGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  initial={{ strokeDashoffset: strokeDasharray }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3AA76D" />
                    <stop offset="100%" stopColor="#88C0F7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame className="h-6 w-6 text-secondary mb-1" />
                <motion.p className="text-2xl font-bold">{displayStreak}</motion.p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <motion.p className="text-sm text-muted-foreground mb-2">
                Nice! {displayStreak} day{streak !== 1 ? 's' : ''} in a row — small & steady.
              </motion.p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <motion.span className="text-muted-foreground">{displayCheckIns} check-ins</motion.span>
                  <span className="text-muted-foreground">Next: {nextMilestone}</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Badges</span>
              <BadgeUI variant="outline" className="text-xs">
                {badges.filter(b => b.unlocked).length}/{badges.length}
              </BadgeUI>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {badges.map((badge, index) => (
                <motion.button
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: badge.unlocked ? 1.1 : 1 }}
                  whileTap={{ scale: badge.unlocked ? 0.95 : 1 }}
                  onClick={() => badge.unlocked && onBadgeClick?.(badge.id)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    badge.unlocked
                      ? 'bg-gradient-to-br from-primary to-accent shadow-md'
                      : 'bg-muted/50 opacity-40'
                  }`}
                  disabled={!badge.unlocked}
                  aria-label={badge.name}
                >
                  <span className={`text-2xl ${badge.unlocked ? '' : 'grayscale'}`}>
                    {badge.icon}
                  </span>
                  <span className={`text-xs ${badge.unlocked ? 'text-white' : 'text-muted-foreground'}`}>
                    {badge.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Achievement Milestones */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-5 w-5 text-secondary" />
              </div>
              <motion.p className="text-lg font-bold">{displayCheckIns}</motion.p>
              <p className="text-xs text-muted-foreground">Check-ins</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <motion.p className="text-lg font-bold">{displayStreak}</motion.p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <p className="text-lg font-bold">{badges.filter(b => b.unlocked).length}</p>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}