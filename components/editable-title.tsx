"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface EditableTitleProps {
  content: string
  onUpdate: (content: string) => void
}

export function EditableTitle({ content, onUpdate }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempContent, setTempContent] = useState(content)

  useEffect(() => {
    setTempContent(content)
  }, [content])

  const handleSave = () => {
    if (tempContent.trim()) {
      onUpdate(tempContent.trim())
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    }
    if (e.key === "Escape") {
      setTempContent(content)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={tempContent}
        onChange={(e) => setTempContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        className="text-2xl font-bold bg-transparent border-2 border-blue-400 rounded px-2 py-1 w-full focus:outline-none"
        autoFocus
        placeholder="Escribe tu título aquí..."
      />
    )
  }

  return (
    <div className="group relative">
      <h1
        onClick={() => setIsEditing(true)}
        className="text-2xl font-bold cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors min-h-[2.5rem] flex items-center"
      >
        {content || "Haz clic para editar el título"}
      </h1>
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded shadow">Clic para editar</span>
      </div>
    </div>
  )
}
