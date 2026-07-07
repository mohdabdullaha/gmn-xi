import { NextRequest, NextResponse } from 'next/server';
import { infographicService } from '@/lib/services/pdf.service';
import { pdfSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = requireAdmin(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    const body = await req.json();
    const parsed = pdfSchema.parse({ body });
    const { title, desc, fileUrl, order } = parsed.body;

    const result = await infographicService.update(id, { title, desc, fileUrl, order });
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = requireAdmin(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    const result = await infographicService.delete(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
