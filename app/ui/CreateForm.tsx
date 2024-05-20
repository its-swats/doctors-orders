'use client'

import { Field, Fieldset, Label } from '@/app/ui/catalyst/fieldset'
import { Textarea } from '@/app/ui/catalyst/textarea'
import { Button } from '@/app/ui/catalyst/button';
import { Link } from '@/app/ui/catalyst/link';
import { createNote } from '@/app/lib/data/actions';
import { useFormState } from 'react-dom';


export default function CreateForm({ patientId }: { patientId: string }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createNote, initialState);

  return(
    <form action={dispatch}>
      <Fieldset>
        <input type='hidden' name='patientId' value={patientId} />
        <Field>
          <Label>Note Content</Label>
          <Textarea name="content" />
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