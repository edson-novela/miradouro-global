import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { SQL } from 'drizzle-orm/sql';

export const dynamic = 'force-dynamic'; // Garante que a rota não seja cacheada

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Obter e validar parâmetros de consulta
    const searchTerm = searchParams.get('search') || '';
    const categoryId = searchParams.get('category');
    const limit = Number(searchParams.get('limit')) || 12;
    const page = Number(searchParams.get('page')) || 1;
    const featuredOnly = searchParams.get('featured') === 'true';
    const minRating = Number(searchParams.get('minRating')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice'));

    // Calcular offset para paginação
    const offset = (page - 1) * limit;

    // Construir a condição 'WHERE' dinamicamente
    const whereClause: (SQL<unknown> | undefined)[] = [];

    if (searchTerm) {
      whereClause.push(
        or(
          ilike(schema.destination.name, `%${searchTerm}%`),
          ilike(schema.destination.location, `%${searchTerm}%`),
          ilike(schema.destination.shortDescription, `%${searchTerm}%`)
        )
      );
    }

    if (categoryId) {
      whereClause.push(
        eq(schema.destinationCategory.categoryId, categoryId)
      );
    }

    if (featuredOnly) {
      whereClause.push(
        eq(schema.destination.isFeatured, true)
      );
    }

    if (minRating > 0) {
      whereClause.push(
        sql`${schema.destination.rating} >= ${minRating}`
      );
    }

    if (maxPrice) {
      whereClause.push(
        sql`${schema.destination.pricePerNight} <= ${maxPrice}`
      );
    }
    
    // Query para contar o total de destinos
    const countResult = await db
      .select({ count: sql<string>`count(*)` }) // Use string para evitar problemas de bigint
      .from(schema.destination)
      .leftJoin(
        schema.destinationCategory,
        eq(schema.destination.id, schema.destinationCategory.destinationId)
      )
      .where(and(...whereClause)); // Passa a cláusula WHERE centralizada

    const total = Number(countResult[0]?.count) || 0;
    
    // Query para obter os destinos paginados e filtrados
    const destinations = await db
      .select({
        id: schema.destination.id,
        name: schema.destination.name,
        slug: schema.destination.slug,
        description: schema.destination.shortDescription,
        location: schema.destination.location,
        country: schema.destination.country,
        pricePerNight: schema.destination.pricePerNight,
        rating: schema.destination.rating,
        isFeatured: schema.destination.isFeatured,
        mainImageUrl: schema.destinationImage.url,
        categoryId: schema.category.id,
        categoryName: schema.category.name,
        categorySlug: schema.category.slug,
        mainImage: schema.destinationImage.url,
      })
      .from(schema.destination)
      .leftJoin(
        schema.destinationImage,
        and(
          eq(schema.destination.id, schema.destinationImage.destinationId),
          eq(schema.destinationImage.isPrimary, true)
        )
      )
      .leftJoin(
        schema.destinationCategory,
        eq(schema.destination.id, schema.destinationCategory.destinationId)
      )
      .leftJoin(
        schema.category,
        eq(schema.destinationCategory.categoryId, schema.category.id)
      )
      .where(and(...whereClause)) // Passa a mesma cláusula WHERE centralizada
      .limit(limit)
      .offset(offset);

    // Buscar categorias
    const categories = await db
      .select()
      .from(schema.category)
      .orderBy(schema.category.name);

    return NextResponse.json({
      success: true,
      data: {
        destinations: destinations.map(d => ({
          ...d,
          price_start: d.pricePerNight,
          featured: d.isFeatured,
          category_id: d.categoryId,
          category_name: d.categoryName,
          category_slug: d.categorySlug,
        })),
        categories,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}