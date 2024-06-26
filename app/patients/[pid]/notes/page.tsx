import { fetchNotesForPatient } from "@/app/lib/data/notes"
import { fetchPatient } from "@/app/lib/data/patients";
import { notFound } from "next/navigation";
import NoteList from "@/app/ui/NoteList";


export default async function Page({ params, searchParams }: { params: { pid: string }, searchParams?: { query?: string }}) {
  const query = searchParams?.query || '';
  const { pid } = params;
  const [patient, notes] = await Promise.all([
    fetchPatient(pid),
    fetchNotesForPatient(pid, query)
  ])
  if(!patient) {
    return notFound();
  }

  return(
    <NoteList patient={patient} notes={notes} />    
  );
}