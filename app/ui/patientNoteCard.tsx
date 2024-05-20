'use client'

import { Patient, Note } from '../lib/types';
import { Button } from './catalyst/button';
import { deleteNote } from '../lib/data/actions';

export default function PatientNoteCard({ patient, note }: {patient: Patient, note: Note} ) {
  return(
    <div className="overflow-hidden mb-6 rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        { note.content }
      </div>
      <div className="flex flex-row-reverse items-end gap-2 pr-6 mb-6">
        <Button onClick={() => deleteNote({ id: note.id })} type='button'>Delete</Button>
        <Button type='button'>Edit</Button>
      </div>
    </div>
  )
}