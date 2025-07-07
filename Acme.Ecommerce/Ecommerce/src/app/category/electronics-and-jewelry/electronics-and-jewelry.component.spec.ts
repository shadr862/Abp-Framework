import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsAndJewelryComponent } from './electronics-and-jewelry.component';

describe('ElectronicsAndJewelryComponent', () => {
  let component: ElectronicsAndJewelryComponent;
  let fixture: ComponentFixture<ElectronicsAndJewelryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicsAndJewelryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectronicsAndJewelryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
