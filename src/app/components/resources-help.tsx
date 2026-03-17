import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, Phone, MessageSquare, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface ResourcesHelpProps {
  onContactCounselor: () => void;
}

const CRISIS_RESOURCES = [
  {
    name: "National Crisis Line",
    number: "988",
    description: "24/7 support for mental health crises"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free, 24/7 text support"
  }
];

export function ResourcesHelp({ onContactCounselor }: ResourcesHelpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <Card className="shadow-lg shadow-black/5 border-border">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h4>Resources & Help</h4>
          </div>

          {/* Crisis Button */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm mb-1">In Crisis?</p>
                <p className="text-sm text-muted-foreground mb-3">
                  If you're in immediate danger or having thoughts of self-harm, please reach out for help right away.
                </p>
                <div className="space-y-2">
                  {CRISIS_RESOURCES.map((resource, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="shrink-0"
                        onClick={() => window.open(`tel:${resource.number.replace(/\D/g, '')}`)}
                      >
                        {resource.number.includes('Text') ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Counselor CTA */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Want to talk to someone? Our counselors are here to help.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={onContactCounselor}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Talk to a Counselor
            </Button>
          </div>

          {/* Additional Resources */}
          <div className="pt-3 border-t space-y-2">
            <p className="text-xs text-muted-foreground font-medium mb-2">Additional Resources</p>
            <div className="space-y-1.5">
              <button className="w-full flex items-center justify-between text-sm text-left hover:bg-accent/10 p-2 rounded-lg transition-colors">
                <span>Self-Care Tips</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between text-sm text-left hover:bg-accent/10 p-2 rounded-lg transition-colors">
                <span>Mental Health Articles</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between text-sm text-left hover:bg-accent/10 p-2 rounded-lg transition-colors">
                <span>Community Forums</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
