'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Users, Clock, Crown, Tv, Play, CheckCircle2, Loader2, AlertCircle,
} from 'lucide-react';
import type { Room, Slot } from './types';

interface RoomCardProps {
  room: Room;
  isExpanded: boolean;
  isSelectedRoom: boolean;
  selectedSlotId: string;
  selectedDate: string;
  slots: Slot[];
  isLoadingSlots: boolean;
  error: string;
  onToggleExpand: (id: string) => void;
  onSelectSlot: (roomId: string, slotId: string) => void;
  onVideoClick: (url: string) => void;
}

const formatTimeRange = (start: string, end: string) => {
  try {
    const t = (s: string) => {
      const [h, m] = s.split(':');
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const display = hour % 12 || 12;
      return `${display}:${m} ${ampm}`;
    };
    return `${t(start)} - ${t(end)}`;
  } catch {
    return `${start} - ${end}`;
  }
};

export const RoomCard = memo(function RoomCard({
  room,
  isExpanded,
  isSelectedRoom,
  selectedSlotId,
  slots,
  isLoadingSlots,
  error,
  onToggleExpand,
  onSelectSlot,
  onVideoClick,
}: RoomCardProps) {
  const image = room.images?.[0];

  return (
    <motion.div
      layout={false}
      className={`rounded-card border-2 overflow-hidden bg-black/[0.01] backdrop-blur-md transition-all ${
        isSelectedRoom ? 'border-amber ring-1 ring-amber/30' : 'border-black/6 hover:border-black/10'
      }`}
    >
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-mauve-light to-mauve">
        {image ? (
          <Image
            src={image}
            alt={room.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Crown className="h-14 w-14 text-amber/30" />
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-ink/60 backdrop-blur-md text-ivory border border-white/20">
            <Tv className="h-3 w-3" />
            Private Theatre
          </span>
        </div>

        {room.videoUrl && (
          <button
            onClick={(e) => { e.stopPropagation(); onVideoClick(room.videoUrl!); }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-ink/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-amber hover:text-midnight transition-colors"
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        )}

        {isSelectedRoom && (
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber text-midnight">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Selected
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-display font-semibold text-ivory">{room.name}</h3>
          {room.videoUrl && (
            <button
              onClick={() => onVideoClick(room.videoUrl!)}
              className="text-xs text-amber hover:underline flex items-center gap-1 mt-0.5"
            >
              <Play className="h-3 w-3 fill-current" />
              Watch video
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-mist">
          <Users className="h-4 w-4 text-amber" />
          <span>
            {room.capacity.min} guest{room.capacity.min !== 1 ? 's' : ''} included
            {room.capacity.max > room.capacity.min ? ` (Maximum ${room.capacity.max})` : ''}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xs text-mist uppercase tracking-wider">Starts From</span>
          <span className="text-2xl font-bold text-gradient-amber">
            ₹{room.basePrice?.toLocaleString() || '—'}
          </span>
        </div>

        {room.features && room.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {room.features.map((feature, i) => (
              <span key={i} className="text-[11px] px-2 py-1 rounded-md bg-black/3 text-mist border border-black/4">
                {feature}
              </span>
            ))}
          </div>
        )}

        {room.occasions && room.occasions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-black/4">
            {room.occasions.map((occasion, i) => (
              <span key={i} className="text-[11px] px-2 py-1 rounded-md bg-amber/5 text-amber/90 border border-amber/10">
                {occasion}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-black/4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-accent uppercase tracking-widest text-amber flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Available slots
            </p>
            {!isExpanded && (
              <button
                onClick={() => onToggleExpand(room._id)}
                className="text-xs text-mist hover:text-amber"
              >
                View slots
              </button>
            )}
          </div>

          {isExpanded && (
            <>
              {isLoadingSlots ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-amber" />
                </div>
              ) : error ? (
                <p className="text-xs text-coral py-2">{error}</p>
              ) : slots.length === 0 ? (
                <p className="text-xs text-dusty py-2">No slots for this date. Try another date.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => {
                    const isSlotActive = selectedSlotId === slot._id;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => onSelectSlot(room._id, slot._id)}
                        className={`flex flex-col items-start gap-0.5 rounded-lg border p-2.5 text-left transition-all ${
                          isSlotActive
                            ? 'border-amber bg-amber/10 ring-1 ring-amber/40'
                            : 'border-black/6 bg-black/[0.01] hover:border-amber/30 hover:bg-black/[0.025]'
                        }`}
                      >
                        <span className={`text-xs font-semibold ${isSlotActive ? 'text-amber' : 'text-ivory'}`}>
                          {formatTimeRange(slot.start, slot.end)}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs">
                          {slot.originalPrice && slot.originalPrice > (slot.priceOverride || 0) ? (
                            <>
                              <span className="line-through text-dusty">₹{slot.originalPrice.toLocaleString()}</span>
                              <span className={isSlotActive ? 'text-amber' : 'text-ivory'}>
                                ₹{(slot.priceOverride || 0).toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className={isSlotActive ? 'text-amber' : 'text-ivory'}>
                              ₹{(slot.priceOverride || room.basePrice || 0).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
});
