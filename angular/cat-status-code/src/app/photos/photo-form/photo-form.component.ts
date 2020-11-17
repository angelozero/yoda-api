import { PhotoService } from './../service/photo-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(private formBuilder: FormBuilder, private photoService: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    // Este metodo "this.photoForm.getRawValue();" traz todas as propriedades de uma unica vez do formulario
    // const photoFormData = this.photoForm.getRawValue();
    // photoFormData.file = this.file;
    // this.photoService
    //   .upload(photoFormData.description, photoFormData.allowComments, photoFormData.file)
    //   .subscribe(() => this.router.navigate(['']))

    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']))
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
    console.log("FIM")
  }
}
