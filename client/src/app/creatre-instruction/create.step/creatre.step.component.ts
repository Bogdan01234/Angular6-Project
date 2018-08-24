import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';




@Component({
  selector: 'abe-creatre-step',
  templateUrl: './creatre.step.component.html',
  styleUrls: ['./creatre.step.component.scss']
})
export class CreatreStepComponent implements OnInit {


  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'howtodo', uploadPreset: 'r7izmizp' })
  );

  stepForm: FormGroup;


  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.stepForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      img: ['']
  });

  }

  public files: UploadFile[] = [];
  public allFiles: UploadFile[] = [];
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        
        this.allFiles.push(droppedFile);

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    this.stepForm.value.img = this.allFiles;

    console.log(this.stepForm);

  }
}
