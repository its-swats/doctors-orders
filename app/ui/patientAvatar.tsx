const BACKUP_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export default function PatientAvatar({ name, imageUrl }: { name: string | null, imageUrl: string | null }) {

  return(
    <div className="flex flex-col items-center justify-center mb-2">
      <img className="h-24 w-24 mb-2 rounded-full bg-gray-50" src={imageUrl || BACKUP_AVATAR} alt="" />
      { name && <span>{ name }</span> }
    </div>
  )
}