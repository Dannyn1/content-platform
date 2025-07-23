export interface DroppedElement {
  id: number
  name: string
  color: string
  icon?: string
  elementType: string
  content?: string
  imageUrl?: string
  videoUrl?: string
  src?: string
  chips?: string[]
  iconName?: string
}

export interface DraggableElement {
  id: string
  name: string
  color: string
  icon?: string
}
