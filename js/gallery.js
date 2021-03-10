import galleryItems from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('ul.gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('div.lightbox__overlay'),
  currentImageInModal: document.querySelector('.lightbox__image'),
  modalBtnClose: document.querySelector('button[data-action="close-lightbox"]'),
};

function galleryItemFactory({ preview, original, description }, index) {
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
        data-index="${index}"
      />
    </a>
  </li>`;
}

function renderGallery(array) {
  const galleryElems = array
    .map((item, index) => galleryItemFactory(item, index))
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', galleryElems);
}

renderGallery(galleryItems);

refs.galleryList.addEventListener('click', onImageOpenClick);
refs.modalBtnClose.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onOverlayCloseClick);

const collectionOriginalSrc = [...galleryItems].map(item => item.original);
const collectionAlt = [...galleryItems].map(item => item.description);

// function onImageOpenClick(e) {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }
//   window.addEventListener('keydown', onEscapeKeyPress);
//   window.addEventListener('keydown', scrollImagesInModal);
//   e.preventDefault();
//   const currentImage = e.target;
//   refs.currentImageInModal.src = currentImage.dataset.source;
//   refs.currentImageInModal.alt = currentImage.alt;
//   refs.lightbox.classList.add('is-open');
// }

function onImageOpenClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onEscapeKeyPress);
  e.preventDefault();
  let currentIndex = e.target.dataset.index;
  window.addEventListener('keydown', scrollImagesInModal);

  refs.currentImageInModal.src = collectionOriginalSrc[currentIndex];
  refs.currentImageInModal.alt = collectionAlt[currentIndex];
  refs.lightbox.classList.add('is-open');
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onEscapeKeyPress);
  window.removeEventListener('keydown', scrollImagesInModal);
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

function scrollImagesInModal(e) {
  let currentIndex = collectionOriginalSrc.indexOf(
    refs.currentImageInModal.src,
  );
  console.log(currentIndex);
  if (
    e.code === 'ArrowRight' &&
    currentIndex < collectionOriginalSrc.length - 1
  ) {
    currentIndex += 1;
  } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
    currentIndex -= 1;
  } else {
    onCloseModal();
  }

  refs.currentImageInModal.src = collectionOriginalSrc[currentIndex];
  refs.currentImageInModal.alt = collectionAlt[currentIndex];
}
