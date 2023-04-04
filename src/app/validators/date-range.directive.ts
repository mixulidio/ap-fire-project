import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

/** A hero's name can't match the hero's alter ego */
export function dateRangeValid(dtIni:string, dtFim: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dtInicial = control.get(dtIni);
    const dtFinal = control.get(dtFim);

    return dtInicial && dtFinal && dtInicial.value > dtFinal.value ? { dateRangeValid: true } : null;
  };
}
