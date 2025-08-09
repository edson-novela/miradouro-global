"use server";

import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";

/*type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type GetDestinationsResult = {
  destinations: Destination[];
  categories: Category[];
  pagination: Pagination;
};

type ActionResponse = GetDestinationsResult | { error: string };
*/
/*export const getAllDestinations(searchTerm,
        activeFilter,
        pagination.page,
        pagination.limit) {
  try {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 12;
    const offset = (page - 1) * limit;

    const filters: SQL<unknown>[] = [];

    if (params.searchTerm) {
      const term = `%${params.searchTerm}%`;
      filters.push(
        /*or(
          ilike(schema.destination.name, term),
          ilike(schema.destination.location, term),
          ilike(schema.destination.shortDescription, term)
        )
      );
    }

    if (params.categoryId && params.categoryId !== "all") {
      filters.push(
        eq(schema.destinationCategory.categoryId, params.categoryId)
      );
    }

    // Query para contar o total de destinos filtrados
    const countQuery = db
      .select({ count: sql<string>`count(*)` })
      .from(schema.destination)
      .leftJoin(
        schema.destinationCategory,
        eq(schema.destination.id, schema.destinationCategory.destinationId)
      )
      .where(and(...filters));

    const [countResult] = await countQuery;
    const total = Number(countResult?.count) || 0;

    // Query para buscar os destinos com paginação e filtros
    const destinationsQuery = db
      .select({
        id: schema.destination.id,
        name: schema.destination.name,
        slug: schema.destination.slug,
        description: schema.destination.description,
        shortDescription: schema.destination.shortDescription,
        location: schema.destination.location,
        country: schema.destination.country,
        region: schema.destination.region,
        latitude: schema.destination.latitude,
        longitude: schema.destination.longitude,
        pricePerNight: schema.destination.pricePerNight,
        currency: schema.destination.currency,
        capacity: schema.destination.capacity,
        amenities: schema.destination.amenities,
        highlights: schema.destination.highlights,
        rating: schema.destination.rating,
        reviewCount: schema.destination.reviewCount,
        isFeatured: schema.destination.isFeatured,
        isActive: schema.destination.isActive,
        createdAt: schema.destination.createdAt,
        updatedAt: schema.destination.updatedAt,
        ownerId: schema.destination.ownerId,
        mainImageUrl: schema.destinationImage.url,
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
      .where(and(...filters))
      .limit(limit)
      .offset(offset);

    const destinations = await destinationsQuery;

    const categories = await db
      .select()
      .from(schema.category)
      .orderBy(schema.category.name);

    return {
      destinations,
      categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar destinos:", error);
    return { error: "Falha ao buscar destinos. Tente novamente mais tarde." };
  }
}*/

//essa função busca os destinos em destaque
export const getDestination = async () => {
  try {
    const destinations = await db
      .select()
      .from(schema.destination)
      .where(eq(schema.destination.isFeatured, true))
      .limit(4);

    return {
      success: true,
      data: destinations,
    };
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return {
      success: false,
      message: "Failed to fetch featured destinations",
    };
  }
};

// essa função busca os detalhes de um destino específico
/*export const getDestinationDetails = async (slug: string) => {
  try {
    const destination = await db
      .select()
      .from(schema.destination)
      .where(eq(schema.destination.slug, slug))
      .leftJoin(
        schema.review,
        eq(schema.destination.id, schema.review.destinationId)
      )
      .then((results) => results[0]);

    // Assumindo que você já tem o ID do destino
    const destinationId = destination.destination.id;

    const images = await db
      .select()
      .from(schema.destinationImage)
      .where(eq(schema.destinationImage.destinationId, destinationId));

    const category = await db
      .select({
        id: schema.category.id,
        name: schema.category.name,
        slug: schema.category.slug,
      })
      .from(schema.destinationCategory)
      .leftJoin(
        schema.category,
        eq(schema.destinationCategory.categoryId, schema.category.id)
      )
      .where(eq(schema.destinationCategory.destinationId, destinationId));
      

    return {
      success: true,
      data: destination,
      images,
      category,
    };
  } catch (error) {
    console.error("Error fetching destination details:", error);
    return {
      success: false,
      message: "Failed to fetch destination details",
    };
  }
};
*/