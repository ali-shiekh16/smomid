CREATE TABLE "press_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" varchar(255) NOT NULL,
	"text" text,
	"image" varchar(255) NOT NULL,
	"date" varchar(50),
	"btnText" varchar(100) DEFAULT 'Link' NOT NULL,
	"link" varchar(255),
	"itemType" varchar(50) DEFAULT 'podcast' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"publishedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorId" integer
);
--> statement-breakpoint
ALTER TABLE "press_items" ADD CONSTRAINT "press_items_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;