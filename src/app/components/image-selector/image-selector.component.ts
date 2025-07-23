import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-image-selector",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isEditing; else displayTemplate" 
         class="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
      <div class="text-center">
        <div class="flex justify-center gap-2 mb-4">
          <button
            (click)="inputMethod = 'url'"
            [class]="inputMethod === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded text-sm flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
            URL
          </button>
          <button
            (click)="inputMethod = 'upload'"
            [class]="inputMethod === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded text-sm flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Subir
          </button>
        </div>

        <div *ngIf="inputMethod === 'url'; else uploadTemplate" class="space-y-3">
          <input
            type="url"
            [(ngModel)]="tempUrl"
            placeholder="https://ejemplo.com/imagen.jpg"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div class="flex gap-2 justify-center">
            <button
              (click)="handleSave()"
              [disabled]="!tempUrl"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Agregar imagen
            </button>
            <button
              (click)="cancelEdit()"
              class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>

        <ng-template #uploadTemplate>
          <div class="space-y-3">
            <input
              type="file"
              accept="image/*"
              (change)="handleFileUpload($event)"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div *ngIf="tempUrl" class="flex gap-2 justify-center">
              <button
                (click)="handleSave()"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Agregar imagen
              </button>
              <button
                (click)="clearFile()"
                class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Limpiar
              </button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>

    <ng-template #displayTemplate>
      <div class="relative group">
        <img
          [src]="imageUrl || '/placeholder.svg'"
          alt="Imagen seleccionada"
          class="max-w-full h-auto rounded-lg"
          (error)="onImageError($event)"
        />
        <button
          (click)="startEditing()"
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"></path>
          </svg>
        </button>
      </div>
    </ng-template>
  `,
})
export class ImageSelectorComponent {
  @Input() imageUrl = ""
  @Output() imageUrlChange = new EventEmitter<string>()

  isEditing = false
  tempUrl = ""
  inputMethod: "url" | "upload" = "url"

  ngOnInit(): void {
    if (!this.imageUrl) {
      this.isEditing = true
    }
  }

  startEditing(): void {
    this.isEditing = true
    this.tempUrl = this.imageUrl
  }

  handleSave(): void {
    this.imageUrlChange.emit(this.tempUrl)
    this.isEditing = false
  }

  cancelEdit(): void {
    this.tempUrl = this.imageUrl
    this.isEditing = false
  }

  clearFile(): void {
    this.tempUrl = ""
  }

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.tempUrl = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement
    img.src = "/placeholder.svg?height=200&width=300&text=Imagen no encontrada"
  }
}
