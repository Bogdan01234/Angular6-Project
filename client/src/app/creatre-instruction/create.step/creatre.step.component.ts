import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';




@Component({
  selector: 'abe-creatre-step',
  templateUrl: './creatre.step.instruction.component.html',
  styleUrls: ['./creatre.step.instruction.component.scss']
})
export class CreatreInstructionComponent implements OnInit {


  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'howtodo', uploadPreset: 'r7izmizp' })
  );

  name = new FormControl('', Validators.required );
  description = new FormControl('', Validators.required );
  img = new FormControl('', Validators.required );

  constructor() { }


  ngOnInit() {
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
}
