'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  content: z.string().min(20, { message: 'Must be at least 20 characters.' }).max(300, { message: 'Must be less than 300 characters.'})
});

const CreateNote = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    patientId?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createNote(prevState: State, formData: FormData) {
  const timestamp = new Date().toISOString();
  const validatedFields = CreateNote.safeParse({
    patientId: formData.get('patientId'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Note.',
    };
  }

  const { patientId, content } = validatedFields.data;
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

  revalidatePath(`/patients/${patientId}/notes`);
  redirect(`/patients/${patientId}/notes`)
};

export async function updateNote(prevState: State, formData: FormData) {
  const timestamp = new Date().toISOString();
  const validatedFields = FormSchema.safeParse({
    patientId: formData.get('patientId'),
    id: formData.get('id'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Note.',
    };
  }

  const { patientId, id, content } = validatedFields.data;
  try {
    await sql`

    UPDATE notes
      SET content = ${content}, updated_at = ${timestamp}
      WHERE id = ${id} AND patient_id = ${patientId}
    `;
  } catch(error) {
    console.log(error)
    return {
      message: `Error creating: ${error}`
    }
  }

  revalidatePath(`/patients/${patientId}/notes`);
  redirect(`/patients/${patientId}/notes`)
};

export async function deleteNote(pid: string, nid: string) {
  try {
    await sql`DELETE FROM notes WHERE id = ${nid} AND patient_id = ${pid}`;
    revalidatePath(`/patients/${pid}/notes`);
  } catch(error) {
    console.log(error)
    return {
      message: `Error creating: ${error}`
    }
  }
};