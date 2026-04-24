import { weeklyActivity } from '../data/mockData';

const COLORS = {
  food: '#D4891A',
  child: '#1976D2',
  animal: '#C0392B',
  env: '#2E7D32',
};

const LABELS = {
  food: 'Food Security',
  child: 'Child Welfare',
  animal: 'Animal Rescue',
  env: 'Environment',
};

export default function ActivityWheel({ data = weeklyActivity }) {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const minRadius = 30;
  const categories = ['food', 'child', 'animal', 'env'];
  const days = data.map(d => d.day);

  const maxVal = Math.max(...data.flatMap(d => categories.map(c => d[c])));
  const ringWidth = (maxRadius - minRadius) / categories.length;

  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold font-heading text-text-primary">Activity Wheel</h3>
        <p className="text-sm text-text-muted">Weekly activity intensity per cause</p>
      </div>
      <div className="flex justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Background circles */}
          {categories.map((_, ci) => (
            <circle
              key={ci}
              cx={centerX}
              cy={centerY}
              r={minRadius + (ci + 1) * ringWidth}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          ))}

          {/* Spokes */}
          {days.map((_, di) => {
            const angle = (di / days.length) * 2 * Math.PI - Math.PI / 2;
            const x2 = centerX + Math.cos(angle) * maxRadius;
            const y2 = centerY + Math.sin(angle) * maxRadius;
            return (
              <line
                key={di}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="#E2E8F0"
                strokeWidth="1"
              />
            );
          })}

          {/* Data segments */}
          {categories.map((cat, ci) => {
            const innerR = minRadius + ci * ringWidth + 2;
            const outerR = minRadius + (ci + 1) * ringWidth - 2;

            return data.map((d, di) => {
              const val = d[cat];
              if (val === 0) return null;
              const opacity = 0.3 + (val / maxVal) * 0.7;
              const startAngle = (di / days.length) * 2 * Math.PI - Math.PI / 2;
              const endAngle = ((di + 1) / days.length) * 2 * Math.PI - Math.PI / 2;
              const gap = 0.03;

              const x1 = centerX + Math.cos(startAngle + gap) * innerR;
              const y1 = centerY + Math.sin(startAngle + gap) * innerR;
              const x2 = centerX + Math.cos(startAngle + gap) * outerR;
              const y2 = centerY + Math.sin(startAngle + gap) * outerR;
              const x3 = centerX + Math.cos(endAngle - gap) * outerR;
              const y3 = centerY + Math.sin(endAngle - gap) * outerR;
              const x4 = centerX + Math.cos(endAngle - gap) * innerR;
              const y4 = centerY + Math.sin(endAngle - gap) * innerR;

              const largeArc = (endAngle - gap) - (startAngle + gap) > Math.PI ? 1 : 0;

              const path = [
                `M ${x1} ${y1}`,
                `L ${x2} ${y2}`,
                `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x3} ${y3}`,
                `L ${x4} ${y4}`,
                `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1}`,
                'Z'
              ].join(' ');

              return (
                <path
                  key={`${cat}-${di}`}
                  d={path}
                  fill={COLORS[cat]}
                  opacity={opacity}
                  className="transition-opacity duration-300 hover:opacity-100 cursor-pointer"
                >
                  <title>{`${days[di]}: ${LABELS[cat]} — ${val}h`}</title>
                </path>
              );
            });
          })}

          {/* Day labels */}
          {days.map((day, di) => {
            const angle = ((di + 0.5) / days.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (maxRadius + 15);
            const y = centerY + Math.sin(angle) * (maxRadius + 15);
            return (
              <text
                key={di}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] fill-gray-400 font-medium"
              >
                {day}
              </text>
            );
          })}

          {/* Center label */}
          <text x={centerX} y={centerY - 6} textAnchor="middle" className="text-[10px] fill-gray-400 font-medium">
            Weekly
          </text>
          <text x={centerX} y={centerY + 8} textAnchor="middle" className="text-[10px] fill-gray-400 font-medium">
            Activity
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[cat] }} />
            <span className="text-xs text-text-secondary">{LABELS[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
