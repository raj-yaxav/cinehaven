const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinehaven';

const locations = [
  {
    name: 'CineHaven Premium - Bandra',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '123 Linking Road, Bandra West, Mumbai 400050',
    coordinates: [72.8347, 19.0544],
    description: 'Our flagship location in the heart of Bandra, featuring luxury private theatre rooms with state-of-the-art sound and projection systems.',
    amenities: ['Parking', 'WiFi', 'Green Room', 'Lounge Area', 'Bar'],
    images: ['/images/locations/bandra-1.jpg', '/images/locations/bandra-2.jpg'],
    isActive: true,
  },
  {
    name: 'CineHaven Elite - Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    address: '456 5th Block, Koramangala, Bangalore 560095',
    coordinates: [77.6415, 12.9352],
    description: 'A premium private theatre experience in Bangalore\'s trendiest neighborhood.',
    amenities: ['Parking', 'WiFi', 'AC', 'Snacks Bar'],
    images: ['/images/locations/koramangala-1.jpg', '/images/locations/koramangala-2.jpg'],
    isActive: true,
  },
  {
    name: 'CineHaven Royale - Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    address: '789 Connaught Circus, New Delhi 110001',
    coordinates: [77.2167, 28.6328],
    description: 'Experience luxury private cinema in the heart of the capital.',
    amenities: ['Valet Parking', 'WiFi', 'VIP Lounge', 'Premium Sound'],
    images: ['/images/locations/cp-1.jpg', '/images/locations/cp-2.jpg'],
    isActive: true,
  },
];

const rooms = [
  {
    name: 'The Grand Suite',
    slug: 'grand-suite',
    description: 'Our most luxurious room with 4K laser projection, Dolby Atmos sound, and plush recliners for up to 12 guests.',
    capacity: { min: 4, max: 12 },
    screenSize: '180-inch 4K Laser',
    soundSystem: 'Dolby Atmos 7.1.4',
    features: ['karaoke', 'gaming', 'fog_entry', 'led_lights'],
    basePrice: 5000,
    pricePerExtraPerson: 400,
    images: ['/images/rooms/grand-suite-1.jpg', '/images/rooms/grand-suite-2.jpg'],
    isActive: true,
    rating: 4.9,
    reviewCount: 245,
  },
  {
    name: 'The Intimate Corner',
    slug: 'intimate-corner',
    description: 'Perfect for couples or small groups, featuring a cozy ambiance with premium comfort seating.',
    capacity: { min: 2, max: 6 },
    screenSize: '120-inch 4K',
    soundSystem: 'Dolby Digital 5.1',
    features: ['romantic_lighting', 'champagne_service'],
    basePrice: 2500,
    pricePerExtraPerson: 300,
    images: ['/images/rooms/intimate-corner-1.jpg', '/images/rooms/intimate-corner-2.jpg'],
    isActive: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    name: 'The Party Zone',
    slug: 'party-zone',
    description: 'A vibrant space designed for celebrations with dance floor, disco lights, and powerful sound system.',
    capacity: { min: 8, max: 20 },
    screenSize: '200-inch 4K Laser',
    soundSystem: 'JBL Professional 9.1',
    features: ['karaoke', 'dance_floor', 'disco_lights', 'confetti_cannon'],
    basePrice: 8000,
    pricePerExtraPerson: 500,
    images: ['/images/rooms/party-zone-1.jpg', '/images/rooms/party-zone-2.jpg'],
    isActive: true,
    rating: 4.7,
    reviewCount: 312,
  },
];

const packages = [
  {
    name: 'Silver Celebration',
    slug: 'silver-celebration',
    tier: 'silver',
    description: 'Perfect for intimate gatherings. Includes 2-hour movie screening, basic decor, and complimentary soft drinks.',
    features: ['2-hour movie screening', 'Basic themed decor', 'Soft drinks', 'Birthday cake (1kg)', 'Personalized invitation'],
    priceModifier: 0,
    isPopular: false,
    image: '/images/packages/silver.jpg',
  },
  {
    name: 'Gold Experience',
    slug: 'gold-experience',
    tier: 'gold',
    description: 'Our most popular package with enhanced decor, premium snacks, and photography.',
    features: ['3-hour movie screening', 'Premium themed decor', 'Unlimited snacks & beverages', '2kg premium cake', '1-hour photography', 'Custom playlist', 'Party favors'],
    priceModifier: 5000,
    isPopular: true,
    image: '/images/packages/gold.jpg',
  },
  {
    name: 'Platinum Premium',
    slug: 'platinum-premium',
    tier: 'platinum',
    description: 'The ultimate celebration experience with gourmet dining, live entertainment, and luxury amenities.',
    features: ['4-hour movie screening', 'Luxury themed decor', 'Gourmet dining experience', '3kg designer cake', 'Professional photography & videography', 'Live musician/DJ', 'Fog entry', 'Custom video montage', 'Luxury car pickup'],
    priceModifier: 15000,
    isPopular: false,
    image: '/images/packages/platinum.jpg',
  },
  {
    name: 'Diamond Ultimate',
    slug: 'diamond-ultimate',
    tier: 'diamond',
    description: 'The most exclusive experience with every premium feature and personalized service.',
    features: ['Unlimited movie screening', 'Bespoke themed decor', 'Multi-course gourmet dining', 'Designer cake (5kg)', 'Full production team', 'Live performance', 'Helicopter transfer option', 'Celebrity appearance (on request)', 'Memory book', 'Spa & grooming session'],
    priceModifier: 50000,
    isPopular: false,
    image: '/images/packages/diamond.jpg',
  },
];

const addOns = [
  // Decor Themes
  {
    name: 'Romantic Red Theme',
    category: 'decor',
    description: 'Elegant red roses, candles, and soft lighting for a romantic ambiance.',
    price: 2000,
    images: ['/images/addons/romantic-red.jpg'],
    isActive: true,
  },
  {
    name: 'Golden Gala',
    category: 'decor',
    description: 'Luxurious gold and black theme with premium balloons and drapes.',
    price: 3500,
    images: ['/images/addons/golden-gala.jpg'],
    isActive: true,
  },
  {
    name: 'Neon Nights',
    category: 'decor',
    description: 'Vibrant neon lights and UV reactive decorations for a party vibe.',
    price: 2500,
    images: ['/images/addons/neon-nights.jpg'],
    isActive: true,
  },

  // Food & Beverages
  {
    name: 'Gourmet Snack Platter',
    category: 'food',
    description: 'Assorted premium snacks including nachos, fries, and finger foods.',
    price: 1500,
    images: ['/images/addons/snack-platter.jpg'],
    isActive: true,
  },
  {
    name: 'Premium Beverage Package',
    category: 'food',
    description: 'Unlimited mocktails, sodas, and premium beverages.',
    price: 2000,
    images: ['/images/addons/beverages.jpg'],
    isActive: true,
  },

  // Cakes
  {
    name: 'Designer Cake (2kg)',
    category: 'cake',
    description: 'Custom-designed cake with your message and theme.',
    price: 2500,
    images: ['/images/addons/designer-cake.jpg'],
    isActive: true,
    options: [
      { name: 'Chocolate', price: 0 },
      { name: 'Vanilla', price: 0 },
      { name: 'Red Velvet', price: 200 },
      { name: 'Blueberry', price: 300 },
    ],
  },

  // Photography
  {
    name: 'Professional Photography (2 hours)',
    category: 'photo',
    description: 'Professional photographer to capture your special moments.',
    price: 5000,
    images: ['/images/addons/photography.jpg'],
    isActive: true,
  },
  {
    name: 'Videography Package',
    category: 'photo',
    description: 'Professional video recording with editing and highlight reel.',
    price: 8000,
    images: ['/images/addons/videography.jpg'],
    isActive: true,
  },

  // Special Effects
  {
    name: 'Fog Entry Setup',
    category: 'effects',
    description: 'Create a dramatic entrance with fog machines and lighting.',
    price: 1500,
    images: ['/images/addons/fog-entry.jpg'],
    isActive: true,
  },
  {
    name: 'Confetti Cannon',
    category: 'effects',
    description: 'Surprise your guests with a burst of confetti.',
    price: 800,
    images: ['/images/addons/confetti.jpg'],
    isActive: true,
  },

  // Entertainment
  {
    name: 'Karaoke Package',
    category: 'entertainment',
    description: 'Professional karaoke setup with unlimited songs.',
    price: 2000,
    images: ['/images/addons/karaoke.jpg'],
    isActive: true,
  },
  {
    name: 'Gaming Console',
    category: 'entertainment',
    description: 'PS5 or Xbox with popular games.',
    price: 1500,
    images: ['/images/addons/gaming.jpg'],
    isActive: true,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(uri, { dbName: 'cinehaven' });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.db.dropDatabase();
    console.log('🗑️  Cleared existing data');

    // Create collections
    const locationsCollection = mongoose.connection.collection('locations');
    const roomsCollection = mongoose.connection.collection('rooms');
    const packagesCollection = mongoose.connection.collection('packages');
    const addonsCollection = mongoose.connection.collection('addons');

    // Insert locations
    const insertedLocations = await locationsCollection.insertMany(locations);
    console.log(`✅ Inserted ${insertedLocations.insertedCount} locations`);

    // Insert rooms with location references
    const locationIds = Object.values(insertedLocations.insertedIds);
    const roomsWithLocation = rooms.map(room => ({
      ...room,
      location: locationIds[0],
    }));
    const insertedRooms = await roomsCollection.insertMany(roomsWithLocation);
    console.log(`✅ Inserted ${insertedRooms.insertedCount} rooms`);

    // Insert packages
    const insertedPackages = await packagesCollection.insertMany(packages);
    console.log(`✅ Inserted ${insertedPackages.insertedCount} packages`);

    // Insert add-ons
    const insertedAddOns = await addonsCollection.insertMany(addOns);
    console.log(`✅ Inserted ${insertedAddOns.insertedCount} add-ons`);

    // Update locations with room references
    const roomIds = Object.values(insertedRooms.insertedIds);
    
    await locationsCollection.updateOne(
      { _id: locationIds[0] },
      { $set: { rooms: roomIds } }
    );

    console.log('✅ Updated locations with room references');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${insertedLocations.insertedCount} Locations`);
    console.log(`   - ${insertedRooms.insertedCount} Rooms`);
    console.log(`   - ${insertedPackages.insertedCount} Packages`);
    console.log(`   - ${insertedAddOns.insertedCount} Add-ons`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedDatabase();