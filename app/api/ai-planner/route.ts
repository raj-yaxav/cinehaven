import { NextRequest, NextResponse } from 'next/server';

interface PlannerRequest {
  occasion: string;
  mood: string;
  groupSize: number;
  budget: number;
  preferences?: string[];
}

interface Recommendation {
  package: string;
  room: string;
  decorTheme: string;
  estimatedPrice: number;
  addOns: string[];
  description: string;
}

// Recommendation engine based on inputs
function generateRecommendation(data: PlannerRequest, availableData: any): Recommendation {
  const { occasion, mood, groupSize, budget, preferences = [] } = data;
  
  // Determine package tier based on budget and group size
  let recommendedTier = 'silver';
  if (budget > 30000 || groupSize > 12) {
    recommendedTier = 'diamond';
  } else if (budget > 15000 || groupSize > 8) {
    recommendedTier = 'platinum';
  } else if (budget > 8000 || groupSize > 4) {
    recommendedTier = 'gold';
  }

  // Select room based on group size
  let recommendedRoom = 'The Intimate Corner';
  if (groupSize > 12) {
    recommendedRoom = 'The Party Zone';
  } else if (groupSize > 6) {
    recommendedRoom = 'The Grand Suite';
  } else if (groupSize > 3) {
    recommendedRoom = 'The Grand Suite';
  }

  // Determine decor theme based on mood and occasion
  const decorThemes: Record<string, string> = {
    'romantic': 'Romantic Red Theme',
    'party': 'Neon Nights',
    'chill': 'Golden Gala',
    'epic': 'Golden Gala',
    'nostalgic': 'Golden Gala',
  };

  const occasionDecor: Record<string, string> = {
    'birthday': 'Neon Nights',
    'proposal': 'Romantic Red Theme',
    'anniversary': 'Romantic Red Theme',
    'date_night': 'Romantic Red Theme',
    'family': 'Golden Gala',
    'corporate': 'Golden Gala',
  };

  let recommendedDecor = decorThemes[mood.toLowerCase()] || 'Golden Gala';
  if (occasionDecor[occasion.toLowerCase()]) {
    recommendedDecor = occasionDecor[occasion.toLowerCase()];
  }

  // Calculate estimated price
  let basePrice = 5000;
  if (recommendedTier === 'gold') basePrice = 10000;
  if (recommendedTier === 'platinum') basePrice = 25000;
  if (recommendedTier === 'diamond') basePrice = 75000;

  // Add per-person cost
  const perPersonCost = groupSize * 500;
  const estimatedPrice = basePrice + perPersonCost;

  // Recommend add-ons based on mood and occasion
  const recommendedAddOns: string[] = [];
  
  if (mood.toLowerCase() === 'party' || occasion.toLowerCase() === 'birthday') {
    recommendedAddOns.push('Karaoke Package', 'Confetti Cannon');
  }
  if (mood.toLowerCase() === 'romantic' || occasion.toLowerCase() === 'proposal' || occasion.toLowerCase() === 'anniversary') {
    recommendedAddOns.push('Professional Photography (2 hours)', 'Premium Beverage Package');
  }
  if (groupSize > 8) {
    recommendedAddOns.push('Gourmet Snack Platter', 'Premium Beverage Package');
  }
  if (budget > 20000) {
    recommendedAddOns.push('Videography Package', 'Fog Entry Setup');
  }

  // Generate description
  const descriptions: Record<string, string> = {
    'birthday': `Perfect for an unforgettable birthday celebration! We recommend ${recommendedRoom} with our ${recommendedTier} package, featuring ${recommendedDecor} to set the right vibe.`,
    'proposal': `Make your proposal absolutely magical with our carefully curated experience. ${recommendedRoom} provides the perfect intimate setting with ${recommendedDecor} for that special moment.`,
    'anniversary': `Celebrate your love story with an elegant anniversary experience. Our ${recommendedTier} package in ${recommendedRoom} with ${recommendedDecor} creates the perfect romantic atmosphere.`,
    'date_night': `A memorable date night deserves something special. Enjoy ${recommendedRoom} with ${recommendedDecor} for an intimate and luxurious experience.`,
    'family': `Bring the whole family together for a wonderful celebration! ${recommendedRoom} offers plenty of space, and our ${recommendedTier} package ensures everyone has a great time.`,
    'corporate': `Impress your team or clients with a premium corporate event. ${recommendedRoom} provides the perfect professional yet entertaining environment.`,
  };

  let description = descriptions[occasion.toLowerCase()] || 
    `Based on your preferences, we've curated the perfect experience for you!`;

  return {
    package: recommendedTier.charAt(0).toUpperCase() + recommendedTier.slice(1),
    room: recommendedRoom,
    decorTheme: recommendedDecor,
    estimatedPrice: Math.min(estimatedPrice, budget),
    addOns: recommendedAddOns,
    description,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: PlannerRequest = await request.json();
    
    // Validate required fields
    const { occasion, mood, groupSize, budget } = body;
    if (!occasion || !mood || !groupSize || !budget) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate ranges
    if (groupSize < 2 || groupSize > 50) {
      return NextResponse.json(
        { status: 'error', message: 'Group size must be between 2 and 50' },
        { status: 400 }
      );
    }

    if (budget < 2000 || budget > 200000) {
      return NextResponse.json(
        { status: 'error', message: 'Budget must be between ₹2,000 and ₹2,00,000' },
        { status: 400 }
      );
    }

    // Get available data (in production, fetch from database)
    const availableData = {
      packages: ['silver', 'gold', 'platinum', 'diamond'],
      rooms: ['The Intimate Corner', 'The Grand Suite', 'The Party Zone'],
      decorThemes: ['Romantic Red Theme', 'Golden Gala', 'Neon Nights'],
    };

    // Generate recommendation
    const recommendation = generateRecommendation(body, availableData);

    return NextResponse.json({
      status: 'success',
      data: recommendation,
    });

  } catch (error) {
    console.error('AI Planner Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'CineHaven AI Celebration Planner',
    endpoints: {
      POST: '/api/ai-planner - Get personalized recommendations',
    },
    parameters: {
      occasion: 'birthday | proposal | anniversary | date_night | family | corporate',
      mood: 'romantic | party | chill | epic | nostalgic',
      groupSize: '2-50 people',
      budget: '2000-200000 INR',
      preferences: 'Optional array of specific preferences',
    },
  });
}