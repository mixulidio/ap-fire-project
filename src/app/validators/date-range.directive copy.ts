import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

/** A hero's name can't match the hero's alter ego */
export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dtInicial = control.get('dtInicial');
  const dtFinal = control.get('dtFinal');

  return dtInicial && dtFinal && dtInicial.value > dtFinal.value ? { dateRangeValidator: true } : null;
};
