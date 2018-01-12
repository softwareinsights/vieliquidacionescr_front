import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'si_reportesDataFilter'
})
export class Si_reportesFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.nombre.indexOf(query) > -1);
        }
        return array;
    }
}
