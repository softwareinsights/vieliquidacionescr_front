import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'orden_has_refaccionsDataFilter'
})
export class Orden_has_refaccionsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
        }
        return array;
    }
}
