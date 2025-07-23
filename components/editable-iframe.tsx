"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code, ExternalLink } from "lucide-react"

interface EditableIframeProps {
  src: string
  onUpdate: (src: string) => void
}

export function EditableIframe({ src, onUpdate }: EditableIframeProps) {
  const [isEditing, setIsEditing] = useState(!src)
  const [tempSrc, setTempSrc] = useState(src)

  const handleSave = () => {
    onUpdate(tempSrc)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        <div className="text-center">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Configurar Iframe</h3>
          <div className="space-y-3">
            <Input
              type="url"
              placeholder="https://ejemplo.com o código iframe completo"
              value={tempSrc}
              onChange={(e) => setTempSrc(e.target.value)}
              className="w-full"
            />
            <div className="flex gap-2 justify-center">
              <Button onClick={handleSave} disabled={!tempSrc}>
                Agregar Iframe
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Si es una URL simple, crear el iframe
  const isUrl = src.startsWith("http")
  const iframeCode = isUrl ? `<iframe src="${src}" width="100%" height="400" frameborder="0"></iframe>` : src

  return (
    <div className="relative group">
      <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
        <div className="w-full h-64" dangerouslySetInnerHTML={{ __html: iframeCode }} />
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-white">
          <Code className="w-4 h-4" />
        </Button>
        {isUrl && (
          <Button variant="outline" size="sm" onClick={() => window.open(src, "_blank")} className="bg-white">
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
