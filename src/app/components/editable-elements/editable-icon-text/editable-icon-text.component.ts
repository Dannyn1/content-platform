import { Component, Input, Output, EventEmitter, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface IconOption {
  name: string
  svg: string
}

@Component({
  selector: "app-editable-icon-text",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex gap-3 items-start">
      <div class="relative">
        <div
          (click)="toggleIconSelector()"
          class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-200 transition-colors"
        >
          <div [innerHTML]="getCurrentIcon().svg" class="w-4 h-4 text-orange-600"></div>
        </div>

        <div *ngIf="showIconSelector" 
             class="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
          <div class="grid grid-cols-3 gap-2">
            <button
              *ngFor="let iconOption of availableIcons"
              (click)="selectIcon(iconOption.name)"
              class="w-8 h-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center"
            >
              <div [innerHTML]="iconOption.svg" class="w-4 h-4"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="flex-1 group relative">
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
    </div>
  `,
})
export class EditableIconTextComponent {
  @Input() content = ""
  @Input() iconName = "Estrella"
  @Output() contentChange = new EventEmitter<string>()
  @Output() iconChange = new EventEmitter<string>()
  @ViewChild("textareaRef") textareaRef!: ElementRef<HTMLTextAreaElement>

  isEditing = false
  tempContent = ""
  showIconSelector = false

  availableIcons: IconOption[] = [
    {
      name: "Estrella",
      svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>',
    },
    {
      name: "Corazón",
      svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
    },
    {
      name: "Check",
      svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
    },
    {
      name: "Alerta",
      svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
    },
    {
      name: "Rayo",
      svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
    },
    {
      name: "Objetivo",
      svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>',
    },
  ]

  getCurrentIcon(): IconOption {
    return this.availableIcons.find((icon) => icon.name === this.iconName) || this.availableIcons[0]
  }

  toggleIconSelector(): void {
    this.showIconSelector = !this.showIconSelector
  }

  selectIcon(iconName: string): void {
    this.iconChange.emit(iconName)
    this.showIconSelector = false
  }

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
