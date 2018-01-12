import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'mecanicosDataFilter'
})
export class MecanicosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idmecanico.indexOf(query) > -1);
        }
        return array;
    }
}