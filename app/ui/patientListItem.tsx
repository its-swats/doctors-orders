export default function PatientListItem({ email, imageUrl, name, role, lastSeen}: { email: string, imageUrl: string, name: string, role: string, lastSeen: string | null}) {
  return(
    <li key={email} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={imageUrl} alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{role}</p>
      </div>
    </li>
  )
}