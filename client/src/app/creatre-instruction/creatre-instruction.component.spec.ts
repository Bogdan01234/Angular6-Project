import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatreInstructionComponent } from './creatre-instruction.component';

describe('CreatreInstructionComponent', () => {
  let component: CreatreInstructionComponent;
  let fixture: ComponentFixture<CreatreInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatreInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatreInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
