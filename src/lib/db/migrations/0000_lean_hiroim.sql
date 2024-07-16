CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"booking_reference" text NOT NULL,
	"passenger_id" text,
	"passenger_name" text NOT NULL,
	"passenger_email" text NOT NULL,
	"currency" text NOT NULL,
	"base_amount" text,
	"tax_amount" text NOT NULL,
	"total_amount" text NOT NULL,
	"payment_status" text NOT NULL,
	"is_live" boolean DEFAULT false NOT NULL,
	"commission_amount" text,
	"markup_amount" text,
	"travel_agent_id" text,
	"offer_id" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"synced_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "segments" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"origin" text NOT NULL,
	"destination" text NOT NULL,
	"departing_at" timestamp NOT NULL,
	"arriving_at" timestamp NOT NULL,
	"duration" text NOT NULL,
	"marketing_carrier" text NOT NULL,
	"operating_carrier" text NOT NULL,
	"aircraft" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"user_id" varchar(255),
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"stripe_price_id" varchar(255),
	"stripe_current_period_end" timestamp,
	CONSTRAINT "subscriptions_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "subscriptions_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travel_agencies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travel_agents" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"agency_id" text,
	"given_name" text NOT NULL,
	"family_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "travellers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"order_id" text,
	"gender" text NOT NULL,
	"title" text,
	"given_name" text NOT NULL,
	"family_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"born_on" timestamp NOT NULL,
	"passport_number" text,
	"passport_expiry_date" timestamp,
	"nationality" text,
	"loyalty_programme" text,
	"company_name" text,
	"job_title" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_travel_agent_id_travel_agents_id_fk" FOREIGN KEY ("travel_agent_id") REFERENCES "public"."travel_agents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "segments" ADD CONSTRAINT "segments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "travel_agents" ADD CONSTRAINT "travel_agents_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "travel_agents" ADD CONSTRAINT "travel_agents_agency_id_travel_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."travel_agencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "travellers" ADD CONSTRAINT "travellers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "travellers" ADD CONSTRAINT "travellers_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
