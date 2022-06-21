import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionselectComponent } from './optionselect.component';

describe('OptionselectComponent', () => {
  let component: OptionselectComponent;
  let fixture: ComponentFixture<OptionselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
