"use client"

import { EditableText } from "./editable-text"

interface EditableSimpleTextProps {
  content: string
  onUpdate: (content: string) => void
}

export function EditableSimpleText({ content, onUpdate }: EditableSimpleTextProps) {
  return (
    <EditableText
      content={content}
      onUpdate={onUpdate}
      placeholder="Haz clic para editar el texto"
      className="text-base text-gray-700"
      multiline={true}
    />
  )
}
