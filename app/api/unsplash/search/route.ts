import { NextRequest, NextResponse } from 'next/server';
import unsplash from '@/lib/unsplash';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const result = await unsplash.search.getPhotos({
      query,
      page: parseInt(page),
      perPage: 30,
    });

    if (result.errors) {
      return NextResponse.json({ error: result.errors }, { status: 500 });
    }

    return NextResponse.json(result.response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search photos' }, { status: 500 });
  }
}
