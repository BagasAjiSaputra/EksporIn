-- PostgreSQL Database Schema Dump
-- Project: EksporIn (Backend)
-- Generated matching GORM model definitions (User, Company, Commodity, Listing)

-- Enable UUID extension if not already enabled (for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================================
-- Custom Enum Types
-- =========================================================================

-- UserRole enum
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'agregator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Verify enum
DO $$ BEGIN
    CREATE TYPE verify AS ENUM ('none', 'pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- StatusListing enum
DO $$ BEGIN
    CREATE TYPE status_listing AS ENUM ('pending', 'active', 'completed', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =========================================================================
-- Tables
-- =========================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    is_verified verify DEFAULT 'none',
    is_rejected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    reset_token VARCHAR(255) UNIQUE DEFAULT NULL,
    reset_exp TIMESTAMPTZ DEFAULT NULL
);

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL,
    company_name VARCHAR(150),
    phone VARCHAR(100),
    address VARCHAR(1000),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_companies_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Commodities Table
CREATE TABLE IF NOT EXISTS commodities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(150) NOT NULL
);

-- 4. Listings Table
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    commodity_id UUID NOT NULL,
    company_id UUID NOT NULL,
    image_url VARCHAR(1000),
    title VARCHAR(150) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    min_volume DECIMAL(15,2) NOT NULL,
    current_volume DECIMAL(15,2) DEFAULT 0.00,
    quality VARCHAR(2000),
    price_buy DECIMAL(15,2) NOT NULL,
    location VARCHAR(2000) NOT NULL,
    address VARCHAR(2000) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status status_listing DEFAULT 'pending',
    CONSTRAINT fk_listings_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_listings_commodity FOREIGN KEY (commodity_id) REFERENCES commodities(id),
    CONSTRAINT fk_listings_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- =========================================================================
-- Indexes (for speed optimization, matching GORM uniqueIndex tags)
-- =========================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token) WHERE reset_token IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_commodities_name ON commodities(name);
