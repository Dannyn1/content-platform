"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface EditableTextProps {
  content: string
  onUpdate: (content: string) => void
  placeholder?: string
  className?: string
  multiline?: boolean
}

export function EditableText({
  content,
  onUpdate,
  placeholder = "Haz clic para editar",
  className = "",
  multiline = false,
}: EditableTextProps) {
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
    if (e.key === "Enter" && !multiline) {
      handleSave()
    }
    if (e.key === "Escape") {
      setTempContent(content)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          className={`bg-transparent border-2 border-blue-400 rounded px-2 py-1 w-full focus:outline-none resize-none ${className}`}
          autoFocus
          placeholder={placeholder}
          rows={3}
        />
      )
    }

    return (
      <input
        type="text"
        value={tempContent}
        onChange={(e) => setTempContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        className={`bg-transparent border-2 border-blue-400 rounded px-2 py-1 w-full focus:outline-none ${className}`}
        autoFocus
        placeholder={placeholder}
      />
    )
  }

  return (
    <div className="group relative">
      <div
        onClick={() => setIsEditing(true)}
        className={`cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors min-h-[2rem] flex items-center ${className}`}
      >
        {content || placeholder}
      </div>
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded shadow">Clic para editar</span>
      </div>
    </div>
  )
}
