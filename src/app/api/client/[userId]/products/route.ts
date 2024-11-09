import { NextResponse } from 'next/server';
import { currentUser } from '@/shared/lib/account';
import db from '@/shared/lib/db';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const userId = (await params).userId;
    const session = await currentUser();

    const { name, description, images, status, price, stock, availableAt } =
      await req.json();

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const productByUser = await db.user.findFirst({
      where: { id: userId },
    });

    if (!productByUser) {
      return new NextResponse('Session id is required', { status: 405 });
    }

    const newProduct = await db.product.create({
      data: {
        userId,
        name,
        description,
        status,
        price,
        stock,
        availableAt: new Date(availableAt),
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const userId = (await params).userId;
    const session = await currentUser();

    if (!userId) {
      return new NextResponse('User Id is required', { status: 403 });
    }

    const products = await db.product.findMany({
      where: {
        userId,
      },
      select: {
        name: true,
        description: true,
        images: true,
        price: true,
        status: true,
        stock: true,
        availableAt: true,
        createdAt: true,
        updatedAt: true,
        id: session ? true : false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
