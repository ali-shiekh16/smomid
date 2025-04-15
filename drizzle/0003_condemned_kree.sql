CREATE TABLE "email_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"source" varchar(100),
	"preferences" text[],
	"isActive" boolean DEFAULT true NOT NULL,
	"subscribedAt" timestamp DEFAULT now() NOT NULL,
	"unsubscribedAt" timestamp,
	"lastEmailSentAt" timestamp,
	CONSTRAINT "email_list_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255),
	"message" text NOT NULL,
	"phone" varchar(20),
	"formType" varchar(50) DEFAULT 'contact' NOT NULL,
	"status" varchar(20) DEFAULT 'unread' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"subject" varchar(255),
	"message" text NOT NULL,
	"inquiryType" varchar(50) DEFAULT 'general' NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
