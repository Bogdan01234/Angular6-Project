import { Component, OnInit } from '@angular/core';
// import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Categories } from '../interfase/index'
import { FormControl, Validators } from '@angular/forms';
import { CustomCompileService } from '../custom-compile-service/index';

import { DragAndDropModule } from 'angular-draggable-droppable';

import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {CloudinaryImageComponent} from 'ng2-cloudinary';

// import { NavController } from 'ionic-angular';




@Component({
  selector: 'abe-creatre-instruction',
  templateUrl: './creatre-instruction.component.html',
  styleUrls: ['./creatre-instruction.component.scss']
})
export class CreatreInstructionComponent implements OnInit {

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

  
  public counter: number;

  // public allFiles: UploadFile[] = [];
  // public files: UploadFile[] = [];
  public step: Node;

  constructor() { 
      // this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      // let res: any = JSON.parse(response);
      // this.imageId = res.public_id;
      // return { item, response, status, headers };
    // };
  }

  name = new FormControl('', Validators.required );
  category = new FormControl('', Validators.required );
  description = new FormControl('', Validators.required );

  ngOnInit() {
    this.step = document.getElementById("step").cloneNode(true);
    this.counter = 1;
  }

  upload() {
    this.uploader.uploadAll();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }





  public addNewStep() : void {   

    let temp = this.step.cloneNode(true);
    this.counter++;
    temp.firstChild.firstChild.textContent = "Step" + " " + this.counter;
    // debugger
    document.getElementById('addNewStep').parentElement.insertBefore(temp,document.getElementById('addNewStep'));
    let fileDrops = document.getElementsByName('file-drop');
    // for(let i = 0; i < fileDrops.length; i++){
    //   fileDrops[i].addEventListener('FileDrop', this.dropped);
     
    // }

  }

}
