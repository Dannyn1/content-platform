import { Component, Input, Output, EventEmitter, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-editable-title",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="group relative">
      <input 
        *ngIf="isEditing; else displayTemplate"
        #inputRef
        type="text"
        [(ngModel)]="tempContent"
        (blur)="handleSave()"
        (keydown)="handleKeyPress($event)"
        class="text-2xl font-bold bg-transparent border-2 border-blue-400 rounded px-2 py-1 w-full focus:outline-none"
        placeholder="Escribe tu título aquí..."
      />
      
      <ng-template #displayTemplate>
        <h1 
          (click)="startEditing()"
          class="text-2xl font-bold cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors min-h-[2.5rem] flex items-center"
        >
          {{ content || 'Haz clic para editar el título' }}
        </h1>
        <div class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-xs text-gray-400 bg-white px-2 py-1 rounded shadow">Clic para editar</span>
        </div>
      </ng-template>
    </div>
  `,
})
export class EditableTitleComponent {
  @Input() content = ""
  @Output() contentChange = new EventEmitter<string>()
  @ViewChild("inputRef") inputRef!: ElementRef<HTMLInputElement>

  isEditing = false
  tempContent = ""

  startEditing(): void {
    this.isEditing = true
    this.tempContent = this.content
    setTimeout(() => {
      if (this.inputRef) {
        this.inputRef.nativeElement.focus()
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
    if (event.key === "Enter") {
      this.handleSave()
    }
    if (event.key === "Escape") {
      this.tempContent = this.content
      this.isEditing = false
    }
  }
}
