import { motion } from "framer-motion";
import { useRef } from "react";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-[500px] h-[400px] border"
    >
      <motion.div
  drag
  dragElastic={0.5}
  dragTransition={{
    bounceStiffness: 300,
    bounceDamping: 20,
  }}
  className="w-24 h-24 bg-blue-500 rounded-xl"
/>
    </div>
  );
}