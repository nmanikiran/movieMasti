import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedComponent } from './top-rated.component';

describe('TopRatedComponent', () => {
  let component: TopRatedComponent;
  let fixture: ComponentFixture<TopRatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
