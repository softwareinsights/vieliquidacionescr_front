import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'fianza_has_foliosDataFilter'
})
export class Fianza_has_foliosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
        }
        return array;
    }
}
