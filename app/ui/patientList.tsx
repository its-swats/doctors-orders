import PatientListItem from './patientListItem';
import { fetchFilteredPatients } from '../lib/data/patients';

export default async function PatientList() {
  const patients = await fetchFilteredPatients('');

  return(
    <div className="hidden lg:block px-4 py-6 sm:px-6 flex-1 lg:pl-8 xl:pl-6">
      <ul role="list" className="divide-y divide-gray-100">
        {patients.map((patient, idx) => <PatientListItem
          key={patient.id}
          id={patient.id}
          email={patient.email}
          imageUrl={patient.image_url}
          name={patient.name}
          />
        )}
      </ul>
    </div>
  )
}