CREATE TABLE IF NOT EXISTS "press_items" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "subtitle" VARCHAR(255) NOT NULL,
  "text" TEXT,
  "image" VARCHAR(255) NOT NULL,
  "date" VARCHAR(50),
  "btnText" VARCHAR(100) NOT NULL DEFAULT 'Link',
  "link" VARCHAR(255),
  "itemType" VARCHAR(50) NOT NULL DEFAULT 'podcast',
  "published" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "authorId" INTEGER REFERENCES "users"("id")
);