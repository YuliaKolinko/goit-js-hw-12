import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

let currentPage = 1;
export async function responseData(requestWords, additionalParams = {}) {
  const requestParams = {
    key: '49149625-6c85390ad8fbd016bc28c7d7b',
    q: requestWords,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
    ...additionalParams,
  };
  try {
    const response = await axios.get('', { params: requestParams });
    currentPage += 1;
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error);
    throw error;
  }
}
// Скидаємо значення сторінки до 1
export function resetPage() {
  currentPage = 1;
}
