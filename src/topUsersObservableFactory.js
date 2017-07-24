import { Observable } from 'rxjs';
import topUsersApi from './topUsersApi';

/**
 * Create users observable stream
 * @return {Observable}
 */
export default function topUsersObservableFactory(
  fetchButton,
  refreshButton,
) {
  return Observable.fromEvent(fetchButton, 'click')
    .startWith('startup fetch click')
    .merge(
      Observable.fromEvent(refreshButton, 'click')
        .do(() => topUsersApi.resetCurrentPage())
        .concatMap(click => Observable.of(null, click)),
    )
    .mergeMap((click) => {
      if (click !== null) {
        return Observable.fromPromise(topUsersApi.fetchMoreUsers());
      }
      return Observable.of([null]);
    })
    .concatAll();
}
