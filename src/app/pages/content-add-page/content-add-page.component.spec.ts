import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAddPageComponent } from './content-add-page.component';

describe('ContentAddPageComponent', () => {
  let component: ContentAddPageComponent;
  let fixture: ComponentFixture<ContentAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
