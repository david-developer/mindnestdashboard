import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

export function Confetti({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number }>>([]);

  useEffect(() => {
    if (show) {
      const colors = ["#3AA76D", "#F5A623", "#88C0F7", "#22C55E", "#F59E0B"];
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      }));
      setParticles(newParticles);

      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
    }
  }, [show, onComplete]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
          }}
          initial={{
            y: particle.y,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
