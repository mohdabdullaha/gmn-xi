import { NextRequest, NextResponse } from 'next/server';
import { infographicService } from '@/lib/services/pdf.service';
import { pdfSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const pdfs = await infographicService.findAll();
    return NextResponse.json(pdfs);
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
    const parsed = pdfSchema.parse({ body });
    const { title, desc, fileUrl, order } = parsed.body;

    const pdf = await infographicService.create({ title, desc, fileUrl, order });
    return NextResponse.json(pdf, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
