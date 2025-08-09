// src/app/api/destinations/route.ts (App Router)
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select({
        id: schema.destination.id,
        name: schema.destination.name,
        slug: schema.destination.slug,
        description: schema.destination.shortDescription,
        location: schema.destination.location,
        pricePerNight: schema.destination.pricePerNight,
        rating: schema.destination.rating,
        isFeatured: schema.destination.isFeatured,
        mainImageUrl: schema.destinationImage.url,
      })
      .from(schema.destination)
      .leftJoin(
        schema.destinationImage,
        eq(schema.destination.id, schema.destinationImage.destinationId)
      )
      .where(eq(schema.destinationImage.isPrimary, true))
      .limit(4);

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar destinos" }, { status: 500 });
  }
}
