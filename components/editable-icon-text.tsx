"use client"

import { useState } from "react"
import { EditableText } from "./editable-text"
import { Star, Heart, CheckCircle, AlertCircle, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

const availableIcons = [
  { name: "Estrella", icon: Star },
  { name: "Corazón", icon: Heart },
  { name: "Check", icon: CheckCircle },
  { name: "Alerta", icon: AlertCircle },
  { name: "Rayo", icon: Zap },
  { name: "Objetivo", icon: Target },
]

interface EditableIconTextProps {
  content: string
  iconName: string
  onUpdate: (updates: { content?: string; iconName?: string }) => void
}

export function EditableIconText({ content, iconName, onUpdate }: EditableIconTextProps) {
  const [showIconSelector, setShowIconSelector] = useState(false)

  const currentIcon = availableIcons.find((i) => i.name === iconName) || availableIcons[0]
  const IconComponent = currentIcon.icon

  return (
    <div className="flex gap-3 items-start">
      <div className="relative">
        <div
          onClick={() => setShowIconSelector(!showIconSelector)}
          className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-200 transition-colors"
        >
          <IconComponent className="w-4 h-4 text-orange-600" />
        </div>

        {showIconSelector && (
          <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
            <div className="grid grid-cols-3 gap-2">
              {availableIcons.map((iconOption) => {
                const Icon = iconOption.icon
                return (
                  <Button
                    key={iconOption.name}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onUpdate({ iconName: iconOption.name })
                      setShowIconSelector(false)
                    }}
                    className="w-8 h-8 p-0"
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <EditableText
          content={content}
          onUpdate={(newContent) => onUpdate({ content: newContent })}
          placeholder="Haz clic para editar el texto"
          className="text-base text-gray-700"
          multiline={true}
        />
      </div>
    </div>
  )
}
