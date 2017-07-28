import axios from 'axios';

const GITHUB_URL =
  'https://api.github.com/search/users?q=followers:%3E{minFollowers}+sort:followers&per_page={usersPerPage}&page={currentPage}';

const queryParams = {
  minFollowers: 1000,
  usersPerPage: 5,
  currentPage: 1,
};

/**
 * @returns {string}
 */
function buildUrl() {
  return Object.entries(queryParams).reduce(
    (url, [name, value]) => url.replace(`{${name}}`, value),
    GITHUB_URL,
  );
}

/**
 * @param {object} user
 * @returns {Promise}
 */
function getUserDetails(user) {
  return axios.get(user.url).then(({ data }) => data);
}

/**
 * The object responsible for actual fetching of the users from the GitHub API
 */
export default {
  fetchMoreUsers() {
    const url = buildUrl();
    this.skipCurrentPage();

    return axios.get(url)
      .then(({ data }) => data.items)
      .then(users => Promise.all(users.map(getUserDetails)));
  },

  skipCurrentPage() {
    queryParams.currentPage += 1;
  },

  resetCurrentPage() {
    queryParams.currentPage = 1;
  },
};
