import { Component, OnInit, ViewChild } from '@angular/core';
// import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Categories, Appload } from '../interfase/index'
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomCompileService } from '../custom-compile-service/index';

import { DragAndDropModule } from 'angular-draggable-droppable';

import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {CloudinaryImageComponent} from 'ng2-cloudinary';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CreatreStepComponent } from './create.step/creatre.step.component';

// import { NavController } from 'ionic-angular';




@Component({
  selector: 'abe-creatre-instruction',
  templateUrl: './creatre-instruction.component.html',
  styleUrls: ['./creatre-instruction.component.scss']
})
export class CreatreInstructionComponent implements OnInit {

  // @ViewChild(CreatreStepComponent)
  // childStepForm: CreatreStepComponent;

  hidden: boolean[];
  imageId: string;


  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'howtodo', uploadPreset: 'r7izmizp' })
  );

  categories: Categories[] = [
    {value:'Cars & Other Vehicles'},
    {value:'Computers and Electronics'},
    {value:'Sport & Fitness'},
    {value:'Family Life'},
    {value:'Auto'},
    {value:'Food and Entertaining'},
    {value:'Health'},
    {value:'Hobbies and Crafts'},
    {value:'Pets and Animals'},
    {value:'Sports and Fitness'},
    {value:'Other'}
  ]; 

  
  public counter: number = 0;
  
  public mainForm: FormGroup;
  // public childStepForm: FormGroup;
  public instruction: Appload [] = []; 
  // public allFiles: UploadFile[] = [];
  // public files: UploadFile[] = [];
  public step: Node;

  constructor(private formBuilder: FormBuilder) {  }

  

  // @ViewChild('cmp')


  ngOnInit() {

    this.mainForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category:['', Validators.required],
      img: ['']
    }); 

    this.instruction.push(this.mainForm.value);

    console.log(this.mainForm);
    // this.step = document.getElementById("step").cloneNode(true);    
  }
  
 
  // sadasd: CreatreStepComponent;

  public addNewStep(stepForm1, event){
    // this.instruction.push(this.mainForm.value);
    debugger
    this.counter++;
    this.instruction.push(stepForm1.value);

    console.log(this.instruction, "1");
  }

  public createInstruction(stepForm1){
    debugger
    this.instruction.push(stepForm1.value);
    
    console.log(this.instruction, "EEEEEEE");
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
    this.mainForm.value.img = this.allFiles;
  } 

}
