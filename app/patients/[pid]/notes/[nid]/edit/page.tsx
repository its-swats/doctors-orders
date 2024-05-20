import PatientAvatar from '@/app/ui/patientAvatar'
import { fetchPatient } from '@/app/lib/data/patients';
import { fetchNote } from '@/app/lib/data/notes';
import { updateNote } from '@/app/lib/data/actions';
import Form from '@/app/ui/Form';

export default async function Page({ params }: { params: { pid: string, nid: string }}) {
  const [patient, note] = await Promise.all([
    fetchPatient(params.pid),
    fetchNote(params.nid)
  ])

  return(
    <main>
      <PatientAvatar
        name={patient.name}
        imageUrl={patient.image_url}
      />
      <Form
        patientId={params.pid}
        note={note}
        action={updateNote}
      />
    </main>
  )
}