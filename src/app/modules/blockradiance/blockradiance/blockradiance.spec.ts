import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blockradiance } from './blockradiance';

describe('Blockradiance', () => {
  let component: Blockradiance;
  let fixture: ComponentFixture<Blockradiance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blockradiance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blockradiance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
