import { NextRequest, NextResponse } from "next/server";

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json({ error: "Query parameter required" }, { status: 400 });
  }

  const apiKey =
    process.env.PEXELS_API_KEY ||
    process.env.REACT_APP_PEXELS_API_KEY ||
    process.env.VITE_PEXELS_API_KEY ||
    process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Pexels API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=30`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Pexels" },
        { status: response.status }
      );
    }

    const data: PexelsSearchResponse = await response.json();

    const results = data.photos.map((photo) => ({
      id: `pexels-${photo.id}`,
      urls: {
        regular: photo.src.large,
        small: photo.src.medium,
        thumb: photo.src.tiny,
      },
      alt_description: photo.alt || `Photo by ${photo.photographer}`,
      user: {
        name: photo.photographer,
        profile_image: { small: "" },
        links: { html: photo.photographer_url },
      },
      links: {
        download_location: photo.src.original,
      },
      source: "pexels",
    }));

    return NextResponse.json({ results, total: data.total_results });
  } catch (error) {
    console.error("Pexels API error:", error);
    return NextResponse.json({ error: "Failed to search photos" }, { status: 500 });
  }
}
