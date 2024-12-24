import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MemberModalComponent } from "src/app/components/member-modal/member-modal.component";
import { Member } from "src/Models/Member";
import { MemberService } from "src/Services/member.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
})
export class MembersAdminComponent implements OnInit {

  professors: Member[] = [];
  students: Member[] = [];
  members:Member[]=[]
  constructor(private memberService: MemberService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getAllMembers().subscribe((data: Member[]) => {
      this.members=data;
      this.professors = data.filter(member => member.type === 'Professor');
      this.students = data.filter(member => member.type === 'Student');
    });
  }
  handleEdit(member: Member,type:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { type,member };
    const dialogRef = this.dialog.open(MemberModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedMember) => {
      if (updatedMember) {
        this.memberService.edit(updatedMember.id,updatedMember).subscribe(()=>{
          const index = this.members.findIndex((m: { id: any; }) => m.id === updatedMember.id);
        if (index !== -1) {
          this.members[index] = updatedMember;
          this.professors = this.members.filter((member: { type: string; }) => member.type === 'Professor');
          this.students = this.members.filter((member: { type: string; }) => member.type === 'Student');
        }
        })
      }
    });
  }

  handleDelete(member: Member) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.memberService.delete(member.id).subscribe(() => {
          this.students = this.students.filter(m => m.id !== member.id);
          this.professors = this.professors.filter(m => m.id !== member.id);
          this.members = this.members.filter(m => m.id !== member.id);
        });
      }
    });



  }
    addNew(type:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { type };
      let dialogRef = this.dialog.open(MemberModalComponent,dialogConfig);
          dialogRef.afterClosed().subscribe((data)=>{
            if(data){
              this.memberService.add(data).subscribe(()=>{
                this.members.push(data)
                if(type=="Student"){
                  this.students.push(data)
                }
                if(type=="Professor"){
                  this.professors.push(data)

                }
              })
            }
          })
    }
}
