import { fetchNotes } from "@/app/lib/data/notes"
import { fetchPatient } from "@/app/lib/data/patients";
import { notFound } from "next/navigation";
import NoteList from "@/app/ui/NoteList";


export default async function Page({ params }: { params: { pid: string }}) {
  const { pid } = params;
  const [patient, notes] = await Promise.all([
    fetchPatient(pid),
    fetchNotes(pid)
  ])
  if(!patient) {
    return notFound();
  }

  return(
    <NoteList patient={patient} notes={notes} />    
  );
}