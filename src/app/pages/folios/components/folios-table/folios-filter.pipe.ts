import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'foliosDataFilter'
})
export class FoliosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idfolio.indexOf(query) > -1);
        }
        return array;
    }
}
