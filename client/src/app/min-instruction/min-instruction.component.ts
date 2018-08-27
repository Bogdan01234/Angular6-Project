import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../_models/index';

@Component({
  selector: 'abe-min-instruction',
  templateUrl: './min-instruction.component.html',
  styleUrls: ['./min-instruction.component.scss']
})
export class MinInstructionComponent implements OnInit {


  @Input() postCards: Post[];

  constructor() { }

  ngOnInit() {
  }

}
