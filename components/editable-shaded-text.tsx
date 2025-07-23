"use client"

import { EditableText } from "./editable-text"

interface EditableShadedTextProps {
  content: string
  onUpdate: (content: string) => void
}

export function EditableShadedText({ content, onUpdate }: EditableShadedTextProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-gray-400">
      <EditableText
        content={content}
        onUpdate={onUpdate}
        placeholder="Haz clic para editar el texto sombreado"
        className="text-base text-gray-600 italic"
        multiline={true}
      />
    </div>
  )
}
