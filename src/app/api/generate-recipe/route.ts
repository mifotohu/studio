import { NextRequest, NextResponse } from 'next/server';
import { generateRecipeFromImage } from '@/ai/flows/ai-recipe-generation-from-image';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { photoDataUri } = body;

    if (!photoDataUri || typeof photoDataUri !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid photoDataUri' },
        { status: 400 }
      );
    }

    const result = await generateRecipeFromImage({ photoDataUri });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    );
  }
}
