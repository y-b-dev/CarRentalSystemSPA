import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  $search: EventEmitter<string> = new EventEmitter<string>();

  search(term: string) {
    this.$search.emit(term);
  }
}
