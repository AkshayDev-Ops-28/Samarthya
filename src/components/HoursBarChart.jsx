import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { monthlyHours } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-border p-3 min-w-[140px]">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-lg font-bold text-primary">{payload[0].value} hrs</p>
      {payload[0].payload.campaign && (
        <p className="text-xs text-text-secondary mt-0.5">{payload[0].payload.campaign}</p>
      )}
    </div>
  );
};

export default function HoursBarChart({ data = monthlyHours }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-heading text-text-primary">Monthly Hours</h3>
          <p className="text-sm text-text-muted">Volunteering hours over last 12 months</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-pale rounded-lg">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-xs font-medium text-primary">Hours</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            unit="h"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#E8F5E920' }} />
          <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry.hours > 15 ? '#1A4D2E' : entry.hours > 8 ? '#2E7D32' : '#A5D6A7'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
