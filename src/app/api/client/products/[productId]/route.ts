import { NextResponse } from 'next/server';
import db from '@/shared/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const productId = (await params).productId;

    if (!productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    /** // if you need data sanitization
    const sanitizedData = {
      ...product!,
      price: String(product?.price),
      stock: String(product?.stock),
      availableAt: String(product?.availableAt),
      createdAt: String(product?.availableAt)
    };
     */

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
