import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PubModalComponent } from 'src/app/components/pub-modal/pub-modal.component';
import { PubService } from 'src/Services/pub.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pubs',
  templateUrl: './pubs.component.html',
})
export class PubsComponent {
pubs:any=[]

  constructor(private dialog:MatDialog,private pubService:PubService) {}
  ngOnInit(): void {
    this.pubService.getAllPubs().subscribe((pubs) => {
      this.pubs=pubs
    })
  }

  // Ouvre le modal
  addNew() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(PubModalComponent,dialogConfig);
        dialogRef.afterClosed().subscribe((data)=>{
          if(data){
            this.pubService.add(data).subscribe(()=>{
              this.pubs.push(data)
            })
          }
        })
  }
  handleEdit(eventData: any, pub: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { pub };
    const dialogRef = this.dialog.open(PubModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedTool) => {
      if (updatedTool) {
        console.log(updatedTool)
        this.pubService.edit(updatedTool.id,updatedTool).subscribe(()=>{
          const index = this.pubs.findIndex((p: { id: any; }) => p.id === pub.id);
        if (index !== -1) {
          this.pubs[index] = updatedTool;
        }
        })
        
      }
    });
  }

  // Gère la suppression
  handleDelete(eventData: any, pub: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this publication!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.pubService.delete(pub.id).subscribe(() => {
              this.pubs = this.pubs.filter((p: { id: any; }) => p.id !== pub.id);
        });
      }
    });

  }
open() {
throw new Error('Method not implemented.');
}

}
