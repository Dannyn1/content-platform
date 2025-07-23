"use client"

import { useDrag } from "react-dnd"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import type { ReactNode } from "react"

interface WorkspaceElementProps {
  element: any
  children: ReactNode
  onRemove: () => void
}

export function WorkspaceElement({ element, children, onRemove }: WorkspaceElementProps) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "workspace-element",
    item: { ...element, isExisting: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={dragPreview}
      className={`group bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ${
        isDragging ? "opacity-50 rotate-1 scale-105 shadow-lg" : "opacity-100 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-2 p-4">
        {/* Handle para arrastrar */}
        <div
          ref={drag}
          className="flex-shrink-0 cursor-move p-1 hover:bg-gray-100 rounded transition-colors opacity-0 group-hover:opacity-100"
          title="Arrastra para reordenar"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        {/* Contenido del elemento */}
        <div className="flex-1 min-w-0">{children}</div>

        {/* Botón de eliminar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
          title="Eliminar elemento"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
