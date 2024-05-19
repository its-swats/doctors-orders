export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-full flex-col">
        <header className="shrink-0 bg-gray-900">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-white">Doctor&apos;s Orders</h1>
            { children }
          </div>
        </header>
      </div>
    </>
  )
}