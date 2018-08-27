import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';




@Component({
  selector: 'abe-creatre-step',
  templateUrl: './creatre.step.component.html',
  styleUrls: ['./creatre.step.component.scss']
})
export class CreatreStepComponent implements OnInit {

   stepForm1: FormGroup; 

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.stepForm1 = this.formBuilder.group({
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
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }

    this.stepForm1.value.img = this.allFiles;

    console.log(this.stepForm1, "StepForm");

  }

}
