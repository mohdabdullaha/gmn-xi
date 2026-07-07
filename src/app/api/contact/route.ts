import { NextRequest, NextResponse } from 'next/server';
import { inquiryService } from '@/lib/services/inquiry.service';
import { inquirySchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
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
