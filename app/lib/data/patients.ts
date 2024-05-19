import { sql } from '@vercel/postgres';
import { Patient } from '../types';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredPatients(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

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
    throw new Error('Failed to fetch invoices.');
  }
}