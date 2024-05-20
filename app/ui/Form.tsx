'use client'

import { Field, Fieldset, Label } from '@/app/ui/catalyst/fieldset'
import { Textarea } from '@/app/ui/catalyst/textarea'
import { Button } from '@/app/ui/catalyst/button';
import { Link } from '@/app/ui/catalyst/link';
import { State } from '@/app/lib/data/actions';
import { useFormState } from 'react-dom';
import { Note } from '../lib/types';

interface FormProps {
  patientId: string;
  note: Note | null;
  action(prevState: State, formData: FormData): State;
}

export default function Form({ patientId, note, action }: FormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(action, initialState);

  return(
    <form action={dispatch}>
      <Fieldset>
        <input type='hidden' name='patientId' value={patientId} />
        { note && 
          <input type='hidden' name='id' value={note.id} />
        }
        <Field>
          <Label>Note Content</Label>
          <Textarea rows={5} name="content" defaultValue={note?.content} />
          {state.errors?.content &&
              state.errors.content.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
        </Field>
      </Fieldset>
      <div className="flex flex-row-reverse items-end gap-2 mt-3">
        <Button type='submit'>Submit</Button>
        <Link href={`/patients/${patientId}/notes`}>
          <Button>Cancel</Button>
        </Link>
      </div>
    </form>
  );
}