import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CdkDropList, CdkDrag, type CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop"
import type { Observable } from "rxjs"
import type { EditorService } from "../../services/editor.service"
import type { DroppedElement, DraggableElement } from "../../models/element.model"
import { WorkspaceElementComponent } from "../workspace-element/workspace-element.component"
import { EditableTitleComponent } from "../editable-elements/editable-title/editable-title.component"
import { EditableSubtitleComponent } from "../editable-elements/editable-subtitle/editable-subtitle.component"
import { EditableSimpleTextComponent } from "../editable-elements/editable-simple-text/editable-simple-text.component"
import { EditableShadedTextComponent } from "../editable-elements/editable-shaded-text/editable-shaded-text.component"
import { EditableInfoBlockComponent } from "../editable-elements/editable-info-block/editable-info-block.component"
import { EditableIconTextComponent } from "../editable-elements/editable-icon-text/editable-icon-text.component"
import { EditableChipListComponent } from "../editable-elements/editable-chip-list/editable-chip-list.component"
import { EditableIframeComponent } from "../editable-elements/editable-iframe/editable-iframe.component"
import { EditableVideoComponent } from "../editable-elements/editable-video/editable-video.component"
import { ImageSelectorComponent } from "../image-selector/image-selector.component"

@Component({
  selector: "app-drop-zone",
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    WorkspaceElementComponent,
    EditableTitleComponent,
    EditableSubtitleComponent,
    EditableSimpleTextComponent,
    EditableShadedTextComponent,
    EditableInfoBlockComponent,
    EditableIconTextComponent,
    EditableChipListComponent,
    EditableIframeComponent,
    EditableVideoComponent,
    ImageSelectorComponent,
  ],
  template: `
    <div 
      class="mt-8 min-h-96 border-2 border-dashed rounded-lg p-6 transition-colors"
      [ngClass]="isHovering ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'"
      cdkDropList
      [cdkDropListData]="droppedElements$ | async"
      (cdkDropListDropped)="onDrop($event)"
      (cdkDropListEntered)="onDragEnter()"
      (cdkDropListExited)="onDragExit()"
      cdkDropListConnectedTo="draggable-list"
    >
      <div *ngIf="(droppedElements$ | async)?.length === 0; else elementsTemplate" 
           class="text-center text-gray-500 py-12">
        <p class="text-lg font-medium">Arrastra elementos aquí para construir tu página</p>
        <p class="text-sm mt-2">Los elementos se agregarán automáticamente abajo</p>
      </div>

      <ng-template #elementsTemplate>
        <div class="space-y-2">
          <!-- Mensaje cuando está en hover -->
          <div *ngIf="isHovering" 
               class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 font-semibold">
            📍 AGREGANDO AL FINAL (posición {{ (droppedElements$ | async)?.length }})
          </div>

          <app-workspace-element 
            *ngFor="let element of droppedElements$ | async; trackBy: trackByFn"
            [element]="element"
            (remove)="removeElement(element.id)"
            cdkDrag
            [cdkDragData]="element"
          >
            <ng-container [ngSwitch]="element.elementType">
              <app-editable-title 
                *ngSwitchCase="'primary-heading'"
                [content]="element.content || ''"
                (contentChange)="updateElement(element.id, { content: $event })"
              ></app-editable-title>
              
              <app-editable-subtitle 
                *ngSwitchCase="'subheading'"
                [content]="element.content || ''"
                (contentChange)="updateElement(element.id, { content: $event })"
              ></app-editable-subtitle>
              
              <app-editable-simple-text 
                *ngSwitchCase="'simple-text'"
                [content]="element.content || ''"
                (contentChange)="updateElement(element.id, { content: $event })"
              ></app-editable-simple-text>

              <app-editable-shaded-text 
                *ngSwitchCase="'shaded-text'"
                [content]="element.content || ''"
                (contentChange)="updateElement(element.id, { content: $event })"
              ></app-editable-shaded-text>

              <app-editable-info-block 
                *ngSwitchCase="'info-block'"
                [content]="element.content || ''"
                (contentChange)="updateElement(element.id, { content: $event })"
              ></app-editable-info-block>

              <app-editable-icon-text 
                *ngSwitchCase="'icon-text'"
                [content]="element.content || ''"
                [iconName]="element.iconName || 'Estrella'"
                (contentChange)="updateElement(element.id, { content: $event })"
                (iconChange)="updateElement(element.id, { iconName: $event })"
              ></app-editable-icon-text>

              <app-editable-chip-list 
                *ngSwitchCase="'chip-list'"
                [chips]="element.chips || []"
                (chipsChange)="updateElement(element.id, { chips: $event })"
              ></app-editable-chip-list>

              <app-editable-iframe 
                *ngSwitchCase="'iframe'"
                [src]="element.src || ''"
                (srcChange)="updateElement(element.id, { src: $event })"
              ></app-editable-iframe>

              <app-editable-video 
                *ngSwitchCase="'video'"
                [videoUrl]="element.videoUrl || ''"
                (videoUrlChange)="updateElement(element.id, { videoUrl: $event })"
              ></app-editable-video>

              <app-image-selector 
                *ngSwitchCase="'image'"
                [imageUrl]="element.imageUrl || ''"
                (imageUrlChange)="updateElement(element.id, { imageUrl: $event })"
              ></app-image-selector>

              <div *ngSwitchDefault [ngClass]="element.color" class="p-4 rounded-lg">
                <span class="font-medium">{{ element.name }}</span>
              </div>
            </ng-container>
          </app-workspace-element>
        </div>
      </ng-template>
    </div>
  `,
})
export class DropZoneComponent implements OnInit {
  droppedElements$: Observable<DroppedElement[]>
  isHovering = false

  constructor(private editorService: EditorService) {
    this.droppedElements$ = this.editorService.droppedElements$
  }

  ngOnInit(): void {}

  onDrop(event: CdkDragDrop<DroppedElement[] | DraggableElement[]>): void {
    if (event.previousContainer === event.container) {
      // Reordenar dentro del mismo contenedor
      const data = event.container.data as DroppedElement[]
      moveItemInArray(data, event.previousIndex, event.currentIndex)
      this.editorService.reorderElement(event.previousIndex, event.currentIndex)
    } else {
      // Agregar nuevo elemento desde la paleta
      const draggedElement = event.previousContainer.data[event.previousIndex] as DraggableElement
      this.editorService.addElement(draggedElement, event.currentIndex)
    }
  }

  onDragEnter(): void {
    this.isHovering = true
  }

  onDragExit(): void {
    this.isHovering = false
  }

  updateElement(id: number, updates: Partial<DroppedElement>): void {
    this.editorService.updateElement(id, updates)
  }

  removeElement(id: number): void {
    this.editorService.removeElement(id)
  }

  trackByFn(index: number, item: DroppedElement): number {
    return item.id
  }
}
