import Room from '../models/Room';
import AvailabilitySlot from '../models/AvailabilitySlot';

export const DEFAULT_AVAILABILITY_SLOTS = [
  { start: '10:00', end: '11:30' },
  { start: '11:30', end: '13:00' },
  { start: '13:00', end: '14:30' },
  { start: '14:30', end: '16:00' },
  { start: '16:00', end: '17:30' },
  { start: '17:30', end: '19:00' },
  { start: '19:00', end: '20:30' },
  { start: '20:30', end: '22:00' },
  { start: '22:00', end: '23:30' },
];

type SlotRoom = {
  _id: unknown;
  location: unknown;
};

export async function ensureDefaultSlotsForRooms(roomIds: string[], dateString: string) {
  if (!roomIds.length || !dateString) return { created: 0 };

  const rooms = await Room.find({
    _id: { $in: roomIds },
    isActive: { $ne: false },
  })
    .select('_id location')
    .lean<SlotRoom[]>();

  if (!rooms.length) return { created: 0 };

  const date = new Date(`${dateString}T00:00:00.000Z`);
  const operations = rooms.flatMap((room) =>
    DEFAULT_AVAILABILITY_SLOTS.map((slot) => ({
      updateOne: {
        filter: {
          room: room._id,
          dateString,
          start: slot.start,
          end: slot.end,
        },
        update: {
          $setOnInsert: {
            location: room.location,
            room: room._id,
            date,
            dateString,
            start: slot.start,
            end: slot.end,
            status: 'available',
            note: 'Default 90 minute slot',
          },
        },
        upsert: true,
      },
    }))
  );

  const result = await AvailabilitySlot.bulkWrite(operations, { ordered: false });
  return { created: result.upsertedCount || 0 };
}

export async function ensureDefaultSlotsForRoom(roomId: string, dateString: string) {
  return ensureDefaultSlotsForRooms([roomId], dateString);
}
