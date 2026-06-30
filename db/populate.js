import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const script = `
  CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE 
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE
);


INSERT INTO categories (name) 
    VALUES ('Appliances'), 
           ('Bathroom accessories'), 
           ('Cabinetry'), 
           ('Furniture'), 
           ('Lighting'); 


INSERT INTO products (product_name, description, category_id)
    VALUES ('Refrigerator', 'Has a smart door', 1), 
           ('Microwave oven', 'Thick rims', 1), 
           ('Soap dispenser', 'Would be mounted to the wall', 2), 
           ('Rail set', 'Black color', 2),
           ('Kitchen cabinet', 'Modular design', 3), 
           ('Entertaining unit', 'Floating type', 3), 
           ('Sofa', 'Velvet', 4), 
           ('Dining', 'Solid oak', 4), 
           ('Chandelier', 'Modern', 5), 
           ('Desk lamp', 'Flat bottom', 5); 

`;

async function main() {
  console.log("Start...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(script);
  await client.end();
  console.log("Completed!");
}

main();
