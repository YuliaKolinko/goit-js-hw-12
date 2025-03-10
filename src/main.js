// iziToast імпорт бібліотеки
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// SimpleLightbox імпорт бібліотеки
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// loaders імпорт бібліотеки
import 'loaders.css/loaders.min.css';
// Імпорт функцій
import { responseData } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';
// Імпорт іконок
import iconSvgError from './img/icon/Group.png';

const form = document.querySelector('.form');
const loaderElement = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const errorMesage = {
  message:
    'Sorry, there are no images matching your search query.Please try again!',
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: iconSvgError,
};

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionType: 'attr',
  captionDelay: 250,
  animationSpeed: 350,
  captionPosition: 'bottom',
});

lightbox.on('show.simplelightbox', function () {});
lightbox.on('error.simplelightbox', function (e) {
  console.log(e);
});

form.addEventListener('submit', searchImages);
// Обробляємо подію відправки форми, та відображаємо знайдені зображення в галереї
function searchImages(event) {
  // Відміняємо дію за замовченням
  event.preventDefault();
  // Перевірка введеного тексту
  const query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    return;
  }
  // Показуємо лоадер
  loaderElement.classList.remove('visually-hidden');
  // Очищаємо галерею
  clearGallery();
  // Очищаємо поле вводу
  form.reset();
  // Виконуємо запит на сервер
  responseData(query)
    .then(data => {
      const images = data.hits;
      console.log('Отримані дані:', images); // Додано для перевірки даних
      if (images.length === 0) {
        iziToast.show(errorMesage);
        return;
      }
      // Додаємо знайдені зображення в галерею
      renderImages(data.hits);
      lightbox.refresh();
    })
    //  Обробляємо помилки
    .catch(error => {
      iziToast.show(errorMesage);
    })
    // Ховаємо лоадер
    .finally(() => {
      loaderElement.classList.add('visually-hidden');
    });
}
