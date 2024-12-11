import { Pipe, PipeTransform } from '@angular/core';
import { ItemsNoPagingResp, SelectOption } from '../../types';

@Pipe({
    name: 'itemsNoPaging',
    standalone: true,
})
export class ItemsNoPagingPipe implements PipeTransform {
    transform(items: ItemsNoPagingResp): SelectOption[] {
        return items.map(item => ({
            value: item.id.toString(),
            label: item.name,
        }));
    }
}
