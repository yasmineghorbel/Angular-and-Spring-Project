import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})
export class MembersComponent {
  isOpen=false
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor() {}

  ngOnInit(): void {}
  open(){
    this.isOpen=!this.isOpen
  }
}
