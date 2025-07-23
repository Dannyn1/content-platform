import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-editable-iframe",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isEditing; else displayTemplate" 
         class="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
      <div class="text-center">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Configurar Iframe</h3>
        <div class="space-y-3">
          <input
            type="url"
            [(ngModel)]="tempSrc"
            placeholder="https://ejemplo.com o código iframe completo"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div class="flex gap-2 justify-center">
            <button
              (click)="handleSave()"
              [disabled]="!tempSrc"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Agregar Iframe
            </button>
            <button
              (click)="cancelEdit()"
              class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <ng-template #displayTemplate>
      <div class="relative group">
        <div class="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
          <div class="w-full h-64" [innerHTML]="getIframeCode()"></div>
        </div>
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            (click)="startEditing()"
            class="bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </button>
          <button
            *ngIf="isUrl()"
            (click)="openInNewTab()"
            class="bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </button>
        </div>
      </div>
    </ng-template>
  `,
})
export class EditableIframeComponent {
  @Input() src = ""
  @Output() srcChange = new EventEmitter<string>()

  isEditing = false
  tempSrc = ""

  ngOnInit(): void {
    if (!this.src) {
      this.isEditing = true
    }
  }

  startEditing(): void {
    this.isEditing = true
    this.tempSrc = this.src
  }

  handleSave(): void {
    this.srcChange.emit(this.tempSrc)
    this.isEditing = false
  }

  cancelEdit(): void {
    this.tempSrc = this.src
    this.isEditing = false
  }

  getIframeCode(): string {
    if (this.isUrl()) {
      return `<iframe src="${this.src}" width="100%" height="400" frameborder="0"></iframe>`
    }
    return this.src
  }

  isUrl(): boolean {
    return this.src.startsWith("http")
  }

  openInNewTab(): void {
    if (this.isUrl()) {
      window.open(this.src, "_blank")
    }
  }
}
