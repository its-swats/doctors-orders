import { sql } from '@vercel/postgres';
import { Note } from '../types';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchNotes(
  patientId: string
) {
  noStore();

  try {
    const notes = await sql<Note>`
      SELECT
        notes.id,  
        notes.content,
        notes.updated_at
      FROM notes
      WHERE notes.patient_id = ${patientId}
      ORDER BY notes.updated_at DESC
    `;

    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notes.');
  }
}
