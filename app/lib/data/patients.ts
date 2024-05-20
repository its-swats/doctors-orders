import { sql } from '@vercel/postgres';
import { Patient } from '../types';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchFilteredPatients(
  query: string,
) {
  noStore();
  console.log('where')
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