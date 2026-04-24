import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ngoDistribution } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-border p-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
        <span className="text-sm font-medium text-text-primary">{payload[0].name}</span>
      </div>
      <p className="text-lg font-bold mt-1" style={{ color: payload[0].payload.color }}>{payload[0].value}%</p>
    </div>
  );
};

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {payload?.map((entry, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="text-xs text-text-secondary">{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function NGOPieChart({ data = ngoDistribution }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold font-heading text-text-primary">NGO Distribution</h3>
        <p className="text-sm text-text-muted">Percentage of hours across verticals</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
            animationBegin={200}
            animationDuration={1200}
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
