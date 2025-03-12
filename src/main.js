// iziToast імпорт бібліотеки
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// loaders імпорт бібліотеки
import 'loaders.css/loaders.min.css';
// Імпорт функцій
import { responseData, resetPage } from './js/pixabay-api';
import {
  renderImages,
  clearGallery,
  refreshLightbox,
} from './js/render-functions';
// Імпорт іконок
import iconSvgError from './img/icon/Group.png';

const form = document.querySelector('.form');
const loaderElement = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const errorMesage = {
  message:
    'Sorry, there are no images matching your search query.Please try again!',
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: iconSvgError,
};
const endOfSearch = {
  message: "We're sorry, but you've reached the end of search results.",
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: iconSvgError,
};

form.addEventListener('submit', searchImages);
loadMoreBtn.addEventListener('click', loadMoreImages);
let totalHits = 0;
let loadedImages = 0;
let query = '';
// Обробляємо подію відправки форми, та відображаємо знайдені зображення в галереї
async function searchImages(event) {
  // Відміняємо дію за замовченням
  event.preventDefault();
  // Перевірка введеного тексту
  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    return;
  }
  // Показуємо лоадер
  loaderElement.classList.remove('visually-hidden');
  // Очищаємо галерею
  clearGallery();
  // Очищаємо поле вводу
  form.reset();
  // Скидаємо значення сторінки до 1 при новому пошуку
  resetPage();
  // Виконуємо запит на сервер
  loadedImages = 0;
  try {
    const data = await responseData(query);
    const images = data.hits;
    totalHits = data.totalHits; // Зберігаємо загальну кількість зображень
    loadedImages = images.length; // Зберігаємо кількість завантажених зображень
    if (images.length === 0) {
      iziToast.show(errorMesage);
      return;
    }
    // Додаємо знайдені зображення в галерею
    renderImages(data.hits);
    refreshLightbox();
    if (loadedImages >= totalHits) {
      // Перевірка на кінець колекції
      iziToast.show(endOfSearch);
      loadMoreBtn.classList.add('visually-hidden');
    } else {
      loadMoreBtn.classList.remove('visually-hidden');
    }
  } catch (error) {
    iziToast.show(errorMesage);
  } finally {
    // Ховаємо лоадер
    loaderElement.classList.add('visually-hidden');
  }
}
async function loadMoreImages() {
  // const query = form.elements.searchQuery.value.trim();
  loaderElement.classList.remove('visually-hidden');
  try {
    const data = await responseData(query);
    const images = data.hits;
    loadedImages += images.length;
    if (images.length === 0) {
      iziToast.show(errorMesage);
      loadMoreBtn.classList.add('visually-hidden'); // Ховаємо кнопку "Load more" якщо більше немає зображень
      return;
    }
    renderImages(data.hits);
    refreshLightbox();
    if (loadedImages >= totalHits) {
      // Перевірка на кінець колекції
      iziToast.show(endOfSearch);
      loadMoreBtn.classList.add('visually-hidden');
    }
  } catch (error) {
    iziToast.show(errorMesage);
  } finally {
    loaderElement.classList.add('visually-hidden');
  }
}
