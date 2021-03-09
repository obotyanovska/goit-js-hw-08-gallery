import galleryItems from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('ul.gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('div.lightbox__overlay'),
  currentImageInModal: document.querySelector('.lightbox__image'),
  modalBtnClose: document.querySelector('button[data-action="close-lightbox"]'),
};

function galleryItemFactory({ preview, original, description }) {
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
}

function renderGallery(array) {
  const galleryElems = array.map(item => galleryItemFactory(item)).join('');
  refs.galleryList.insertAdjacentHTML('beforeend', galleryElems);
}

renderGallery(galleryItems);

refs.galleryList.addEventListener('click', onImageOpenClick);
refs.modalBtnClose.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onOverlayCloseClick);

function onImageOpenClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onEscapeKeyPress);
  // window.addEventListener('keydown', scrollImagesInModal);
  e.preventDefault();
  const currentImage = e.target;
  refs.currentImageInModal.src = currentImage.dataset.source;
  refs.currentImageInModal.alt = currentImage.alt;
  refs.lightbox.classList.add('is-open');
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onEscapeKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.currentImageInModal.src = '';
  refs.currentImageInModal.alt = '';
}

function onOverlayCloseClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function onEscapeKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

// Добавить слушателя мыши при наведении на изображение - изменение поинтера + скейл
