// src/app/shared/loader/loader.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {}