import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinInstructionComponent } from './min-instruction.component';

describe('MinInstructionComponent', () => {
  let component: MinInstructionComponent;
  let fixture: ComponentFixture<MinInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
