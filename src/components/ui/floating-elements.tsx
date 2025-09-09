'use client';

import { motion } from 'framer-motion';

export function FloatingElements() {
  const elements = [
    { size: 'w-2 h-2', color: 'bg-primary/20', position: 'top-1/4 left-1/4', delay: 0 },
    { size: 'w-3 h-3', color: 'bg-secondary/20', position: 'top-1/3 right-1/4', delay: 1 },
    { size: 'w-1 h-1', color: 'bg-accent/30', position: 'bottom-1/4 left-1/3', delay: 2 },
    { size: 'w-2 h-2', color: 'bg-primary/15', position: 'bottom-1/3 right-1/3', delay: 3 },
    { size: 'w-4 h-4', color: 'bg-secondary/10', position: 'top-1/2 left-1/6', delay: 4 },
    { size: 'w-1 h-1', color: 'bg-accent/25', position: 'bottom-1/2 right-1/6', delay: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color} ${element.position} rounded-full blur-sm`}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
}