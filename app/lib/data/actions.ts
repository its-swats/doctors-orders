'use server';

import { sql } from '@vercel/postgres';

export async function createNote({ patientId, content }: { patientId: string, content: string }) {
  const timestamp = new Date().toISOString();
  try {
    await sql`
      INSERT INTO notes (patient_id, content, updated_at, created_at)
      VALUES (${patientId}, ${content}, ${timestamp}, ${timestamp})
    `;
  } catch(error) {
    console.log(error)
    return {
      message: `Error creating: ${error}`
    }
  }
};

export async function deleteNote({ id }: { id: string }) {
  try {
    await sql`DELETE FROM notes WHERE id = ${id}`;
  } catch(error) {
    console.log(error)
    return {
      message: `Error creating: ${error}`
    }
  }
};