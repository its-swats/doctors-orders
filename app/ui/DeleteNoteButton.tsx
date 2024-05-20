import { deleteNote } from "../lib/data/actions";
import { Button } from './catalyst/button';

export default function DeleteNoteButton({ pid, nid }: { pid: string, nid: string }) {
  const destroyNote = deleteNote.bind(null, pid, nid);

  return (
    <form action={destroyNote}>
      <Button type='submit'>Delete</Button>
    </form>
  );
}