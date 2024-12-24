import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pub-modal',
  templateUrl: './pub-modal.component.html',
})
export class PubModalComponent implements OnInit{
  form !:FormGroup
  submitted: boolean = false;
  action="Add"
  constructor(
    public dialogRef: MatDialogRef<PubModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    if(this.data){
      this.action="Edit"
    }
    this.form = this.fb.group({
      id: [this.data?.pub?.id || '6'],
      title: [this.data?.pub?.title || '', Validators.required],
      type: [this.data?.pub?.type || '', Validators.required],
      date: [this.data?.pub?.date || '', Validators.required],
      pdf: [this.data?.pub?.pdf || '', Validators.required],
      member:[this.data?.pub?.member || '']
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0].name;
      this.form.get('pdf')?.setValue(file); // Met à jour la valeur avec l'objet File
    }
  }
  
  shouldShowError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (this.submitted || field.touched );
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.submitted = false;
      this.dialogRef.close(this.form.value);
    } else {
      console.log('Formulaire invalide');
    }
  }
}
