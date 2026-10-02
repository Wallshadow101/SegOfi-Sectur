import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedNumber({ value, suffix = "", duration = 800 }: AnimatedNumberProps) {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    let raf = 0;
    const inicio = performance.now();
    const paso = (t: number) => {
      const p = Math.min((t - inicio) / duration, 1);
      setActual(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <>
      {actual}
      {suffix}
    </>
  );
}
