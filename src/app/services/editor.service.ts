import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { DroppedElement, DraggableElement } from "../models/element.model"

@Injectable({
  providedIn: "root",
})
export class EditorService {
  private nextId = 1
  private droppedElementsSubject = new BehaviorSubject<DroppedElement[]>([])

  droppedElements$: Observable<DroppedElement[]> = this.droppedElementsSubject.asObservable()

  constructor() {}

  private generateUniqueId(): number {
    return this.nextId++
  }

  addElement(item: DraggableElement, insertIndex?: number): void {
    const currentElements = this.droppedElementsSubject.value

    const uniqueId = this.generateUniqueId()
    const newElement: DroppedElement = {
      id: uniqueId,
      name: item.name,
      color: item.color,
      icon: item.icon,
      elementType: item.id,
      content: this.getDefaultContent(item.id),
      imageUrl: item.id === "image" ? "" : undefined,
      videoUrl: item.id === "video" ? "" : undefined,
      src: item.id === "iframe" ? "" : undefined,
      chips: item.id === "chip-list" ? [] : undefined,
      iconName: item.id === "icon-text" ? "Estrella" : undefined,
    }

    const newElements = [...currentElements]
    const targetIndex = insertIndex !== undefined ? insertIndex : currentElements.length
    newElements.splice(targetIndex, 0, newElement)

    this.droppedElementsSubject.next(newElements)
  }

  private getDefaultContent(elementType: string): string {
    const editableTypes = ["primary-heading", "subheading", "simple-text", "shaded-text", "info-block", "icon-text"]
    return editableTypes.includes(elementType) ? "Haz clic para editar" : ""
  }

  updateElement(id: number, updates: Partial<DroppedElement>): void {
    const currentElements = this.droppedElementsSubject.value
    const updatedElements = currentElements.map((element) => (element.id === id ? { ...element, ...updates } : element))
    this.droppedElementsSubject.next(updatedElements)
  }

  removeElement(id: number): void {
    const currentElements = this.droppedElementsSubject.value
    const filteredElements = currentElements.filter((element) => element.id !== id)
    this.droppedElementsSubject.next(filteredElements)
  }

  reorderElement(fromIndex: number, toIndex: number): void {
    const currentElements = [...this.droppedElementsSubject.value]
    const [movedElement] = currentElements.splice(fromIndex, 1)
    currentElements.splice(toIndex, 0, movedElement)
    this.droppedElementsSubject.next(currentElements)
  }

  getElements(): DroppedElement[] {
    return this.droppedElementsSubject.value
  }
}
