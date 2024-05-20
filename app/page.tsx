import PatientAvatar from "./ui/patientAvatar";

export default async function Home() {
  return (
    <div className="text-center">
      <PatientAvatar
        name={null}
        imageUrl={null}
      />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Patient Selected</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by selecting or searching for a Patient.</p>
    </div>
  );
}
