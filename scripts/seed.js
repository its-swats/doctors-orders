const { db } = require('@vercel/postgres');

const firstNames = [
  "Marj",
  "Beckie",
  "Lorianna",
  "Shana",
  "Lavinia",
  "Kelcie",
  "Hally",
  "Mehetabel",
  "Anastasia",
  "Isis",
  "Marieann",
  "Gerty",
  "Winny",
  "Ninon",
  "Ailene",
  "Conny",
  "Christean",
  "Cherye",
  "Benedetta",
  "Elka",
  "Jojo",
  "Margarete",
  "Tani",
  "Ranice",
  "Martelle",
  "Petrina",
  "Tandy",
  "Kordula",
  "Benita",
  "Sallyann",
  "Vallie",
  "Sharona",
  "Biddie",
  "Anni",
  "Essy",
  "Daisy",
  "Meghan",
  "Kaile",
  "Crystie",
  "Genni",
  "Nikoletta",
  "Charmaine",
  "Brianne",
  "Christian",
  "Kalina",
  "Sheri",
  "Emma",
  "Luci",
  "Theresita",
  "Constance"
]

const lastNames = [
  "Goldman",
  "George",
  "Stephens",
  "Ritchie",
  "Tucker",
  "Wells",
  "Stewart",
  "Erickson",
  "Craft",
  "Mills",
  "Gray",
  "Christensen",
  "Flowers",
  "Stokes",
  "Mullen",
  "McDaniel",
  "Wolf",
  "Woods",
  "Deal",
  "King",
  "Fletcher",
  "Lamb",
  "Simpson",
  "Whitaker",
  "Kirby",
  "Hudson",
  "Kumar",
  "Galloway",
  "Myers",
  "Benson",
  "Hall",
  "Henderson",
  "Herring",
  "Cooper",
  "Greer",
  "Tilley",
  "Ellis",
  "Bernstein",
  "Siegel",
  "Parker",
  "Merrill",
  "Katz",
  "Freedman",
  "Rose",
  "Zhu",
  "Cooke",
  "Boone",
  "Anderson",
  "Scott",
  "Floyd",
]

const images = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',      
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]

const createPatientData = (records) => {
  const data = [];
  for(let i = 0; i < records; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    data.push({
      name: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}-${i}@example.com`,
      imageUrl: images[Math.floor(Math.random() * images.length)]
    });
  }

  return data;
};

async function seedPatients(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS patients`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS patients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image_url TEXT NOT NULL
      );
    `;

    console.log(`Created "patients" table`);

    const patients = createPatientData(50)
    const insertedPatients = await Promise.all(
      patients.map(async (patient) => {
        return client.sql`
        INSERT INTO patients (name, email, image_url)
        VALUES (${patient.name}, ${patient.email}, ${patient.imageUrl})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedPatients.length} patients`);

    return {
      createTable,
      patients: insertedPatients,
    };
  } catch (error) {
    console.error('Error seeding patients:', error);
    throw error;
  }
}

async function seedNotes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS notes`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      patient_id UUID NOT NULL,
      content VARCHAR(30) NOT NULL,
      updated_at DATE NOT NULL,
      created_at DATE NOT NULL
    );
    `;

    return {
      createTable,
      notes: []
    }
  } catch (error) {
    console.error('Error seeding notes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPatients(client);  
  await seedNotes(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
