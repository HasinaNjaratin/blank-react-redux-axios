import axios from "axios";

const api_url = 'http://blabla/ws';

export default {
  user: {
    login: (data) => {
      return axios
        .post(api_url + '/user/myuser_login?_format=json', JSON.stringify(data))
        .then(response => response.data)
    },
    logout: () => {
      return axios
        .post(api_url + '/user/myuser_logout?_format=json&wild='+Date.now())
        .then((response) => {
          return response;
        })
    },
    getUser: (data) => {
      return axios
      .get(api_url + '/rest/getuser/'+data)
      .then(response => response.data)
    },
  },
};
