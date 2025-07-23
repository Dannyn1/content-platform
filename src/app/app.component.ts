import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "./components/header/header.component"
import { EditorSidebarComponent } from "./components/editor-sidebar/editor-sidebar.component"
import { DraggableElementsComponent } from "./components/draggable-elements/draggable-elements.component"
import { DropZoneComponent } from "./components/drop-zone/drop-zone.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HeaderComponent, EditorSidebarComponent, DraggableElementsComponent, DropZoneComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>
      <div class="flex">
        <div class="flex-1 p-6">
          <app-editor-sidebar></app-editor-sidebar>
          <app-drop-zone></app-drop-zone>
        </div>
        <app-draggable-elements></app-draggable-elements>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = "chyvrid-editor"
}
