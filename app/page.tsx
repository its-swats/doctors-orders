import PatientListItem from './ui/patientListItem';
import PatientNoteCard from './ui/patientNoteCard';
import { fetchFilteredPatients } from './lib/data/patients';

export default async function Home() {
  const patients = await fetchFilteredPatients('', 1);
  return (
    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
      <div className="px-4 py-6 sm:px-6 lg:pl-8 lg:flex-1 xl:pl-6">
        <ul role="list" className="divide-y divide-gray-100">
          {patients.map((patient, idx) => <PatientListItem
            key={idx}
            email={patient.email}
            imageUrl={patient.image_url}
            name={patient.name}
            />
          )}
        </ul>
      </div>

      <div className="shrink-0 border-t lg:flex-1 border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
        <PatientNoteCard 
          notes={[]}
        />
      </div>
    </div>
  );
}
