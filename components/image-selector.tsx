"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Link, Upload } from "lucide-react"

interface ImageSelectorProps {
  imageUrl: string
  onUpdate: (imageUrl: string) => void
}

export function ImageSelector({ imageUrl, onUpdate }: ImageSelectorProps) {
  const [isEditing, setIsEditing] = useState(!imageUrl)
  const [tempUrl, setTempUrl] = useState(imageUrl)
  const [inputMethod, setInputMethod] = useState<"url" | "upload">("url")

  const handleSave = () => {
    onUpdate(tempUrl)
    setIsEditing(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setTempUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (isEditing) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={inputMethod === "url" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMethod("url")}
            >
              <Link className="w-4 h-4 mr-1" />
              URL
            </Button>
            <Button
              variant={inputMethod === "upload" ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMethod("upload")}
            >
              <Upload className="w-4 h-4 mr-1" />
              Subir
            </Button>
          </div>

          {inputMethod === "url" ? (
            <div className="space-y-3">
              <Input
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="w-full"
              />
              <div className="flex gap-2 justify-center">
                <Button onClick={handleSave} disabled={!tempUrl}>
                  Agregar imagen
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {tempUrl && (
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleSave}>Agregar imagen</Button>
                  <Button variant="outline" onClick={() => setTempUrl("")}>
                    Limpiar
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt="Imagen seleccionada"
        className="max-w-full h-auto rounded-lg"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg?height=200&width=300&text=Imagen no encontrada"
        }}
      />
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
        onClick={() => setIsEditing(true)}
      >
        <ImageIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}
