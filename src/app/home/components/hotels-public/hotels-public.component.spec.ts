import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsPublicComponent } from './hotels-public.component';

describe('HotelsPublicComponent', () => {
  let component: HotelsPublicComponent;
  let fixture: ComponentFixture<HotelsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
