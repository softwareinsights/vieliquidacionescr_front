import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'enviotallersDataFilter'
})
export class EnviotallersFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idenviotaller.indexOf(query) > -1);
        }
        return array;
    }
}
