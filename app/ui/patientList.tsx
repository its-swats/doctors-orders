import PatientListItem from './patientListItem';
import { Patient } from "../lib/types"

export default function PatientList({ patients }: { patients: Patient[] }) {
  return(
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
  )
}