"use client"

import { EditableText } from "./editable-text"
import { Info } from "lucide-react"

interface EditableInfoBlockProps {
  content: string
  onUpdate: (content: string) => void
}

export function EditableInfoBlock({ content, onUpdate }: EditableInfoBlockProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <EditableText
        content={content}
        onUpdate={onUpdate}
        placeholder="Haz clic para editar la información"
        className="text-base text-blue-800"
        multiline={true}
      />
    </div>
  )
}
