import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Pen, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface JournalCTAProps {
  onAddJournal: () => void;
}

export function JournalCTA({ onAddJournal }: JournalCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <Card className="shadow-xl shadow-accent/10 border-accent/30 bg-gradient-to-br from-accent/5 via-background to-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4>Write in Your Journal</h4>
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Take a moment to capture your thoughts, feelings, and experiences. 
                Journaling helps you process emotions and track your mental wellness journey.
              </p>
              
              <Button
                onClick={onAddJournal}
                className="w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                <Pen className="mr-2 h-4 w-4" />
                Start Writing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
