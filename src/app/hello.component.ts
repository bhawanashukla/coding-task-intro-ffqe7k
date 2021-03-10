import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Task</h1>`,
  styles: [`h1 { font-family: Lato;color:#445660; text-align:center; text-decoration: underline }`]
})
export class HelloComponent  {
  @Input() name: string;
}
