// import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

// export function creatDateRangeValidator(): ValidatorFn {

//   return (form: FormGroup): ValidationErrors | null => {

//       const start:Date = form.get("startAt").value;

//       const end:Date = form.get("endAt").value;

//       if (start && end) {
//           const isRangeValid = (end.getTime() - start.getTime() > 0);

//           return isRangeValid ? null : {dateRange:true};
//       }
//       return null;
//   }
// }
