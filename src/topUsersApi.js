import axios from 'axios';

const GITHUB_URL =
  'https://api.github.com/search/users?q=followers:%3E{min_followers}+sort:followers&per_page={per_page}&page={page}';

/**
 * The object responsible for actual fetching of the usrs from the GitHub API
 */
const topUsersApi = {
  minFollowers: 1000,
  countPerPage: 5,
  currentPage: 0,

  fetchMoreUsers() {
    const url = GITHUB_URL
      .replace('{min_followers}', this.minFollowers)
      .replace('{per_page}', this.countPerPage)
      .replace('{page}', ++this.currentPage);

    return axios.get(url)
      .then(({ data }) => data.items)
      .then(users => Promise.all(users.map(this.getUserDetails)));
  },

  getUserDetails(user) {
    return axios.get(user.url).then(({ data }) => data);
  },

  resetCurrentPage() {
    this.currentPage = 0;
  },
};

export default topUsersApi;
