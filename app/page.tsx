"use client"

import { useState, useRef, useCallback } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Header } from "../components/header"
import { EditorSidebar } from "../components/editor-sidebar"
import { DraggableElements } from "../components/draggable-elements"
import { DropZone } from "../components/drop-zone"

export default function Page() {
  const [droppedElements, setDroppedElements] = useState<any[]>([])
  const nextIdRef = useRef(1)

  const generateUniqueId = () => {
    const id = nextIdRef.current
    nextIdRef.current += 1
    return id
  }

  const handleDrop = useCallback((item: any, insertIndex?: number) => {
    console.log("=== DROP EVENT ===")
    console.log("Item:", item.elementType || item.id)
    console.log("Insert Index RECIBIDO:", insertIndex)
    console.log("¿Es undefined?", insertIndex === undefined)

    setDroppedElements((currentElements) => {
      console.log("Estado ANTES del drop:")
      currentElements.forEach((el, i) => {
        console.log(`  Posición ${i}: ID ${el.id} (${el.elementType})`)
      })

      // Si es un elemento existente que se está reordenando
      if (item.isExisting) {
        console.log("Reordenando elemento existente")
        const currentIndex = currentElements.findIndex((el) => el.id === item.id)

        if (currentIndex === -1) {
          console.log("Elemento no encontrado!")
          return currentElements
        }

        console.log("Current Index:", currentIndex)

        // Si se está moviendo a la misma posición, no hacer nada
        if (insertIndex === currentIndex || insertIndex === currentIndex + 1) {
          console.log("Misma posición, no hacer nada")
          return currentElements
        }

        const newElements = [...currentElements]
        const elementToMove = newElements[currentIndex]

        // Remover el elemento de su posición actual
        newElements.splice(currentIndex, 1)
        console.log(
          "Después de remover:",
          newElements.map((el, i) => `${i}:ID${el.id}`),
        )

        // Calcular la nueva posición
        let targetIndex = insertIndex !== undefined ? insertIndex : newElements.length

        // Ajustar el índice si el elemento original estaba antes de la posición target
        if (currentIndex < insertIndex!) {
          targetIndex = targetIndex - 1
        }

        console.log("Target Index ajustado:", targetIndex)

        // Insertar en la nueva posición
        newElements.splice(targetIndex, 0, elementToMove)

        console.log("Estado DESPUÉS del reordenamiento:")
        newElements.forEach((el, i) => {
          console.log(`  Posición ${i}: ID ${el.id} (${el.elementType})`)
        })

        return newElements
      }

      // Si es un elemento nuevo desde la paleta
      console.log("Agregando elemento nuevo")

      const uniqueId = generateUniqueId()
      const newElement = {
        id: uniqueId,
        name: item.name,
        color: item.color,
        icon: item.icon,
        elementType: item.id,
        content: ["primary-heading", "subheading", "simple-text", "shaded-text", "info-block", "icon-text"].includes(
          item.id,
        )
          ? "Haz clic para editar"
          : "",
        imageUrl: item.id === "image" ? "" : undefined,
        videoUrl: item.id === "video" ? "" : undefined,
        src: item.id === "iframe" ? "" : undefined,
        chips: item.id === "chip-list" ? [] : undefined,
        iconName: item.id === "icon-text" ? "Estrella" : undefined,
      }

      console.log("Nuevo elemento creado:", newElement)

      const newElements = [...currentElements]

      // PROBLEMA: Si insertIndex es 0, está insertando al inicio!
      // Necesitamos verificar si realmente queremos insertar al inicio o al final
      let targetIndex = insertIndex !== undefined ? insertIndex : currentElements.length

      console.log(`🚨 PROBLEMA DETECTADO: insertIndex=${insertIndex}`)
      console.log(`🚨 targetIndex calculado: ${targetIndex}`)
      console.log(`🚨 ¿Debería ir al final? ${targetIndex === 0 ? "NO - VA AL INICIO!" : "SÍ"}`)

      // Si insertIndex es 0 pero tenemos elementos, algo está mal
      if (insertIndex === 0 && currentElements.length > 0) {
        console.log("🔧 CORRIGIENDO: Forzando inserción al final")
        targetIndex = currentElements.length
      }

      console.log(`Insertando elemento ID ${uniqueId} en posición ${targetIndex}`)
      console.log(
        "Array antes de splice:",
        newElements.map((el, i) => `${i}:ID${el.id}`),
      )

      newElements.splice(targetIndex, 0, newElement)

      console.log(
        "Array después de splice:",
        newElements.map((el, i) => `${i}:ID${el.id}`),
      )

      console.log("Estado FINAL después de insertar:")
      newElements.forEach((el, i) => {
        console.log(`  Posición ${i}: ID ${el.id} (${el.elementType})`)
      })

      return newElements
    })
  }, [])

  const updateElement = useCallback((id: number, updates: any) => {
    setDroppedElements((prev) => prev.map((element) => (element.id === id ? { ...element, ...updates } : element)))
  }, [])

  const removeElement = useCallback((id: number) => {
    console.log(`Eliminando elemento ID ${id}`)
    setDroppedElements((prev) => {
      const filtered = prev.filter((element) => element.id !== id)
      console.log(
        "Elementos después de eliminar:",
        filtered.map((el) => `ID${el.id}`),
      )
      return filtered
    })
  }, [])

  console.log(
    "Render - droppedElements:",
    droppedElements.map((el, i) => `Pos${i}:ID${el.id}`),
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <div className="flex-1 p-6">
            <EditorSidebar />
            <DropZone
              onDrop={handleDrop}
              droppedElements={droppedElements}
              onUpdateElement={updateElement}
              onRemoveElement={removeElement}
            />
          </div>
          <DraggableElements />
        </div>
      </div>
    </DndProvider>
  )
}
