import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'enumToDesc',
})
export class EnumToDescPipe implements PipeTransform {
  transform(value: any, args: any) {
    // const enu = Object.create(window[args].prototype)
    return args[value];
  }
  // enum object on which you want this pipe to work
  // transform(value: number, enum: any): any {
    // return Object.values(value)[args];
  //     return Object.values(enum)[value];
  // }
}
