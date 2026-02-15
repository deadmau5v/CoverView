import { NextRequest, NextResponse } from 'next/server';
import unsplash from '@/lib/unsplash';

export async function POST(request: NextRequest) {
  const { downloadLocation } = await request.json();

  if (!downloadLocation) {
    return NextResponse.json({ error: 'Download location required' }, { status: 400 });
  }

  try {
    await unsplash.photos.trackDownload({
      downloadLocation,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track download' }, { status: 500 });
  }
}
