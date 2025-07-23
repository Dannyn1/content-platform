"use client"

import { EditableText } from "./editable-text"

interface EditableSubtitleProps {
  content: string
  onUpdate: (content: string) => void
}

export function EditableSubtitle({ content, onUpdate }: EditableSubtitleProps) {
  return (
    <EditableText
      content={content}
      onUpdate={onUpdate}
      placeholder="Haz clic para editar el subtítulo"
      className="text-xl font-semibold text-gray-800"
    />
  )
}
