import topUsersObservableFactory from './topUsersData/topUsersObservableFactory';

import {
  renderUser,
  disableActions,
  fetchButton,
  refreshButton,
} from './topUsersView/topUsersView';

/**
 * Start listening for coming users
 */
topUsersObservableFactory(fetchButton, refreshButton).subscribe(
  /* onNext: */ (user) => {
    renderUser(user);
  },
  /* onNext: */(error) => {
    console.error(error); // eslint-disable-line no-console
  },
  /* onComplete: */() => {
    disableActions();
  },
);
