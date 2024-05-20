'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function PatientListItem({ id, email, imageUrl, name }: { id: string, email: string, imageUrl: string, name: string }) {
  const pathname = usePathname();
  const selected = pathname.indexOf(`/patients/${id}`) != -1;
  const href = selected ? '/' : `/patients/${id}/notes`

  return(
    <Link href={href}>
      <li className={clsx("flex justify-between gap-x-6 py-5",
        {
          'bg-slate-300': selected,
          'px-4': selected,
          'rounded-md': selected
        }
      )}>
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={imageUrl} alt="" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{email}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Patient</p>
        </div>
      </li>
    </Link>
  )
}