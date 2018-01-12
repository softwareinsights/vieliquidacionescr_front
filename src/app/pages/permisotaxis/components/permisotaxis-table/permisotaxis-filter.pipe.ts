import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'permisotaxisDataFilter'
})
export class PermisotaxisFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.numero.indexOf(query) > -1);
        }
        return array;
    }
}
