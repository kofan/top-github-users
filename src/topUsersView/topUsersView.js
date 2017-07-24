import topUser from './topUser.handlebars';
import './topUsersView.scss';

const topUsersList = document.getElementById('top-users-list');

export const fetchButton = document.getElementById('fetch-users');
export const refreshButton = document.getElementById('refresh-users');

/**
 * Render the user
 * @param {object} user
 */
export function renderUser(user) {
  if (!user) {
    topUsersList.innerHTML = '';
    return;
  }

  const topUserItem = document.createElement('li');
  topUserItem.innerHTML = topUser(user);
  topUsersList.appendChild(topUserItem);
}

/**
 * All users have been fetched, now we want to disable the actions on the list
 */
export function disableActions() {
  fetchButton.disabled = true;
  refreshButton.disabled = true;

  document.getElementById('no-more-users').style.display = 'block';
}

