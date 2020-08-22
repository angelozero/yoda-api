import { Photo } from './../photo-component/photo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByDescriptionPipe'})
export class FilterByDescriptionPipe implements PipeTransform {

    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if(descriptionQuery) {
            return photos.filter(photo =>
                photo.description.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return photos;
        }
    }
}