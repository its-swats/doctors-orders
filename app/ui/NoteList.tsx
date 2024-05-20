import { Link } from "@/app/ui/catalyst/link";
import { Button } from "@/app/ui/catalyst/button";
import PatientAvatar from "@/app/ui/patientAvatar";
import PatientNoteCard from "@/app/ui/patientNoteCard";
import { Patient } from "../lib/types";
import { Note } from "../lib/types";

export default function NoteList({ patient, notes }: { patient: Patient, notes: Note[] }) {
  return(
    <>
      <div className="text-center">
        <PatientAvatar
          name={patient.name}
          imageUrl={patient.image_url}
        />
        <div className="mb-4">
          <Link href={`/patients/${patient.id}/notes/new`}>
            <Button>New Note</Button>
          </Link>
        </div>
        { notes.length == 0 && (
          <>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Notes found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by leaving a note for this patient.</p>
          </>
        )}
      </div>
      { notes.length > 0 && (
        notes.map((note) => <PatientNoteCard key={note.id} patient={patient} note={note} />)
      )}
    </>
  );
}