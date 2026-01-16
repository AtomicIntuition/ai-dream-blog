export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-dream-500/20 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-dream-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="mt-4 text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
