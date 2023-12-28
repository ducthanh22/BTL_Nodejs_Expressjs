import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducesComponent } from './produces.component';

describe('ProducesComponent', () => {
  let component: ProducesComponent;
  let fixture: ComponentFixture<ProducesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducesComponent]
    });
    fixture = TestBed.createComponent(ProducesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
