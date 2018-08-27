import { Component, OnInit, ViewChild } from '@angular/core';
import { Categories, Appload } from '../interfase/index'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from '../_services/all.service';
import { UserService} from '../_services/user.service';
import { UploadFile, UploadEvent, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { User } from '../_models/index';




@Component({
  selector: 'abe-creatre-instruction',
  templateUrl: './creatre-instruction.component.html',
  styleUrls: ['./creatre-instruction.component.scss']
})

export class CreatreInstructionComponent implements OnInit {
  
  currentUser: User;
  hidden: boolean [] = [];
  imageId: string;

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

  
  public mainForm: FormGroup;
  public instruction: Appload [] = [];
  public step: Node;

  constructor(private allService: AllService, private formBuilder: FormBuilder) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  ngOnInit() {

    this.mainForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category:['', Validators.required],
      img: ['']
    });   

    this.instruction.push(this.mainForm.value);   
  }

  public addNewStep(stepForm1){
    this.instruction.push(stepForm1.value);
    console.log(this.instruction, "1");
  }

  public createInstruction(stepForm1){
    this.instruction.shift();
    this.instruction.unshift(this.mainForm.value);
    this.instruction[0].username = this.currentUser.username;    
    this.instruction.push(stepForm1.value);    
    this.allService.addPosts(this.instruction);
    console.log(this.instruction);
    // alert("Instruction created");
    // window.location.reload();
  }

  public files: UploadFile[] = [];
  public allFiles: UploadFile[] = [];
  

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {        
        this.allFiles.push(droppedFile);
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }   
    this.mainForm.value.img = this.allFiles;
  } 

}
