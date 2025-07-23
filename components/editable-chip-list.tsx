"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"

interface EditableChipListProps {
  chips: string[]
  onUpdate: (chips: string[]) => void
}

export function EditableChipList({ chips, onUpdate }: EditableChipListProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newChip, setNewChip] = useState("")

  const addChip = () => {
    if (newChip.trim() && !chips.includes(newChip.trim())) {
      onUpdate([...chips, newChip.trim()])
      setNewChip("")
      setIsAdding(false)
    }
  }

  const removeChip = (index: number) => {
    onUpdate(chips.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addChip()
    }
    if (e.key === "Escape") {
      setNewChip("")
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 group"
          >
            <span>{chip}</span>
            <button
              onClick={() => removeChip(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {isAdding ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={newChip}
              onChange={(e) => setNewChip(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={addChip}
              placeholder="Nuevo chip"
              className="w-24 h-8 text-sm"
              autoFocus
            />
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="h-8 px-3 text-sm bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
          >
            <Plus className="w-3 h-3 mr-1" />
            Agregar
          </Button>
        )}
      </div>

      {chips.length === 0 && !isAdding && (
        <div className="text-gray-500 text-sm italic">No hay chips. Haz clic en "Agregar" para crear uno.</div>
      )}
    </div>
  )
}
