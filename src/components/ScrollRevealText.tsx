import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}) => {
  const words = children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.05em]"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-1">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
