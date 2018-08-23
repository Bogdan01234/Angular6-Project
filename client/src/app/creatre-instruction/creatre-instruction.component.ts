import { Component, OnInit } from '@angular/core';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'abe-creatre-instruction',
  templateUrl: './creatre-instruction.component.html',
  styleUrls: ['./creatre-instruction.component.scss']
})
export class CreatreInstructionComponent implements OnInit {


  public allFiles: UploadFile[] = [];
  public files: UploadFile[] = [];
  public step: Node;

  constructor() { }

  ngOnInit() {
    this.step = document.getElementById("step").cloneNode(true);
  }

  
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        
        if(this.files.length > 1){
          this.allFiles.push(droppedFile);
          break;
        }else{
          this.allFiles.push(droppedFile);
        }

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
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  public addNewStep(){

    
      
  }

}
