/*"use server";

import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

// Função para popular o banco de dados
export async function seedEuropeanDestinations() {
  try {
    const existingDestinations = await db
      .select()
      .from(schema.destination)
      .limit(1);

    if (existingDestinations.length > 0) {
      return { success: false, message: "O banco de dados já contém destinos." };
    }

    // Criar um usuário de teste para os reviews
    const testUser = await db.insert(schema.user).values({
      id: "test-user-123",
      name: "Usuário de Teste",
      email: "testuser@example.com",
      emailVerified: true,
    }).returning();
    const testUserId = testUser[0].id;

    // Criar categorias (6 no total)
    const categories = await db
      .insert(schema.category)
      .values([
        { id: uuidv4(), name: "Praia", slug: "praia", icon: "umbrella-beach" },
        { id: uuidv4(), name: "Montanha", slug: "montanha", icon: "mountain" },
        { id: uuidv4(), name: "Cidade Histórica", slug: "cidade-historica", icon: "landmark" },
        { id: uuidv4(), name: "Aventura", slug: "aventura", icon: "hiking" },
        { id: uuidv4(), name: "Cultura", slug: "cultura", icon: "theater-mask" },
        { id: uuidv4(), name: "Natureza", slug: "natureza", icon: "tree" },
      ])
      .returning();
    const praiaId = categories.find(c => c.slug === 'praia')?.id;
    const montanhaId = categories.find(c => c.slug === 'montanha')?.id;
    const cidadeId = categories.find(c => c.slug === 'cidade-historica')?.id;
    const aventuraId = categories.find(c => c.slug === 'aventura')?.id;
    const culturaId = categories.find(c => c.slug === 'cultura')?.id;
    const naturezaId = categories.find(c => c.slug === 'natureza')?.id;

    // Criar tipos de acomodação
    const accommodationTypes = await db
      .insert(schema.accommodationType)
      .values([
        { id: uuidv4(), name: "Hotel", description: "Acomodação em hotel padrão", icon: "hotel" },
        { id: uuidv4(), name: "Resort", description: "Resort com todas as comodidades", icon: "resort" },
        { id: uuidv4(), name: "Chalé", description: "Chalé aconchegante", icon: "house-chimney" },
        { id: uuidv4(), name: "Apartamento", description: "Apartamento completo", icon: "building" },
      ])
      .returning();
    const hotelId = accommodationTypes.find(a => a.name === 'Hotel')?.id;
    const resortId = accommodationTypes.find(a => a.name === 'Resort')?.id;
    const chaleId = accommodationTypes.find(a => a.name === 'Chalé')?.id;
    const apartamentoId = accommodationTypes.find(a => a.name === 'Apartamento')?.id;

    // Destinos turísticos da Europa (12 no total)
    const destinations = [
      // ... (os 5 destinos originais foram mantidos e expandidos)
      {
        id: uuidv4(), name: "Santorini, Grécia", slug: "santorini-grecia", description: "...", shortDescription: "Ilha grega com vistas deslumbrantes", location: "Santorini, Grécia", country: "Grécia", region: "Cícladas", latitude: "36.3932", longitude: "25.4615", pricePerNight: "250.00", currency: "EUR", capacity: 2, amenities: ["Wi-Fi", "Piscina", "Café da manhã", "Ar-condicionado"], highlights: ["Pôr do sol em Oia", "Praias vulcânicas"], isFeatured: true,
      },
      {
        id: uuidv4(), name: "Paris, França", slug: "paris-franca", description: "...", shortDescription: "Cidade do amor e da Torre Eiffel", location: "Paris, França", country: "França", region: "Île-de-France", latitude: "48.8566", longitude: "2.3522", pricePerNight: "180.00", currency: "EUR", capacity: 4, amenities: ["Wi-Fi", "Cozinha equipada", "TV", "Aquecimento"], highlights: ["Torre Eiffel", "Museu do Louvre"], isFeatured: true,
      },
      {
        id: uuidv4(), name: "Alpes Suíços", slug: "alpes-suicos", description: "...", shortDescription: "Paisagens montanhosas deslumbrantes", location: "Alpes Suíços, Suíça", country: "Suíça", region: "Alpes", latitude: "46.5589", longitude: "8.5606", pricePerNight: "320.00", currency: "CHF", capacity: 6, amenities: ["Lareira", "Vista para montanhas", "Sauna", "Wi-Fi"], highlights: ["Esqui", "Matterhorn"], isFeatured: true,
      },
      {
        id: uuidv4(), name: "Algarve, Portugal", slug: "algarve-portugal", description: "...", shortDescription: "Praias deslumbrantes no sul de Portugal", location: "Algarve, Portugal", country: "Portugal", region: "Algarve", latitude: "37.0194", longitude: "-7.9304", pricePerNight: "150.00", currency: "EUR", capacity: 4, amenities: ["Piscina", "Wi-Fi", "Ar-condicionado", "Cozinha"], highlights: ["Praia da Marinha", "Grutas de Benagil"], isFeatured: false,
      },
      {
        id: uuidv4(), name: "Amsterdã, Holanda", slug: "amsterda-holanda", description: "...", shortDescription: "Cidade dos canais e da cultura vibrante", location: "Amsterdã, Holanda", country: "Holanda", region: "Holanda do Norte", latitude: "52.3676", longitude: "4.9041", pricePerNight: "190.00", currency: "EUR", capacity: 2, amenities: ["Wi-Fi", "Bicicletas disponíveis", "Café da manhã", "TV"], highlights: ["Canais", "Museu Van Gogh"], isFeatured: false,
      },
      {
        id: uuidv4(), name: "Roma, Itália", slug: "roma-italia", description: "...", shortDescription: "Cidade eterna com monumentos antigos", location: "Roma, Itália", country: "Itália", region: "Lácio", latitude: "41.9028", longitude: "12.4964", pricePerNight: "200.00", currency: "EUR", capacity: 3, amenities: ["Wi-Fi", "Guia turístico", "Jantar romântico", "TV"], highlights: ["Coliseu", "Vaticano"], isFeatured: true,
      },
      {
        id: uuidv4(), name: "Barcelona, Espanha", slug: "barcelona-espanha", description: "...", shortDescription: "Arquitetura de Gaudí e vida noturna", location: "Barcelona, Espanha", country: "Espanha", region: "Catalunha", latitude: "41.3851", longitude: "2.1734", pricePerNight: "170.00", currency: "EUR", capacity: 4, amenities: ["Wi-Fi", "Piscina", "Cozinha equipada", "Transporte"], highlights: ["Sagrada Família", "Park Güell"], isFeatured: false,
      },
      {
        id: uuidv4(), name: "Praga, República Tcheca", slug: "praga-republica-tcheca", description: "...", shortDescription: "Cidade mágica com castelos e pontes medievais", location: "Praga, República Tcheca", country: "República Tcheca", region: "Boêmia", latitude: "50.0755", longitude: "14.4378", pricePerNight: "110.00", currency: "CZK", capacity: 2, amenities: ["Wi-Fi", "Café da manhã", "Aquecimento", "Vista"], highlights: ["Ponte Carlos", "Castelo de Praga"], isFeatured: true,
      },
      {
        id: uuidv4(), name: "Veneza, Itália", slug: "veneza-italia", description: "...", shortDescription: "Cidade flutuante de canais e gôndolas", location: "Veneza, Itália", country: "Itália", region: "Vêneto", latitude: "45.4408", longitude: "12.3155", pricePerNight: "280.00", currency: "EUR", capacity: 2, amenities: ["Wi-Fi", "Passeio de gôndola", "Café da manhã"], highlights: ["Piazza San Marco", "Ponte de Rialto"], isFeatured: true,
      },
      {
        id: uuidv4(), name: "Dubrovnik, Croácia", slug: "dubrovnik-croacia", description: "...", shortDescription: "Cenário de Game of Thrones com muralhas antigas", location: "Dubrovnik, Croácia", country: "Croácia", region: "Dalmacia", latitude: "42.6507", longitude: "18.0944", pricePerNight: "210.00", currency: "HRK", capacity: 4, amenities: ["Wi-Fi", "Piscina", "Cozinha equipada", "Vista para o mar"], highlights: ["Muralhas da cidade", "Cidade Velha"], isFeatured: false,
      },
      {
        id: uuidv4(), name: "Edimburgo, Escócia", slug: "edimburgo-escocia", description: "...", shortDescription: "Capital escocesa com um castelo imponente", location: "Edimburgo, Escócia", country: "Reino Unido", region: "Escócia", latitude: "55.9533", longitude: "-3.1883", pricePerNight: "160.00", currency: "GBP", capacity: 3, amenities: ["Wi-Fi", "Aquecimento", "Café da manhã", "Chá"], highlights: ["Castelo de Edimburgo", "Royal Mile"], isFeatured: false,
      },
      {
        id: uuidv4(), name: "Fiordes da Noruega", slug: "fiordes-noruega", description: "...", shortDescription: "Paisagens naturais dramáticas com fiordes e montanhas", location: "Fiordes, Noruega", country: "Noruega", region: "Vestland", latitude: "60.4072", longitude: "6.7265", pricePerNight: "350.00", currency: "NOK", capacity: 5, amenities: ["Vista panorâmica", "Lareira", "Sauna", "Wi-Fi"], highlights: ["Geirangerfjord", "Lysefjord"], isFeatured: true,
      },
    ];

    const insertedDestinations = await db
      .insert(schema.destination)
      .values(destinations)
      .returning();

    // Inserir imagens para os 12 destinos (4 por destino)
    const destinationImages = insertedDestinations.flatMap((dest, index) => {
      // Usei URLs genéricas da Unsplash para o exemplo.
      // Você pode substituir por URLs específicas para cada destino.
      const baseUrls = [
        "https://images.unsplash.com/photo-1570498839593-e565b94f7d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80",
        "https://images.unsplash.com/photo-1518632618332-fc529fb9d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1527&q=80",
        "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1511&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&auto=format&fit=crop&w=1526&q=80",
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1525874495514-41d6837df26a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1552554703-a1df16f0d95d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      ];
      return Array(4).fill(null).map((_, i) => ({
        id: uuidv4(),
        destinationId: dest.id,
        url: `https://picsum.photos/seed/${dest.slug}-${i}/800/600`,
        altText: `Imagem ${i + 1} de ${dest.name}`,
        isPrimary: i === 0,
        order: i,
      }));
    });
    await db.insert(schema.destinationImage).values(destinationImages);

    // Inserir reviews para os 12 destinos
    const reviews = insertedDestinations.flatMap((dest, index) => {
      const reviewTitles = ["Viagem inesquecível!", "Ótimo lugar para relaxar", "Superou as expectativas", "Local incrível!", "Experiência única"];
      const reviewComments = [
        "Tudo foi perfeito, desde a chegada até a partida. Recomendo muito!",
        "Um lugar maravilhoso para se desconectar e aproveitar a natureza.",
        "A paisagem é de tirar o fôlego e o serviço é impecável.",
        "Gostei muito da experiência, a cidade é vibrante e cheia de história.",
        "Uma experiência cultural enriquecedora, com muito para ver e fazer."
      ];
      return Array(3).fill(null).map((_, i) => ({
        id: uuidv4(),
        destinationId: dest.id,
        userId: testUserId,
        rating: Math.floor(Math.random() * 2) + 4, // Avaliações entre 4 e 5 estrelas
        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
      }));
    });
    await db.insert(schema.review).values(reviews);

    // Associar destinos a categorias
    const destinationCategories = [
      { destinationId: insertedDestinations[0].id, categoryId: praiaId }, // Santorini - Praia
      { destinationId: insertedDestinations[1].id, categoryId: cidadeId }, // Paris - Cidade Histórica
      { destinationId: insertedDestinations[2].id, categoryId: montanhaId }, // Alpes Suíços - Montanha
      { destinationId: insertedDestinations[2].id, categoryId: aventuraId }, // Alpes Suíços - Aventura
      { destinationId: insertedDestinations[3].id, categoryId: praiaId }, // Algarve - Praia
      { destinationId: insertedDestinations[4].id, categoryId: cidadeId }, // Amsterdã - Cidade Histórica
      { destinationId: insertedDestinations[5].id, categoryId: cidadeId }, // Roma - Cidade Histórica
      { destinationId: insertedDestinations[5].id, categoryId: culturaId }, // Roma - Cultura
      { destinationId: insertedDestinations[6].id, categoryId: cidadeId }, // Barcelona - Cidade Histórica
      { destinationId: insertedDestinations[7].id, categoryId: cidadeId }, // Praga - Cidade Histórica
      { destinationId: insertedDestinations[8].id, categoryId: culturaId }, // Veneza - Cultura
      { destinationId: insertedDestinations[9].id, categoryId: cidadeId }, // Dubrovnik - Cidade Histórica
      { destinationId: insertedDestinations[10].id, categoryId: cidadeId }, // Edimburgo - Cidade Histórica
      { destinationId: insertedDestinations[10].id, categoryId: culturaId }, // Edimburgo - Cultura
      { destinationId: insertedDestinations[11].id, categoryId: naturezaId }, // Fiordes - Natureza
      { destinationId: insertedDestinations[11].id, categoryId: aventuraId }, // Fiordes - Aventura
    ];
    await db.insert(schema.destinationCategory).values(destinationCategories);

    // Associar destinos a tipos de acomodação
    const destinationAccommodations = [
      { destinationId: insertedDestinations[0].id, accommodationTypeId: hotelId, quantity: 5 },
      { destinationId: insertedDestinations[1].id, accommodationTypeId: apartamentoId, quantity: 15 },
      { destinationId: insertedDestinations[2].id, accommodationTypeId: chaleId, quantity: 8 },
      { destinationId: insertedDestinations[3].id, accommodationTypeId: resortId, quantity: 4 },
      { destinationId: insertedDestinations[4].id, accommodationTypeId: hotelId, quantity: 7 },
      { destinationId: insertedDestinations[5].id, accommodationTypeId: apartamentoId, quantity: 10 },
      { destinationId: insertedDestinations[6].id, accommodationTypeId: hotelId, quantity: 20 },
      { destinationId: insertedDestinations[7].id, accommodationTypeId: hotelId, quantity: 12 },
      { destinationId: insertedDestinations[8].id, accommodationTypeId: hotelId, quantity: 6 },
      { destinationId: insertedDestinations[9].id, accommodationTypeId: apartamentoId, quantity: 8 },
      { destinationId: insertedDestinations[10].id, accommodationTypeId: hotelId, quantity: 18 },
      { destinationId: insertedDestinations[11].id, accommodationTypeId: chaleId, quantity: 5 },
    ];
    await db.insert(schema.destinationAccommodation).values(destinationAccommodations);

    revalidatePath("/");
    return { success: true, message: "Destinos europeus adicionados com sucesso!" };
  } catch (error) {
    console.error("Erro ao popular destinos:", error);
    return { success: false, message: "Erro ao adicionar destinos europeus." };
  }
}

// Função para limpar o banco de dados
export async function clearAllDestinations() {
  try {
    // A ordem de exclusão é importante para respeitar as chaves estrangeiras
    await db.delete(schema.destinationAccommodation);
    await db.delete(schema.destinationCategory);
    await db.delete(schema.destinationImage);
    await db.delete(schema.review);
    await db.delete(schema.packageDestination);
    await db.delete(schema.booking);
    await db.delete(schema.packageBooking);
    await db.delete(schema.tourPackage);
    await db.delete(schema.favorite);
    await db.delete(schema.accommodationType);
    await db.delete(schema.category);
    await db.delete(schema.destination);
    await db.delete(schema.session);
    await db.delete(schema.account);
    await db.delete(schema.user);
    await db.delete(schema.verification);

    revalidatePath("/");
    return { success: true, message: "Todos os dados foram removidos." };
  } catch (error) {
    console.error("Erro ao limpar dados:", error);
    return { success: false, message: "Erro ao remover dados." };
  }
}*/