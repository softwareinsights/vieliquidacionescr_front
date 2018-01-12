import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'tallersDataFilter'
})
export class TallersFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.nombre.indexOf(query) > -1);
        }
        return array;
    }
}
