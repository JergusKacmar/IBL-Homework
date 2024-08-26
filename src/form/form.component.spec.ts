import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { IBL_QUERY_ID, IBL_QUERY_METHOD } from '../api/api.model';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.form;
    expect(form).toBeTruthy();
    expect(form.get('reportTypes.metar')?.value).toBe(false);
    expect(form.get('reportTypes.sigmet')?.value).toBe(false);
    expect(form.get('reportTypes.taf')?.value).toBe(false);
    expect(form.get('firs')?.value).toBe('');
  });

  it('should validate that at least one checkbox is checked', () => {
    const reportTypes = component.form.get('reportTypes');
    reportTypes?.get('metar')?.setValue(false);
    reportTypes?.get('sigmet')?.setValue(false);
    reportTypes?.get('taf')?.setValue(false);
    expect(reportTypes?.valid).toBe(false);

    reportTypes?.get('metar')?.setValue(true);
    expect(reportTypes?.valid).toBe(true);
  });

  it('should validate that each airport code is exactly 4 characters long', () => {
    const firs = component.form.get('firs');
    firs?.setValue('ABCD');
    expect(firs?.valid).toBe(true);

    firs?.setValue('ABCDE');
    expect(firs?.valid).toBe(false);

    firs?.setValue('ABC');
    expect(firs?.valid).toBe(false);
  });

  it('should emit form payload on submit if form is valid', () => {
    jest.spyOn(component.formPayloadEmitter, 'emit');

    component.form.get('reportTypes.metar')?.setValue(true);
    component.form.get('firs')?.setValue('ABCD');
    component.attemptedSubmit = true;

    component.submit();

    expect(component.formPayloadEmitter.emit).toHaveBeenCalledWith({
      id: IBL_QUERY_ID,
      method: IBL_QUERY_METHOD,
      params: [{ id: 'ABCD', reportTypes: ['METAR'], firs: ['ABCD'] }],
    });
  });

  it('should not emit form payload on submit if form is invalid', () => {
    jest.spyOn(component.formPayloadEmitter, 'emit');

    component.form.get('reportTypes.metar')?.setValue(false);
    component.form.get('firs')?.setValue('ABCD');
    component.attemptedSubmit = true;

    component.submit();

    expect(component.formPayloadEmitter.emit).not.toHaveBeenCalled();
  });
});