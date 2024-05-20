import { Link } from './catalyst/link';
import { Patient, Note } from '../lib/types';
import { Button } from './catalyst/button';
import DeleteNoteButton from './DeleteNoteButton';

export default function PatientNoteCard({ patient, note, showPatient }: {patient: Patient, note: Note, showPatient: boolean} ) {
  return(
    <div className="overflow-hidden mb-6 rounded-lg bg-white shadow">      
      <div className="px-4 py-5 sm:p-6">
        { note.content }
      </div>
      <div className="flex justify-between px-6 mb-6">
        <div className='content-center'>
          {showPatient && (
            <Link className="flex gap-2" href={`/patients/${patient.id}/notes`}>
              <img className="h-6 w-6 mb-2 rounded-full bg-gray-50" src={patient.image_url} alt="" />
              <p>{patient.name}</p>
            </Link>
          )}
        </div>
        <div className='flex gap-2 items-end'>
          <DeleteNoteButton pid={patient.id} nid={note.id} />
          <Link href={`/patients/${patient.id}/notes/${note.id}/edit`}>
            <Button type='button'>Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}