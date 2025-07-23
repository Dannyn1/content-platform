export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="font-semibold text-gray-900">Chyvrid</span>
      </div>
      <div className="w-10 h-10 bg-green-500 rounded-full"></div>
    </header>
  )
}
