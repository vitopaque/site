import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_service_pages_univers" AS ENUM('batiment', 'voiture', 'bateau');
  CREATE TYPE "public"."enum_service_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__service_pages_v_version_univers" AS ENUM('batiment', 'voiture', 'bateau');
  CREATE TYPE "public"."enum__service_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_hub_pages_univers" AS ENUM('batiment', 'voiture', 'bateau');
  CREATE TYPE "public"."enum_hub_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hub_pages_v_version_univers" AS ENUM('batiment', 'voiture', 'bateau');
  CREATE TYPE "public"."enum__hub_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "service_pages_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "service_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"univers" "enum_service_pages_univers",
  	"h1" varchar,
  	"tagline" varchar,
  	"intro" varchar,
  	"main_image_id" integer,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_service_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_service_pages_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_service_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_univers" "enum__service_pages_v_version_univers",
  	"version_h1" varchar,
  	"version_tagline" varchar,
  	"version_intro" varchar,
  	"version_main_image_id" integer,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__service_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "hub_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"univers" "enum_hub_pages_univers",
  	"h1" varchar,
  	"tagline" varchar,
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_hub_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "hub_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_pages_id" integer
  );
  
  CREATE TABLE "_hub_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_univers" "enum__hub_pages_v_version_univers",
  	"version_h1" varchar,
  	"version_tagline" varchar,
  	"version_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__hub_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_hub_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_pages_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "hub_pages_id" integer;
  ALTER TABLE "service_pages_faq" ADD CONSTRAINT "service_pages_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v_version_faq" ADD CONSTRAINT "_service_pages_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_parent_id_service_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_main_image_id_media_id_fk" FOREIGN KEY ("version_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hub_pages_rels" ADD CONSTRAINT "hub_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hub_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hub_pages_rels" ADD CONSTRAINT "hub_pages_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hub_pages_v" ADD CONSTRAINT "_hub_pages_v_parent_id_hub_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hub_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hub_pages_v_rels" ADD CONSTRAINT "_hub_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hub_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hub_pages_v_rels" ADD CONSTRAINT "_hub_pages_v_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "service_pages_faq_order_idx" ON "service_pages_faq" USING btree ("_order");
  CREATE INDEX "service_pages_faq_parent_id_idx" ON "service_pages_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_slug_idx" ON "service_pages" USING btree ("slug");
  CREATE INDEX "service_pages_main_image_idx" ON "service_pages" USING btree ("main_image_id");
  CREATE UNIQUE INDEX "service_pages_seo_seo_title_idx" ON "service_pages" USING btree ("seo_title");
  CREATE UNIQUE INDEX "service_pages_seo_seo_description_idx" ON "service_pages" USING btree ("seo_description");
  CREATE INDEX "service_pages_updated_at_idx" ON "service_pages" USING btree ("updated_at");
  CREATE INDEX "service_pages_created_at_idx" ON "service_pages" USING btree ("created_at");
  CREATE INDEX "service_pages__status_idx" ON "service_pages" USING btree ("_status");
  CREATE INDEX "_service_pages_v_version_faq_order_idx" ON "_service_pages_v_version_faq" USING btree ("_order");
  CREATE INDEX "_service_pages_v_version_faq_parent_id_idx" ON "_service_pages_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_service_pages_v_parent_idx" ON "_service_pages_v" USING btree ("parent_id");
  CREATE INDEX "_service_pages_v_version_version_slug_idx" ON "_service_pages_v" USING btree ("version_slug");
  CREATE INDEX "_service_pages_v_version_version_main_image_idx" ON "_service_pages_v" USING btree ("version_main_image_id");
  CREATE INDEX "_service_pages_v_version_seo_version_seo_title_idx" ON "_service_pages_v" USING btree ("version_seo_title");
  CREATE INDEX "_service_pages_v_version_seo_version_seo_description_idx" ON "_service_pages_v" USING btree ("version_seo_description");
  CREATE INDEX "_service_pages_v_version_version_updated_at_idx" ON "_service_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_service_pages_v_version_version_created_at_idx" ON "_service_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_service_pages_v_version_version__status_idx" ON "_service_pages_v" USING btree ("version__status");
  CREATE INDEX "_service_pages_v_created_at_idx" ON "_service_pages_v" USING btree ("created_at");
  CREATE INDEX "_service_pages_v_updated_at_idx" ON "_service_pages_v" USING btree ("updated_at");
  CREATE INDEX "_service_pages_v_latest_idx" ON "_service_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "hub_pages_univers_idx" ON "hub_pages" USING btree ("univers");
  CREATE UNIQUE INDEX "hub_pages_seo_seo_title_idx" ON "hub_pages" USING btree ("seo_title");
  CREATE UNIQUE INDEX "hub_pages_seo_seo_description_idx" ON "hub_pages" USING btree ("seo_description");
  CREATE INDEX "hub_pages_updated_at_idx" ON "hub_pages" USING btree ("updated_at");
  CREATE INDEX "hub_pages_created_at_idx" ON "hub_pages" USING btree ("created_at");
  CREATE INDEX "hub_pages__status_idx" ON "hub_pages" USING btree ("_status");
  CREATE INDEX "hub_pages_rels_order_idx" ON "hub_pages_rels" USING btree ("order");
  CREATE INDEX "hub_pages_rels_parent_idx" ON "hub_pages_rels" USING btree ("parent_id");
  CREATE INDEX "hub_pages_rels_path_idx" ON "hub_pages_rels" USING btree ("path");
  CREATE INDEX "hub_pages_rels_service_pages_id_idx" ON "hub_pages_rels" USING btree ("service_pages_id");
  CREATE INDEX "_hub_pages_v_parent_idx" ON "_hub_pages_v" USING btree ("parent_id");
  CREATE INDEX "_hub_pages_v_version_version_univers_idx" ON "_hub_pages_v" USING btree ("version_univers");
  CREATE INDEX "_hub_pages_v_version_seo_version_seo_title_idx" ON "_hub_pages_v" USING btree ("version_seo_title");
  CREATE INDEX "_hub_pages_v_version_seo_version_seo_description_idx" ON "_hub_pages_v" USING btree ("version_seo_description");
  CREATE INDEX "_hub_pages_v_version_version_updated_at_idx" ON "_hub_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_hub_pages_v_version_version_created_at_idx" ON "_hub_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_hub_pages_v_version_version__status_idx" ON "_hub_pages_v" USING btree ("version__status");
  CREATE INDEX "_hub_pages_v_created_at_idx" ON "_hub_pages_v" USING btree ("created_at");
  CREATE INDEX "_hub_pages_v_updated_at_idx" ON "_hub_pages_v" USING btree ("updated_at");
  CREATE INDEX "_hub_pages_v_latest_idx" ON "_hub_pages_v" USING btree ("latest");
  CREATE INDEX "_hub_pages_v_rels_order_idx" ON "_hub_pages_v_rels" USING btree ("order");
  CREATE INDEX "_hub_pages_v_rels_parent_idx" ON "_hub_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_hub_pages_v_rels_path_idx" ON "_hub_pages_v_rels" USING btree ("path");
  CREATE INDEX "_hub_pages_v_rels_service_pages_id_idx" ON "_hub_pages_v_rels" USING btree ("service_pages_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hub_pages_fk" FOREIGN KEY ("hub_pages_id") REFERENCES "public"."hub_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_service_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_pages_id");
  CREATE INDEX "payload_locked_documents_rels_hub_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("hub_pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_service_pages_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_service_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hub_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hub_pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hub_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hub_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "service_pages_faq" CASCADE;
  DROP TABLE "service_pages" CASCADE;
  DROP TABLE "_service_pages_v_version_faq" CASCADE;
  DROP TABLE "_service_pages_v" CASCADE;
  DROP TABLE "hub_pages" CASCADE;
  DROP TABLE "hub_pages_rels" CASCADE;
  DROP TABLE "_hub_pages_v" CASCADE;
  DROP TABLE "_hub_pages_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_service_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_hub_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_service_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_hub_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "hub_pages_id";
  DROP TYPE "public"."enum_service_pages_univers";
  DROP TYPE "public"."enum_service_pages_status";
  DROP TYPE "public"."enum__service_pages_v_version_univers";
  DROP TYPE "public"."enum__service_pages_v_version_status";
  DROP TYPE "public"."enum_hub_pages_univers";
  DROP TYPE "public"."enum_hub_pages_status";
  DROP TYPE "public"."enum__hub_pages_v_version_univers";
  DROP TYPE "public"."enum__hub_pages_v_version_status";`)
}
