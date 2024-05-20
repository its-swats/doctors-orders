import PatientAvatar from '@/app/ui/patientAvatar'
import { fetchPatient } from '@/app/lib/data/patients';
import Form from '@/app/ui/Form';
import { createNote } from '@/app/lib/data/actions';

export default async function Page({ params }: { params: { pid: string }}) {
  const patient = await fetchPatient(params.pid);

  return(
    <main>
      <PatientAvatar
        name={patient.name}
        imageUrl={patient.image_url}
      />
      <Form
        patientId={params.pid}
        note={null}
        action={createNote}
      />
    </main>
  )
}