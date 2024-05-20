import { sql } from '@vercel/postgres';
import { Patient } from '../types';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchFilteredPatients(
  query: string,
) {
  noStore();

  try {
    const patients = await sql<Patient>`
      SELECT
        patients.id,  
        patients.name,
        patients.email,
        patients.image_url
      FROM patients
      ORDER BY patients.id DESC
    `;

    return patients.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patients.');
  }
}

export async function fetchPatient(
  id: string,
) {
  noStore();

  try {
    const patients = await sql<Patient>`
      SELECT
        patients.id,  
        patients.name,
        patients.email,
        patients.image_url
      FROM patients
      WHERE patients.id = ${id}
    `;
    return patients.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patients.');
  }
}