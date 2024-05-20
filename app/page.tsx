import PatientList from './ui/patientList';
import PatientNoteContainer from './ui/patientNoteContainer';
import { fetchFilteredPatients } from './lib/data/patients';

export default async function Home() {
  const patients = await fetchFilteredPatients('');

  return (
    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
      <PatientList patients={patients} />

      <div className="shrink-0 border-t lg:flex-1 border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
        <PatientNoteContainer patient={patients[0]} />
      </div>
    </div>
  );
}
