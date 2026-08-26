import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreeCanvasComponent } from './three-canvas.component';

describe('ThreeCanvasComponent', () => {
  let component: ThreeCanvasComponent;
  let fixture: ComponentFixture<ThreeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeCanvasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThreeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state true', () => {
    expect(component.isLoading()).toBe(true);
  });

  it('should switch active topology', () => {
    component.setTopology('mesh');
    expect(component.activeTopology()).toBe('mesh');
  });
});
