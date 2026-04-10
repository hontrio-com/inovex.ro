import { NextRequest, NextResponse } from 'next/server';
import fs   from 'fs/promises';
import path from 'path';

/** POST /api/admin/upload
 *  Body: multipart/form-data with fields:
 *    file  — the image file
 *    dir   — optional subfolder under /public/imagini/ (e.g. "marketplace")
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get('file') as File | null;
    const dir      = (formData.get('dir') as string | null) ?? 'uploads';

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    // Sanitize filename
    const ext      = path.extname(file.name).toLowerCase() || '.jpg';
    const allowed  = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: 'Tip fisier nepermis' }, { status: 400 });
    }

    const safeName  = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'imagini', dir);
    await fs.mkdir(uploadDir, { recursive: true });

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(path.join(uploadDir, safeName), buffer);

    const publicUrl = `/imagini/${dir}/${safeName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Eroare la upload' }, { status: 500 });
  }
}
