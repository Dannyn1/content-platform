import { Component } from "@angular/core"

@Component({
  selector: "app-header",
  standalone: true,
  template: `
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span class="text-white font-bold text-sm">C</span>
        </div>
        <span class="font-semibold text-gray-900">Chyvrid</span>
      </div>
      <div class="w-10 h-10 bg-green-500 rounded-full"></div>
    </header>
  `,
})
export class HeaderComponent {}
