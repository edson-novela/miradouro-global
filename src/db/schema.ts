import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  json,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";

// Tabelas existentes (mantidas conforme seu código original)
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  phone: text("phone"),
  address: text("address"),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// Novas tabelas para o sistema de turismo

// Tabela de destinos turísticos
export const destination = pgTable("destination", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  location: text("location").notNull(),
  country: text("country").notNull(),
  region: text("region"),
  latitude: decimal("latitude", { precision: 10, scale: 6 }),
  longitude: decimal("longitude", { precision: 10, scale: 6 }),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("EUR").notNull(),
  capacity: integer("capacity").notNull(),
  amenities: json("amenities").$type<string[]>().default([]),
  highlights: json("highlights").$type<string[]>().default([]),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ownerId: text("owner_id").references(() => user.id),
  mainImage: text("main_image"),
});

// Tabela de imagens dos destinos
export const destinationImage = pgTable("destination_image", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationId: uuid("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  isPrimary: boolean("is_primary").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


//tabela de itinerários dos destinos
export const itineraries = pgTable("itineraries", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationId: uuid("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "cascade" }),
  day: integer("day").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  activities: json("activities").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Tabela de tipos de acomodação
export const accommodationType = pgTable("accommodation_type", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relação muitos-para-muitos entre destinos e tipos de acomodação
export const destinationAccommodation = pgTable(
  "destination_accommodation",
  {
    destinationId: uuid("destination_id")
      .notNull()
      .references(() => destination.id, { onDelete: "cascade" }),
    accommodationTypeId: uuid("accommodation_type_id")
      .notNull()
      .references(() => accommodationType.id, { onDelete: "cascade" }),
    quantity: integer("quantity").default(1).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.destinationId, table.accommodationTypeId] }),
  })
);

// Tabela de avaliações
export const review = pgTable("review", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationId: uuid("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//Tabela de Travel tips
export const travelTips = pgTable("travel_tips", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationId: uuid("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "cascade" }),
  tip: text("tip").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de reservas
export const booking = pgTable("booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationId: uuid("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  numberOfGuests: integer("number_of_guests").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  status: text("status")
    .$type<"pending" | "confirmed" | "cancelled" | "completed">()
    .default("pending")
    .notNull(),
  specialRequests: text("special_requests"),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status")
    .$type<"pending" | "paid" | "failed" | "refunded">()
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de favoritos
export const favorite = pgTable(
  "favorite",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    destinationId: uuid("destination_id")
      .notNull()
      .references(() => destination.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.destinationId] }),
  })
);

// Tabela de categorias de destinos
export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relação muitos-para-muitos entre destinos e categorias
export const destinationCategory = pgTable(
  "destination_category",
  {
    destinationId: uuid("destination_id")
      .notNull()
      .references(() => destination.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.destinationId, table.categoryId] }),
  })
);

// Tabela de pacotes turísticos
export const tourPackage = pgTable("tour_package", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  durationDays: integer("duration_days").notNull(),
  durationNights: integer("duration_nights").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  inclusions: json("inclusions").$type<string[]>().default([]),
  exclusions: json("exclusions").$type<string[]>().default([]),
  itinerary: json("itinerary").$type<Array<{ day: number; title: string; description: string }>>(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relação muitos-para-muitos entre pacotes e destinos
export const packageDestination = pgTable(
  "package_destination",
  {
    packageId: uuid("package_id")
      .notNull()
      .references(() => tourPackage.id, { onDelete: "cascade" }),
    destinationId: uuid("destination_id")
      .notNull()
      .references(() => destination.id, { onDelete: "cascade" }),
    order: integer("order").default(0).notNull(),
    durationDays: integer("duration_days").default(1).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.packageId, table.destinationId] }),
  })
);

// Tabela de reservas de pacotes
export const packageBooking = pgTable("package_booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  packageId: uuid("package_id")
    .notNull()
    .references(() => tourPackage.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  startDate: timestamp("start_date").notNull(),
  numberOfPeople: integer("number_of_people").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  status: text("status")
    .$type<"pending" | "confirmed" | "cancelled" | "completed">()
    .default("pending")
    .notNull(),
  specialRequests: text("special_requests"),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status")
    .$type<"pending" | "paid" | "failed" | "refunded">()
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const schema = {
  user,
  session,
  account,
  verification,
  destination,
  destinationImage,
  itineraries,
  travelTips,
  accommodationType,
  destinationAccommodation,
  review,
  booking,
  favorite,
  category,
  destinationCategory,
  tourPackage,
  packageDestination,
  packageBooking,
};