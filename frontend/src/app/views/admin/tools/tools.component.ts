import {  Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolModalComponent } from 'src/app/components/tool-modal/tool-modal.component';
import { ToolService } from 'src/Services/tool.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
})
export class ToolsComponent implements OnInit{
  tools:any=[]

  constructor(private dialog:MatDialog,private toolService:ToolService) {}
  ngOnInit(): void {
    this.toolService.getAllTools().subscribe((tools) => {
      this.tools=tools
    })
  }

  // Ouvre le modal
  addNew() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(ToolModalComponent,dialogConfig);
        dialogRef.afterClosed().subscribe((data)=>{
          if(data){
            this.toolService.add(data).subscribe(()=>{
              this.tools.push(data)
            })
          }
        })
  }
  handleEdit(eventData: any, tool: any) {
    // console.log('Edit Event Data:', eventData);
    // console.log('Tool to Edit:', tool);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { tool };
    const dialogRef = this.dialog.open(ToolModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedTool) => {
      if (updatedTool) {
        console.log(updatedTool)
        this.toolService.edit(updatedTool.id,updatedTool).subscribe(()=>{
          const index = this.tools.findIndex((t: { id: any; }) => t.id === tool.id);
        if (index !== -1) {
          this.tools[index] = updatedTool;
        }
        })
        
      }
    });
  }

  // Gère la suppression
  handleDelete(eventData: any, tool: any) {
    // console.log('Delete Event Data:', eventData);
    // console.log('Tool to Delete:', tool.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this tool!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.toolService.delete(tool.id).subscribe(() => {
              this.tools = this.tools.filter((t: { id: any; }) => t.id !== tool.id);
        });
      }
    });
    // if (confirm(`Are you sure you want to delete ${tool.Source}?`)) {
    //   
    // }
  }
open() {
throw new Error('Method not implemented.');
}

}
