import PatientAvatar from '@/app/ui/patientAvatar'
import { fetchPatient } from '@/app/lib/data/patients';
import CreateForm from '@/app/ui/CreateForm';

export default async function Page({ params }: { params: { pid: string }}) {
  const patient = await fetchPatient(params.pid);

  return(
    <main>
      <PatientAvatar
        name={patient.name}
        imageUrl={patient.image_url}
      />
      <CreateForm
        patientId={params.pid}
      />
    </main>
  )
}