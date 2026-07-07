import { NextRequest, NextResponse } from 'next/server';
import { videoService } from '@/lib/services/video.service';
import { videoSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const videos = await videoService.findAll();
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = videoSchema.parse({ body });
    const { title, youtubeUrl, order } = parsed.body;

    const video = await videoService.create({ title, youtubeUrl, order });
    return NextResponse.json(video, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
