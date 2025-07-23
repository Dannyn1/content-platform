import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop"
import type { DraggableElement } from "../../models/element.model"

@Component({
  selector: "app-draggable-elements",
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList],
  template: `
    <div class="w-80 bg-white border-l border-gray-200 p-6">
      <div class="grid grid-cols-2 gap-3" cdkDropList [cdkDropListData]="elements" cdkDropListSortingDisabled>
        <div 
          *ngFor="let element of elements" 
          cdkDrag
          [cdkDragData]="element"
          [ngClass]="element.color"
          class="p-3 rounded-lg cursor-move transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <span class="font-medium text-sm">{{ element.name }}</span>
        </div>
      </div>
    </div>
  `,
})
export class DraggableElementsComponent {
  elements: DraggableElement[] = [
    { id: "primary-heading", name: "Título Principal", color: "bg-teal-100 text-teal-700" },
    { id: "subheading", name: "Subtítulo", color: "bg-green-100 text-green-700" },
    { id: "simple-text", name: "Texto Simple", color: "bg-teal-100 text-teal-700" },
    { id: "shaded-text", name: "Texto Sombreado", color: "bg-gray-100 text-gray-700" },
    { id: "image", name: "Imagen", color: "bg-pink-100 text-pink-700" },
    { id: "iframe", name: "Iframe", color: "bg-gray-100 text-gray-700" },
    { id: "video", name: "Video", color: "bg-purple-100 text-purple-700" },
    { id: "info-block", name: "Bloque de Info", color: "bg-blue-100 text-blue-700" },
    { id: "icon-text", name: "Icono + Texto", color: "bg-orange-100 text-orange-700" },
    { id: "chip-list", name: "Lista de Chips", color: "bg-yellow-100 text-yellow-700" },
  ]
}
