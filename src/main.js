import topUsersObservableFactory from './topUsersObservableFactory';
import { renderUser, fetchButton, refreshButton } from './topUsersView/topUsersView';

/**
 * Start listening for coming users
 */
topUsersObservableFactory(fetchButton, refreshButton).subscribe(
  (user) => {
    renderUser(user);
  },
  (error) => {
    console.error(error); // eslint-disable-line no-console
  },
);
