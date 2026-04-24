import { verticals } from '../data/mockData';

export default function NGOBadge({ verticalId, size = 'sm', showLabel = true }) {
  const vertical = verticals.find(v => v.id === verticalId);
  if (!vertical) return null;

  const badgeStyles = {
    'Food Security': 'bg-amber-100 text-amber-800',
    'Child Welfare': 'bg-blue-100 text-blue-800',
    'Animal Rescue': 'bg-red-100 text-red-800',
    'Environment': 'bg-green-100 text-green-800',
  };

  const colorClass = badgeStyles[vertical.name] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full text-xs px-3 py-1 font-medium ${colorClass}`}>
      <span>{vertical.icon}</span>
      {showLabel && <span>{vertical.name}</span>}
    </span>
  );
}

export function NGOBadgeByName({ name, size = 'sm' }) {
  const vertical = verticals.find(v => v.name === name);
  if (!vertical) return (
    <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
      {name}
    </span>
  );
  return <NGOBadge verticalId={vertical.id} size={size} />;
}
