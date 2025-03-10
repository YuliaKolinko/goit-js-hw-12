import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export function responseData(requestWords, additionalParams = {}) {
  const requestParams = {
    key: '49149625-6c85390ad8fbd016bc28c7d7b',
    q: requestWords,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    ...additionalParams,
  };

  return axios
    .get('', {
      params: requestParams,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}
