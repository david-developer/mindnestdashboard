import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface WeeklySparklineProps {
  data: Array<{ day: string; mood: number; date: string }>;
}

export function WeeklySparkline({ data }: WeeklySparklineProps) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const averageMood = Math.round(data.reduce((acc, d) => acc + d.mood, 0) / data.length);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card 
          className="shadow-lg shadow-black/5 border-border cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setShowModal(true)}
        >
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h4>Weekly Mood</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                Avg: {averageMood}%
              </span>
            </div>

            <div className="h-24 min-h-[96px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height={96}>
                  <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="moodGradientWeekly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3AA76D" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3AA76D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#717182' }}
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                              <p className="text-sm font-medium">{payload[0].payload.date}</p>
                              <p className="text-sm text-muted-foreground">Mood: {payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mood"
                      stroke="#3AA76D"
                      strokeWidth={2}
                      fill="url(#moodGradientWeekly)"
                      dot={{ fill: '#3AA76D', r: 4 }}
                      activeDot={{ r: 6, fill: '#3AA76D' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Tap to see monthly trends
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Monthly Mood Trends
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="h-64 min-h-[256px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height={256}>
                  <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                              <p className="text-sm font-medium">{payload[0].payload.date}</p>
                              <p className="text-sm text-muted-foreground">Mood: {payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#3AA76D"
                      strokeWidth={3}
                      dot={{ fill: '#3AA76D', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{averageMood}%</p>
                <p className="text-sm text-muted-foreground">Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{Math.max(...data.map(d => d.mood))}%</p>
                <p className="text-sm text-muted-foreground">Highest</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{Math.min(...data.map(d => d.mood))}%</p>
                <p className="text-sm text-muted-foreground">Lowest</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}