import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'refaccionsDataFilter'
})
export class RefaccionsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.nombre.indexOf(query) > -1);
        }
        return array;
    }
}
