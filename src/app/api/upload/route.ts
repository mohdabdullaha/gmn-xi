import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';
import path from 'path';

export const runtime = 'nodejs'; // necessary for Cloudinary SDK Buffer usage

export async function POST(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    const allowedExts = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];
    
    const ext = path.extname(file.name).toLowerCase();
    if (!allowedTypes.includes(file.type) || !allowedExts.includes(ext)) {
      return NextResponse.json({ message: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ message: 'File size exceeds 20MB limit' }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using a Promise stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'giftmoralnexus',
          resource_type: 'auto',
          public_id: `${Date.now()}-${file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_')}`
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      message: 'File uploaded successfully',
      fileUrl: (result as any).secure_url,
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
