import { Link } from './catalyst/link';
import { Patient, Note } from '../lib/types';
import { Button } from './catalyst/button';
import DeleteNoteButton from './DeleteNoteButton';

export default function PatientNoteCard({ patient, note }: {patient: Patient, note: Note} ) {
  return(
    <div className="overflow-hidden mb-6 rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        { note.content }
      </div>
      <div className="flex flex-row-reverse items-end gap-2 pr-6 mb-6">
        <DeleteNoteButton pid={patient.id} nid={note.id} />
        <Link href={`/patients/${patient.id}/notes/${note.id}/edit`}>
          <Button type='button'>Edit</Button>
        </Link>
      </div>
    </div>
  )
}