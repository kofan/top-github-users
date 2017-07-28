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

        // Using concatMap we create a stream
        // where before every clickEvent item, null item will be emitted
        // For example:
        //   --refreshClickEvent---refreshClickEvent---refreshClickEvent->
        // will become
        //   --null-refreshClickEvent---null-refreshClickEvent---null-refreshClickEvent->
        .concatMap(clickEvent => Observable.of(null, clickEvent)),
    )
    .mergeMap((clickEvent) => {
      if (clickEvent !== null) {
        // This will be an observable which emits a single item - an array of users
        return Observable.fromPromise(topUsersApi.fetchMoreUsers());
      }

      // This will be an observable which emits a single item - an array of null
      return Observable.of([null]);
    })

    // If no users returned then we want to complete the Observable
    .takeWhile(listOfUsers => listOfUsers.length !== 0)

    // Now we need to concat all arrays emitted at the previous step
    // For example:
    //   --[u1, u2, u3]--[u4, u5]----[null]---[u6, u7, u8, u9]-->
    // will become
    //   --u1-u2-u3--u4-u5----null---u6-u7-u8-u9-->
    .concatAll();
}
