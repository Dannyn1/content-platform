export function EditorSidebar() {
  return (
    <div className="max-w-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Editor</h1>

      <div className="flex items-center gap-2 mb-6">
        <a href="#" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
          Abrir manual
          <span className="text-sm">→</span>
        </a>
        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-medium ml-auto">Editando</span>
      </div>
    </div>
  )
}
