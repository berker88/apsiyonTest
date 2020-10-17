import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListPageComponent } from './content-list-page.component';

describe('ContentListPageComponent', () => {
  let component: ContentListPageComponent;
  let fixture: ComponentFixture<ContentListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
