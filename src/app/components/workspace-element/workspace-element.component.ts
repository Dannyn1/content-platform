import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CdkDrag } from "@angular/cdk/drag-drop"
import type { DroppedElement } from "../../models/element.model"

@Component({
  selector: "app-workspace-element",
  standalone: true,
  imports: [CommonModule, CdkDrag],
  template: `
    <div class="group bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md">
      <div class="flex items-start gap-2 p-4">
        <!-- Handle para arrastrar -->
        <div 
          cdkDragHandle
          class="flex-shrink-0 cursor-move p-1 hover:bg-gray-100 rounded transition-colors opacity-0 group-hover:opacity-100"
          title="Arrastra para reordenar"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
          </svg>
        </div>

        <!-- Contenido del elemento -->
        <div class="flex-1 min-w-0">
          <ng-content></ng-content>
        </div>

        <!-- Botón de eliminar -->
        <button
          (click)="onRemove()"
          class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 p-1 rounded"
          title="Eliminar elemento"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class WorkspaceElementComponent {
  @Input() element!: DroppedElement
  @Output() remove = new EventEmitter<void>()

  onRemove(): void {
    this.remove.emit()
  }
}
