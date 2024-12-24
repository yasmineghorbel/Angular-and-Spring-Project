import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Member } from "src/Models/Member";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  typeMember="" ;
  constructor() {}

  ngOnInit(): void {}
  @Input() items: Member[] = [];
  @Input()
  get type():string{
    return this.typeMember 
  } 
  set type(type: string) {
    this.typeMember = type;
  }
  @Output() edit = new EventEmitter<Member>();  // Sortie pour l'édition
  @Output() delete = new EventEmitter<Member>(); // Sortie pour la suppression
  @Output() add = new EventEmitter<String>();
  // Exemple d'un membre
  members: Member[] = [];

  onEdit(eventData: any,member: Member) {
    this.edit.emit(member);  
  }

  onDelete(eventData: any,member: Member) {
    this.delete.emit(member); 
  }
  addNew() {
    this.add.emit();  
  }
  // private _color = "light";
  
  
    open() {
    throw new Error('Method not implemented.');
    }
}
