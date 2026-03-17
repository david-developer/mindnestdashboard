import { useState } from "react";
import { Header } from "./components/header";
import { QuickCheckIn } from "./components/quick-check-in";
import { AIReflection } from "./components/ai-reflection";
import { WeeklySparkline } from "./components/weekly-sparkline";
import { ContextCards } from "./components/context-cards";
import { MoodCircleFeed } from "./components/mood-circle-feed";
import { ProgressRewards } from "./components/progress-rewards";
import { ResourcesHelp } from "./components/resources-help";
import { JournalCTA } from "./components/journal-cta";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

// Mock data
const MOCK_WEEKLY_DATA = [
  { day: "Mon", mood: 65, date: "Mar 10" },
  { day: "Tue", mood: 70, date: "Mar 11" },
  { day: "Wed", mood: 45, date: "Mar 12" },
  { day: "Thu", mood: 60, date: "Mar 13" },
  { day: "Fri", mood: 75, date: "Mar 14" },
  { day: "Sat", mood: 80, date: "Mar 15" },
  { day: "Sun", mood: 72, date: "Mar 16" },
];

const MOCK_TOP_TAGS = [
  { tag: "exam", count: 4 },
  { tag: "sleep", count: 3 },
  { tag: "stressed", count: 2 },
];

const MOCK_JOURNAL_HIGHLIGHTS = [
  "Felt proud after finishing my assignment early",
  "Sleep has been rough but I'm trying new routines",
];

const MOCK_COUNSELOR = {
  name: "Dr. Sarah Chen",
  specialty: "Anxiety & Stress Management",
};

const MOCK_FRIENDS = [
  {
    id: "1",
    name: "Alex Rivera",
    initials: "AR",
    mood: 75,
    message: "Finally finished that project! Feeling relieved 😊",
    timestamp: "2h ago",
  },
  {
    id: "2",
    name: "Jamie Lee",
    initials: "JL",
    mood: 45,
    message: "Having a rough day, could use some encouragement",
    timestamp: "4h ago",
  },
  {
    id: "3",
    name: "Morgan Taylor",
    initials: "MT",
    mood: 65,
    message: "Taking it one step at a time today",
    timestamp: "6h ago",
  },
];

const MOCK_BADGES = [
  { id: "1", name: "First", icon: "🎯", unlocked: true },
  { id: "2", name: "Week", icon: "📅", unlocked: true },
  { id: "3", name: "Month", icon: "🌟", unlocked: false },
  { id: "4", name: "Consistent", icon: "💪", unlocked: true },
  { id: "5", name: "Helper", icon: "🤝", unlocked: false },
  { id: "6", name: "Journaler", icon: "📝", unlocked: true },
  { id: "7", name: "Resilient", icon: "🛡️", unlocked: false },
  { id: "8", name: "Champion", icon: "🏆", unlocked: false },
];

export default function App() {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [currentMood, setCurrentMood] = useState(0);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [streak, setStreak] = useState(7);
  const [totalCheckIns, setTotalCheckIns] = useState(23);
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>("2026-03-16"); // Mock last check-in
  const [checkedInToday, setCheckedInToday] = useState(false);

  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  const calculateStreak = (lastDate: string | null, todayDate: string): number => {
    if (!lastDate) return 1; // First ever check-in

    const last = new Date(lastDate);
    const today = new Date(todayDate);
    
    // Reset time to compare only dates
    last.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - last.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, keep current streak
      return streak;
    } else if (diffDays === 1) {
      // Consecutive day, increment streak
      return streak + 1;
    } else {
      // Streak broken, start over
      return 1;
    }
  };

  const handleReflect = (mood: number, tags: string[]) => {
    const today = getTodayDateString();
    
    // Only update streak if this is the first check-in today
    if (!checkedInToday) {
      const newStreak = calculateStreak(lastCheckInDate, today);
      setStreak(newStreak);
      setLastCheckInDate(today);
      setCheckedInToday(true);
    }

    setCurrentMood(mood);
    setCurrentTags(tags);
    setHasCheckedIn(true);
    setTotalCheckIns(prev => prev + 1);
    
    const message = checkedInToday 
      ? "Another reflection added today!"
      : "Check-in complete! Your reflection is ready.";
    toast.success(message);
  };

  const handleCheckInAction = () => {
    toast.info("Opening check-in...");
  };

  const handleAddJournal = () => {
    toast.info("Journal entry coming soon!");
  };

  const handleShareMood = () => {
    toast.success("Mood shared with your circle!");
  };

  const handleSaveToJournal = () => {
    toast.success("Reflection saved to your journal!");
  };

  const handleMarkHelpful = () => {
    toast.success("Thanks for the feedback!");
  };

  const handleDiscussWithCounselor = () => {
    toast.info("Connecting you with a counselor...");
  };

  const handleBrowseCounselors = () => {
    toast.info("Opening counselor directory...");
  };

  const handleFriendCheckIn = (friendId: string) => {
    const friend = MOCK_FRIENDS.find(f => f.id === friendId);
    toast.success(`Checking in on ${friend?.name}...`);
  };

  const handleFriendReact = (friendId: string) => {
    toast.success("❤️ Sent!");
  };

  const handleBadgeClick = (badgeId: string) => {
    const badge = MOCK_BADGES.find(b => b.id === badgeId);
    toast.info(`${badge?.icon} ${badge?.name} Badge - Great work!`);
  };

  const handleContactCounselor = () => {
    toast.info("Opening counselor contact form...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName="Layla"
        streak={streak}
        onCheckIn={handleCheckInAction}
        onAddJournal={handleAddJournal}
        onShareMood={handleShareMood}
      />

      <main className="pb-8">
        {/* Mobile: Single column, Desktop: Two columns */}
        <div className="container mx-auto px-4 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column (or main on mobile) */}
            <div className="lg:col-span-2 space-y-6">
              <QuickCheckIn
                onReflect={handleReflect}
                onAddJournal={handleAddJournal}
              />

              {hasCheckedIn && (
                <AIReflection
                  mood={currentMood}
                  tags={currentTags}
                  onSaveToJournal={handleSaveToJournal}
                  onMarkHelpful={handleMarkHelpful}
                  onDiscussWithCounselor={handleDiscussWithCounselor}
                />
              )}

              <JournalCTA onAddJournal={handleAddJournal} />

              <WeeklySparkline data={MOCK_WEEKLY_DATA} />

              <ContextCards
                topTags={MOCK_TOP_TAGS}
                recentHighlights={MOCK_JOURNAL_HIGHLIGHTS}
                counselorSuggestion={MOCK_COUNSELOR}
                onBrowseCounselors={handleBrowseCounselors}
              />

              <div className="lg:hidden space-y-6">
                <ProgressRewards
                  streak={streak}
                  totalCheckIns={totalCheckIns}
                  badges={MOCK_BADGES}
                  onBadgeClick={handleBadgeClick}
                />

                <MoodCircleFeed
                  friends={MOCK_FRIENDS}
                  onCheckIn={handleFriendCheckIn}
                  onReact={handleFriendReact}
                />

                <ResourcesHelp onContactCounselor={handleContactCounselor} />
              </div>
            </div>

            {/* Right column (desktop only) */}
            <div className="hidden lg:block space-y-6">
              <ProgressRewards
                streak={streak}
                totalCheckIns={totalCheckIns}
                badges={MOCK_BADGES}
                onBadgeClick={handleBadgeClick}
              />

              <MoodCircleFeed
                friends={MOCK_FRIENDS}
                onCheckIn={handleFriendCheckIn}
                onReact={handleFriendReact}
              />

              <ResourcesHelp onContactCounselor={handleContactCounselor} />
            </div>
          </div>
        </div>
      </main>

      <Toaster position="top-center" />
    </div>
  );
}