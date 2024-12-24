import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {
  members:Member[]=[]
  isOpen=false
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private memberService:MemberService) {}

  ngOnInit(): void {
    this.memberService.getAllMembers().subscribe((members)=>{
      this.members=members
    })
  }
  open(){
    this.isOpen=!this.isOpen
  }
}
