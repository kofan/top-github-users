import topUser from './topUser.handlebars';
import './topUsersView.scss';

const topUsersList = document.getElementById('top-users-list');

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

export const fetchButton = document.getElementById('fetch-users');
export const refreshButton = document.getElementById('refresh-users');
