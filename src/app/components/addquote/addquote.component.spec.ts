import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquoteComponent } from './addquote.component';

describe('AddquoteComponent', () => {
  let component: AddquoteComponent;
  let fixture: ComponentFixture<AddquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddquoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
