import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
})
export class MemberModalComponent implements OnInit{
  form !:FormGroup
  submitted: boolean = false;
  action="Add"
  type:any
  constructor(
    public dialogRef: MatDialogRef<MemberModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.type=this.data.type
  }
  
  ngOnInit(): void {
    this.action = this.data.member ? "Edit" : "Add";
    this.form = this.fb.group({
      id: [this.data?.member?.id || '5', Validators.required],
      cin: [this.data?.member?.cin || '', [Validators.required]],
      name: [this.data?.member?.name || '', Validators.required],
      cv: [this.data?.member?.cv || '', Validators.required],
      type: [this.data?.member?.type || '', Validators.required],
      birthDate: [this.data?.member?.birthDate || '', Validators.required],
      pic: [this.data?.member?.pic || '', Validators.required],
      email: [this.data?.member?.email || '',[Validators.required, Validators.email]],
      dateInscription: [this.data?.member?.dateInscription || '', Validators.required],
      diploma: [this.data?.member?.diploma || '',Validators.required],
      grade: [this.data?.member?.grade || '', Validators.required],
      establishment: [this.data?.member?.establishment || '', Validators.required]
    });

    this.updateChildControls();
  }

  updateChildControls(): void {
    const typeControl = this.form.get('type');
    typeControl?.valueChanges.subscribe((type) => {
      if (type === 'Student') {
        this.form.get('grade')?.clearValidators();
        this.form.get('establishment')?.clearValidators();
      } else if (type === 'Professor') {
        this.form.get('dateInscription')?.clearValidators();
        this.form.get('diploma')?.clearValidators();
      } else {
        this.clearAllChildValidators();
      }

      this.form.get('dateInscription')?.updateValueAndValidity();
      this.form.get('diploma')?.updateValueAndValidity();
      this.form.get('grade')?.updateValueAndValidity();
      this.form.get('establishment')?.updateValueAndValidity();
      console.log(this.form)
    });
  }

  clearAllChildValidators(): void {
    this.form.get('dateInscription')?.clearValidators();
    this.form.get('diploma')?.clearValidators();
    this.form.get('grade')?.clearValidators();
    this.form.get('establishment')?.clearValidators();
  }
  onFileSelected(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const fileName = file.name;
      this.form.get(fieldName)?.setValue(fileName); // Met à jour la valeur du champ spécifié
    } else {
      this.form.get(fieldName)?.setValue(''); // Réinitialise la valeur si aucun fichier n'est sélectionné
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