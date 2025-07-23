import { useDrop } from "react-dnd"
import { EditableTitle } from "./editable-title"
import { EditableSubtitle } from "./editable-subtitle"
import { EditableSimpleText } from "./editable-simple-text"
import { EditableShadedText } from "./editable-shaded-text"
import { EditableInfoBlock } from "./editable-info-block"
import { EditableIconText } from "./editable-icon-text"
import { EditableChipList } from "./editable-chip-list"
import { EditableIframe } from "./editable-iframe"
import { EditableVideo } from "./editable-video"
import { ImageSelector } from "./image-selector"
import { WorkspaceElement } from "./workspace-element"

interface DropZoneProps {
  onDrop: (item: any, insertIndex?: number) => void
  droppedElements: any[]
  onUpdateElement: (id: number, updates: any) => void
  onRemoveElement: (id: number) => void
}

function DropTarget({ onDrop, index }: { onDrop: (item: any, index: number) => void; index: number }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["element", "workspace-element"],
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        console.log(`DropTarget ${index}: Drop ya procesado, ignorando`)
        return
      }
      console.log(`🟠 DropTarget ${index}: Procesando drop de ${item.elementType || item.id}`)
      onDrop(item, index)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`transition-all duration-200 my-2 ${
        isOver
          ? "h-8 bg-orange-100 border-2 border-dashed border-orange-400 rounded-lg flex items-center justify-center"
          : "h-2 bg-transparent hover:bg-gray-100 rounded"
      }`}
    >
      {isOver && <span className="text-orange-600 text-sm font-medium">↕ Insertar aquí (posición {index})</span>}
    </div>
  )
}

export function DropZone({ onDrop, droppedElements, onUpdateElement, onRemoveElement }: DropZoneProps) {
  console.log("DropZone render - elementos:", droppedElements.length)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["element", "workspace-element"],
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        console.log("DropZone: Drop ya procesado por DropTarget, ignorando")
        return
      }

      console.log("🔵 DropZone: Procesando drop en área azul claro")
      console.log("📊 Elementos actuales:", droppedElements.length)

      // Si es un elemento existente que se está reordenando
      if (item.isExisting) {
        console.log("🔄 Reordenando elemento existente - moviendo al final")
        const currentIndex = droppedElements.findIndex((el) => el.id === item.id)
        if (currentIndex !== -1) {
          // Mover al final
          const finalPosition = droppedElements.length - 1
          console.log(`📍 Moviendo elemento de posición ${currentIndex} a posición ${finalPosition}`)
          onDrop(item, finalPosition)
          return
        }
      }

      // Si es un elemento nuevo, agregar al final
      const finalPosition = droppedElements.length
      console.log(`📍 DropZone: Agregando elemento nuevo al final en posición ${finalPosition}`)
      onDrop(item, finalPosition)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }))

  const renderElement = (element: any) => {
    switch (element.elementType) {
      case "primary-heading":
        return (
          <EditableTitle content={element.content} onUpdate={(content) => onUpdateElement(element.id, { content })} />
        )
      case "subheading":
        return (
          <EditableSubtitle
            content={element.content}
            onUpdate={(content) => onUpdateElement(element.id, { content })}
          />
        )
      case "simple-text":
        return (
          <EditableSimpleText
            content={element.content}
            onUpdate={(content) => onUpdateElement(element.id, { content })}
          />
        )
      case "shaded-text":
        return (
          <EditableShadedText
            content={element.content}
            onUpdate={(content) => onUpdateElement(element.id, { content })}
          />
        )
      case "info-block":
        return (
          <EditableInfoBlock
            content={element.content}
            onUpdate={(content) => onUpdateElement(element.id, { content })}
          />
        )
      case "icon-text":
        return (
          <EditableIconText
            content={element.content}
            iconName={element.iconName || "Estrella"}
            onUpdate={(updates) => onUpdateElement(element.id, updates)}
          />
        )
      case "chip-list":
        return (
          <EditableChipList chips={element.chips || []} onUpdate={(chips) => onUpdateElement(element.id, { chips })} />
        )
      case "iframe":
        return <EditableIframe src={element.src || ""} onUpdate={(src) => onUpdateElement(element.id, { src })} />
      case "video":
        return (
          <EditableVideo
            videoUrl={element.videoUrl || ""}
            onUpdate={(videoUrl) => onUpdateElement(element.id, { videoUrl })}
          />
        )
      case "image":
        return (
          <ImageSelector
            imageUrl={element.imageUrl}
            onUpdate={(imageUrl) => onUpdateElement(element.id, { imageUrl })}
          />
        )
      default:
        return (
          <div className={`${element.color} p-4 rounded-lg`}>
            <span className="font-medium">{element.name}</span>
          </div>
        )
    }
  }

  return (
    <div
      ref={drop}
      className={`mt-8 min-h-96 border-2 border-dashed rounded-lg p-6 transition-colors ${
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      {droppedElements.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg font-medium">Arrastra elementos aquí para construir tu página</p>
          <p className="text-sm mt-2">Los elementos se agregarán automáticamente abajo</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Mensaje cuando está en hover sobre el área general */}
          {isOver && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 font-semibold">
              📍 AGREGANDO AL FINAL (posición {droppedElements.length})
            </div>
          )}

          {/* Mostrar elementos con DropTargets entre ellos */}
          {droppedElements.map((element, index) => (
            <div key={`element-${element.id}`}>
              <WorkspaceElement element={element} onRemove={() => onRemoveElement(element.id)}>
                {renderElement(element)}
              </WorkspaceElement>

              {/* DropTarget SOLO entre elementos (no después del último) */}
              {index < droppedElements.length - 1 && <DropTarget onDrop={onDrop} index={index + 1} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
