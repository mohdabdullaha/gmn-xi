import { NextRequest, NextResponse } from 'next/server';
import { inquiryService } from '@/lib/services/inquiry.service';
import { inquirySchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await inquiryService.findAll();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // The previous schema requires req.body to match the validation.
    // In Express, body-parser put the JSON in req.body.
    // In Next.js, we parsed the json into `body`.
    const parsed = inquirySchema.parse({ body });
    const { name, email, message } = parsed.body;

    const inquiry = await inquiryService.create({ name, email, message });
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Inquiry received successfully', 
      data: inquiry 
    }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
