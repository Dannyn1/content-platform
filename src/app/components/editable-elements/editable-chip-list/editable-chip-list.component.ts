import { Component, Input, Output, EventEmitter, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-editable-chip-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-3">
      <div class="flex flex-wrap gap-2">
        <div
          *ngFor="let chip of chips; let i = index"
          class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 group"
        >
          <span>{{ chip }}</span>
          <button
            (click)="removeChip(i)"
            class="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-200 rounded-full p-0.5"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div *ngIf="isAdding; else addButton" class="flex items-center gap-2">
          <input
            #inputRef
            type="text"
            [(ngModel)]="newChip"
            (keydown)="handleKeyPress($event)"
            (blur)="addChip()"
            placeholder="Nuevo chip"
            class="w-24 h-8 text-sm px-2 border border-yellow-200 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>

        <ng-template #addButton>
          <button
            (click)="startAdding()"
            class="h-8 px-3 text-sm bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 rounded flex items-center gap-1"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Agregar
          </button>
        </ng-template>
      </div>

      <div *ngIf="chips.length === 0 && !isAdding" class="text-gray-500 text-sm italic">
        No hay chips. Haz clic en "Agregar" para crear uno.
      </div>
    </div>
  `,
})
export class EditableChipListComponent {
  @Input() chips: string[] = []
  @Output() chipsChange = new EventEmitter<string[]>()
  @ViewChild("inputRef") inputRef!: ElementRef<HTMLInputElement>

  isAdding = false
  newChip = ""

  startAdding(): void {
    this.isAdding = true
    this.newChip = ""
    setTimeout(() => {
      if (this.inputRef) {
        this.inputRef.nativeElement.focus()
      }
    })
  }

  addChip(): void {
    if (this.newChip.trim() && !this.chips.includes(this.newChip.trim())) {
      const updatedChips = [...this.chips, this.newChip.trim()]
      this.chipsChange.emit(updatedChips)
      this.newChip = ""
    }
    this.isAdding = false
  }

  removeChip(index: number): void {
    const updatedChips = this.chips.filter((_, i) => i !== index)
    this.chipsChange.emit(updatedChips)
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.addChip()
    }
    if (event.key === "Escape") {
      this.newChip = ""
      this.isAdding = false
    }
  }
}
