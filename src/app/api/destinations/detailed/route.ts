import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get('slug');

    console.log("Fetching destination details for slug:", slug);

    if (!slug) {
        return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
    }

    try {
        // Buscar o destino pelo slug
        const destinations = await db.select()
            .from(schema.destination)
            .where(eq(schema.destination.slug, slug))
            .limit(1);

        const destination = destinations[0];

        const images = await db.select()
            .from(schema.destinationImage)
            .where(eq(schema.destinationImage.destinationId, destination.id));

        const reviews = await db.select()
            .from(schema.review)
            .where(eq(schema.review.destinationId, destination.id));

        const itinerary = await db.select()
            .from(schema.itineraries)
            .where(eq(schema.itineraries.destinationId, destination.id));

        const travelTips = await db.select()
            .from(schema.travelTips)
            .where(eq(schema.travelTips.destinationId, destination.id));

        if (!destination) {
            return new Response(JSON.stringify({ error: 'Destination not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ ...destination, images, reviews, itinerary, travelTips }), { status: 200 });
    } catch (error) {
        console.error("Error fetching destination details:", error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}