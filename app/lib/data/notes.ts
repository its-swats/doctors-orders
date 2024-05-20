import { sql } from '@vercel/postgres';
import { Note } from '../types';
import { Patient } from '../types';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchNotesForPatient(
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

export async function fetchNote(
  id: string,
) {
  noStore();
  try {
    const notes = await sql<Note>`
      SELECT
        notes.id,  
        notes.content
      FROM notes
      WHERE notes.id = ${id}
    `;
    return notes.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch note.');
  }
}

export async function fetchAllNotes() {
  noStore();
  try {
    const notes = await sql<Note & Patient>`
      SELECT
        notes.id,  
        notes.content,
        patients.name,
        patients.id AS patient_id,
        patients.email,
        patients.image_url
      FROM notes
      JOIN patients ON notes.patient_id = patients.id
    `;
    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch note.');
  }
}