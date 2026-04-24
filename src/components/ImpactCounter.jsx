import { useEffect, useRef, useState } from 'react';

export default function ImpactCounter({ icon, label, value, suffix = '', color = '#1A4D2E' }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = numericValue / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formattedCount = count.toLocaleString('en-IN');

  return (
    <div
      ref={ref}
      className={`relative bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-500 group overflow-hidden ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 transition-opacity group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />

      <div className="relative">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
        <p className="text-3xl font-bold font-heading mb-1" style={{ color }}>
          {formattedCount}{suffix}
        </p>
        <p className="text-sm text-text-muted font-medium">{label}</p>
      </div>
    </div>
  );
}
