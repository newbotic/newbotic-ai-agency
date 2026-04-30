import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received:', body);
    
    const { brand, platform } = body;
    
    if (!brand) {
      return NextResponse.json(
        { error: 'Brand is required' },
        { status: 400 }
      );
    }
    
    // Răspuns temporar fără Gemini (doar test)
    const mockPosts = [
      {
        content: `Welcome to ${brand}! 🚀\n\nWe are excited to announce our new collection. Stay tuned for more updates!`,
        hashtags: `#${brand.replace(/ /g, '')} #NewCollection #ComingSoon`,
        bestTime: "18:00"
      },
      {
        content: `Why ${brand} is different?\n\nWe believe in quality, innovation, and customer satisfaction. Join our community today!`,
        hashtags: `#QualityFirst #Innovation #${brand}`,
        bestTime: "12:00"
      },
      {
        content: `Special offer for our followers! 🎁\n\nGet 20% off your first order. Use code: WELCOME20\n\nLimited time only!`,
        hashtags: `#Sale #Discount #${brand} #Offer`,
        bestTime: "09:00"
      }
    ];
    
    return NextResponse.json({
      success: true,
      brand,
      platform,
      posts: mockPosts,
      generatedAt: new Date().toISOString(),
      note: "This is a mock response. Gemini API will be connected soon."
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
