import { Component } from "@angular/core"

@Component({
  selector: "app-editor-sidebar",
  standalone: true,
  template: `
    <div class="max-w-md">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Editor</h1>

      <div class="flex items-center gap-2 mb-6">
        <a href="#" class="text-blue-500 hover:text-blue-600 flex items-center gap-1">
          Abrir manual
          <span class="text-sm">→</span>
        </a>
        <span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-medium ml-auto">Editando</span>
      </div>
    </div>
  `,
})
export class EditorSidebarComponent {}
