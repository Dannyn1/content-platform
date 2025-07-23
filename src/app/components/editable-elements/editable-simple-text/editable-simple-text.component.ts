import { Component, Input, Output, EventEmitter, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-editable-simple-text",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="group relative">
      <textarea 
        *ngIf="isEditing; else displayTemplate"
        #textareaRef
        [(ngModel)]="tempContent"
        (blur)="handleSave()"
        (keydown)="handleKeyPress($event)"
        class="text-base text-gray-700 bg-transparent border-2 border-blue-400 rounded px-2 py-1 w-full focus:outline-none resize-none"
        placeholder="Haz clic para editar el texto"
        rows="3"
      ></textarea>
      
      <ng-template #displayTemplate>
        <div 
          (click)="startEditing()"
          class="text-base text-gray-700 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors min-h-[2rem] flex items-center whitespace-pre-wrap"
        >
          {{ content || 'Haz clic para editar el texto' }}
        </div>
        <div class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-xs text-gray-400 bg-white px-2 py-1 rounded shadow">Clic para editar</span>
        </div>
      </ng-template>
    </div>
  `,
})
export class EditableSimpleTextComponent {
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
