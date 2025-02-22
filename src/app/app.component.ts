import { Component } from '@angular/core';
import { ThemePreviewExamplesComponent } from './components/preview-examples/preview-examples.component';

@Component({
  selector: 'app-root',
  imports: [ThemePreviewExamplesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my-app';
}
