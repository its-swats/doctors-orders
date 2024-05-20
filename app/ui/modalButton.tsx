'use client'

import { Button } from './catalyst/button';
import { Dialog, DialogActions, DialogBody, DialogTitle } from './catalyst/dialog';
import { Field, Label } from './catalyst/fieldset';
import { Textarea } from './catalyst/textarea';
import { Input } from './catalyst/input';
import { useState } from 'react';
import { createNote } from '../lib/data/actions';

export default function ModalButton({ title, patientId }: { title: string, patientId: string }) {
  let [isOpen, setIsOpen] = useState(false)

  const test = () => {
    createNote({ patientId: patientId, content: 'This is a test note' })
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        New Note
      </Button>
      <Dialog size="xl" open={isOpen} onClose={setIsOpen}>
        <DialogTitle>{ title }</DialogTitle>
        <DialogBody>
          <Field>
            <Label>Note content</Label>
            <Textarea name="content" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => test()}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Refund</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}