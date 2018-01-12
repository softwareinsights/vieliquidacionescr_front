import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'liquidacionsDataFilter'
})
export class LiquidacionsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.status.indexOf(query) > -1);
        }
        return array;
    }
}
