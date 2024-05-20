import PatientAvatar from "./ui/patientAvatar";
import { fetchAllNotes } from "./lib/data/notes";
import PatientNoteCard from "@/app/ui/patientNoteCard";

export default async function Home({ searchParams }: { searchParams?: { query?: string } }) {
  const query = searchParams?.query || '';
  const data = await fetchAllNotes(query);
  
  if(data.length > 0) {
    return data.map((record) => 
      <PatientNoteCard key={record.id}
        patient={
          {
            id: record.patient_id,
            name: record.name,
            email: record.email,
            image_url: record.image_url
          }
        }
        note={
          {
            id: record.id,
            patient_id: record.patient_id,
            content: record.content,
            created_at: record.created_at,
            updated_at: record.updated_at
          }
        }
        showPatient={true}
      />
    ) 
  }

  return (
    <div className="text-center">
      <PatientAvatar
        name={null}
        imageUrl={null}
      />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Notes Found</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by selecting a Patient or searching for Notes.</p>
    </div>
  );
}
