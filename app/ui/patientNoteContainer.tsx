import { Patient } from "../lib/types";
import { fetchNotes } from "../lib/data/notes"
import PatientAvatar from "./patientAvatar";
import PatientNoteCard from './patientNoteCard';
import ModalButton from './modalButton';

export default async function PatientNoteContainer({ patient }: { patient: Patient | null } ) {
  if(!patient) {
    return(
      <div className="text-center">
        <PatientAvatar
          name={null}
          imageUrl={null}
        />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No Patient Selected</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by selecting or searching for a Patient.</p>
      </div>
    );
  }

  const { name, image_url, id } = patient;
  const notes = await fetchNotes(id);

  return(
    <>
      <div className="text-center">
        <PatientAvatar
          name={name}
          imageUrl={image_url}
        />
        { notes.length == 0 && (
          <>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Notes found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by leaving a note for this patient.</p>
            <div className="mt-6">
              <ModalButton
                title={'Leave a note for your Patient'}
                patientId={id}
              />
            </div>
          </>
        )}
      </div>
      { notes.length >0 && (
        notes.map((note) => <PatientNoteCard patient={patient} note={note} />)
      )}
    </>
  );
}
