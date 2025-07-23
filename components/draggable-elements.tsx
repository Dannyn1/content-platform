import { useDrag } from "react-dnd"
import { Code, ImageIcon, Info, Tag } from "lucide-react"

const elements = [
  { id: "primary-heading", name: "Título Principal", color: "bg-teal-100 text-teal-700", icon: null },
  { id: "subheading", name: "Subtítulo", color: "bg-green-100 text-green-700", icon: null },
  { id: "simple-text", name: "Texto Simple", color: "bg-teal-100 text-teal-700", icon: null },
  { id: "shaded-text", name: "Texto Sombreado", color: "bg-gray-100 text-gray-700", icon: null },
  { id: "image", name: "Imagen", color: "bg-pink-100 text-pink-700", icon: ImageIcon },
  { id: "iframe", name: "Iframe", color: "bg-gray-100 text-gray-700", icon: Code },
  { id: "video", name: "Video", color: "bg-purple-100 text-purple-700", icon: null },
  { id: "info-block", name: "Bloque de Info", color: "bg-blue-100 text-blue-700", icon: Info },
  { id: "icon-text", name: "Icono + Texto", color: "bg-orange-100 text-orange-700", icon: null },
  { id: "chip-list", name: "Lista de Chips", color: "bg-yellow-100 text-yellow-700", icon: Tag },
]

function DraggableElement({ element }: { element: (typeof elements)[0] }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const IconComponent = element.icon

  return (
    <div
      ref={drag}
      className={`${element.color} p-3 rounded-lg cursor-move transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "opacity-100 hover:scale-105"
      } flex items-center gap-2`}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      <span className="font-medium text-sm">{element.name}</span>
    </div>
  )
}

export function DraggableElements() {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => (
          <DraggableElement key={element.id} element={element} />
        ))}
      </div>
    </div>
  )
}
