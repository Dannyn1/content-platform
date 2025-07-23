"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Upload, Link } from "lucide-react"

interface EditableVideoProps {
  videoUrl: string
  onUpdate: (videoUrl: string) => void
}

export function EditableVideo({ videoUrl, onUpdate }: EditableVideoProps) {
  const [isEditing, setIsEditing] = useState(!videoUrl)
  const [tempUrl, setTempUrl] = useState(videoUrl)
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

  // Función para convertir URLs de YouTube a embed
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  if (isEditing) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        <div className="text-center">
          <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Agregar Video</h3>

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
                placeholder="https://youtube.com/watch?v=... o URL del video"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="w-full"
              />
              <div className="flex gap-2 justify-center">
                <Button onClick={handleSave} disabled={!tempUrl}>
                  Agregar Video
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
                accept="video/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {tempUrl && (
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleSave}>Agregar Video</Button>
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

  const embedUrl = getEmbedUrl(videoUrl)
  const isYouTube = embedUrl.includes("youtube.com/embed")

  return (
    <div className="relative group">
      <div className="bg-black rounded-lg overflow-hidden">
        {isYouTube ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="300"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          />
        ) : (
          <video
            src={videoUrl}
            controls
            className="w-full h-64 object-cover"
            onError={(e) => {
              console.error("Error loading video:", e)
            }}
          />
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white"
        onClick={() => setIsEditing(true)}
      >
        <Play className="w-4 h-4" />
      </Button>
    </div>
  )
}
