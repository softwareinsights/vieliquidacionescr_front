import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'boni_has_liquisDataFilter'
})
export class Boni_has_liquisFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
        }
        return array;
    }
}
