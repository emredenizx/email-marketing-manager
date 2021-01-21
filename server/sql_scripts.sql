CREATE DATABASE <<YOUR_DATABASE_NAME_HERE>>;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    citytown_id SERIAL REFERENCES citytown(id),  
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL    
);

CREATE TABLE citytown (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    county_id SERIAL REFERENCES county(id),
    UNIQUE("name", county_id)        
);

CREATE TABLE county (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL 
);

CREATE TABLE "user"(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  email VARCHAR(32) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  UNIQUE(email)
);

CREATE TABLE TOKENS(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  userid UUID NOT NULL,
  FOREIGN KEY(userid) REFERENCES "user"(id)
);

CREATE TABLE email_sends (
  id UUID PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE email_activity (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  "event_name" VARCHAR(255) NOT NULL,
  "event_type" VARCHAR(255),
  "event_reason" TEXT, 
  processed_at TIMESTAMP NOT NULL,
  company_id UUID REFERENCES company(id),
  email_sends_id UUID REFERENCES email_sends(id),
  UNIQUE(email_sends_id, company_id, "event_name", "event_type","event_reason",processed_at)
);

CREATE TABLE unsubscribes (
  id BIGSERIAL PRIMARY KEY,
  "created_at" TIMESTAMP NOT NULL,
  company_id UUID REFERENCES company(id),
  UNIQUE(company_id)
  );

