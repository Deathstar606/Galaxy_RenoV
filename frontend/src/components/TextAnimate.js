import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const StaggeredText = ({ text }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true 
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
    ref={ref} 
    variants={textVariants} 
    initial="hidden" 
    animate={inView ? "visible" : "initial"}>
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};