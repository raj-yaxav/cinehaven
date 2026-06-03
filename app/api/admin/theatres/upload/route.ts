import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../../lib/auth';

import { v2 as cloudinary } from 'cloudinary';

const requireAdmin = () => Boolean(getAdminFromToken());

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return null;

  return {
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  };
}

async function uploadToCloudinary(images: Array<{ name?: string; data: Buffer; mime?: string }>) {
  const cfg = getCloudinaryConfig();
  if (!cfg) {
    return {
      uploaded: false,
      error:
        'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.',
    };
  }

  cloudinary.config({
    cloud_name: cfg.cloud_name,
    api_key: cfg.api_key,
    api_secret: cfg.api_secret,
    secure: cfg.secure,
  });

  const folder = process.env.CLOUDINARY_FOLDER || 'cinehaven/theatres';

  const results = await Promise.all(
    images.map(async (img) => {
      const base64 = img.data.toString('base64');
      const mime = img.mime || 'image/jpeg';

      const uploadRes = await cloudinary.uploader.upload(
        `data:${mime};base64,${base64}`,
        {
          folder,
          resource_type: 'image',
          public_id: img.name ? img.name.replace(/\.[^/.]+$/, '') : undefined,
          use_filename: false,
          unique_filename: true,
          overwrite: false,
        }
      );

      return uploadRes.secure_url as string;
    })
  );

  return { uploaded: true, urls: results };
}

export async function POST(request: Request) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const formData = await request.formData();

    // field name: images (multipart)
    const files = formData.getAll('images');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'No images found. Upload files with field name "images".' },
        { status: 400 }
      );
    }

    const images = await Promise.all(
      files.map(async (f: any, idx: number) => {
        if (!f) return null;
        if (typeof f.arrayBuffer !== 'function') return null;

        const buf = Buffer.from(await f.arrayBuffer());

        return {
          name: f.name || `image-${idx}.jpg`,
          data: buf,
          mime: f.type,
        };
      })
    );

    const validImages = images.filter(Boolean) as Array<{ name?: string; data: Buffer; mime?: string }>;

    if (validImages.length === 0) {
      return NextResponse.json({ status: 'error', message: 'Invalid image files.' }, { status: 400 });
    }

    const res = await uploadToCloudinary(validImages);
    if (!res.uploaded) {
      return NextResponse.json({ status: 'error', message: res.error }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', imageUrls: res.urls }, { status: 201 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { status: 'error', message: error?.message || 'Unable to upload images' },
      { status: 500 }
    );
  }
}

