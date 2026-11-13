export default function StudioDetailsLoading() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="skeleton h-4 w-48" />

        <div className="mt-10 space-y-4">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-12 w-2/3 max-w-xl" />
          <div className="skeleton h-4 w-1/2" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="skeleton h-72 rounded-2xl md:h-[420px]" />

            <div className="rounded-2xl border border-base-300 bg-base-100 p-7">
              <div className="skeleton h-6 w-32" />
              <div className="skeleton mt-4 h-4 w-full" />
              <div className="skeleton mt-2 h-4 w-5/6" />
              <div className="skeleton mt-2 h-4 w-2/3" />
            </div>
          </div>

          <div className="skeleton h-96 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
