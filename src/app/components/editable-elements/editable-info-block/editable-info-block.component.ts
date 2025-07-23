import { Component, Input, Output, EventEmitter, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-editable-info-block",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
      <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      
      <div class="group relative flex-1">
        <textarea 
          *ngIf="isEditing; else displayTemplate"
          #textareaRef
          [(ngModel)]="tempContent"
          (blur)="handleSave()"
          (keydown)="handleKeyPress($event)"
          class="text-base text-blue-800 bg-transparent border-2 border-blue-400 rounded px-2 py-1 w-full focus:outline-none resize-none"
          placeholder="Haz clic para editar la información"
          rows="3"
        ></textarea>
        
        <ng-template #displayTemplate>
          <div 
            (click)="startEditing()"
            class="text-base text-blue-800 cursor-pointer hover:bg-blue-100 rounded px-2 py-1 transition-colors min-h-[2rem] flex items-center whitespace-pre-wrap"
          >
            {{ content || 'Haz clic para editar la información' }}
          </div>
          <div class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-xs text-gray-400 bg-white px-2 py-1 rounded shadow">Clic para editar</span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class EditableInfoBlockComponent {
  @Input() content = ""
  @Output() contentChange = new EventEmitter<string>()
  @ViewChild("textareaRef") textareaRef!: ElementRef<HTMLTextAreaElement>

  isEditing = false
  tempContent = ""

  startEditing(): void {
    this.isEditing = true
    this.tempContent = this.content
    setTimeout(() => {
      if (this.textareaRef) {
        this.textareaRef.nativeElement.focus()
      }
    })
  }

  handleSave(): void {
    if (this.tempContent.trim()) {
      this.contentChange.emit(this.tempContent.trim())
    }
    this.isEditing = false
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.tempContent = this.content
      this.isEditing = false
    }
  }
}
