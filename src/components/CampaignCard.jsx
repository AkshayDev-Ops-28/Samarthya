import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { verticals } from '../data/mockData';
import NGOBadge from './NGOBadge';

export default function CampaignCard({ campaign, index = 0 }) {
  const vertical = verticals.find(v => v.id === campaign.verticalId);
  const progress = Math.round((campaign.enrolledCount / campaign.maxVolunteers) * 100);
  const spotsLeft = campaign.maxVolunteers - campaign.enrolledCount;

  const statusColors = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-gray-50 text-gray-500 border-gray-200',
  };

  const progressStyles = {
    'Food Security': 'bg-amber-400',
    'Child Welfare': 'bg-blue-400',
    'Animal Rescue': 'bg-red-400',
    'Environment': 'bg-green-600',
  };
  const progressClass = progressStyles[vertical?.name] || 'bg-[#1A4D2E]';

  return (
    <div
      className="group flex flex-col bg-white rounded-2xl border border-[#E8EDE5] overflow-hidden opacity-0 animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'forwards',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,77,46,0.14)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(26,77,46,0.25)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#E8EDE5';
      }}
    >
      {/* Color accent bar */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${vertical?.color || '#1A4D2E'}, ${vertical?.color || '#1A4D2E'}88)` }}
      />

      <div className="flex flex-col flex-1 p-6 gap-4">

        {/* Top row: badge + status */}
        <div className="flex items-center justify-between">
          <NGOBadge verticalId={campaign.verticalId} size="sm" />
          <span className={`text-xs px-3 py-1 rounded-full font-medium border capitalize ${statusColors[campaign.status]}`}>
            {campaign.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#1A1A1A] font-heading leading-snug line-clamp-2 group-hover:text-[#1A4D2E] transition-colors">
          {campaign.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 -mt-1">
          {campaign.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <MapPin size={13} className="shrink-0 text-[#1A4D2E]/50" />
            <span className="truncate">{campaign.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <Calendar size={13} className="shrink-0 text-[#1A4D2E]/50" />
            <span>
              {new Date(campaign.dateStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              {campaign.dateStart !== campaign.dateEnd &&
                ` — ${new Date(campaign.dateEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <Users size={13} className="shrink-0 text-[#1A4D2E]/50" />
            <span>{campaign.enrolledCount} / {campaign.maxVolunteers} volunteers</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-semibold text-[#1A1A1A]">{progress}% filled</span>
            <span className="text-[#9CA3AF]">{spotsLeft} spots left</span>
          </div>
          <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${progressClass}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/campaigns/${campaign.id}`}
          className="group/btn mt-1 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border border-[#E8EDE5] text-[#1A4D2E] bg-[#F5F7F2] hover:bg-[#1A4D2E] hover:text-white hover:border-[#1A4D2E] transition-all duration-200"
        >
          View Details
          <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>

      </div>
    </div>
  );
}