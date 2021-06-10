import galleryObjs from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');

/* ССЫЛКИ */

const refs = {
    lightbox: document.querySelector('.js-lightbox'),
    lightboxCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightboxImage: document.querySelector('.lightbox__image')
};


/*рендеринг разметки списка*/

function createGalleryItems(items) {
    return items.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href= '${original}'>
                <img
                class="gallery__image"
                src='${preview}'
                data-source="${original}"
                alt='${description}'
                />
            </a>
        </li>`;
    })
        .join('');
};

const picsMarkup = createGalleryItems(galleryObjs);

galleryList.insertAdjacentHTML('beforeend', picsMarkup);

// const image = document.querySelector('.gallery__image);


/* КЛИК ПО КАРТИНКЕ */
galleryList.addEventListener('click', onImageClick);

function onImageClick(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    } else {
        e.preventDefault();
        refs.lightbox.classList.add('is-open');
        refs.lightboxImage.src = e.target.dataset.source;
        refs.lightboxImage.alt = e.target.alt;
    }}
 


/* ЗАКРЫТИЕ МОДАЛКИ */
refs.lightboxCloseBtn.addEventListener('click', closeLightBox);
refs.lightboxCloseBtn.addEventListener('keydown', closeLightBox);
refs.lightboxOverlay.addEventListener('click', closeLightBox);
document.addEventListener('keydown', closeLightboxByEsc)

function closeLightBox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

function closeLightboxByEsc (e) {
  // if (refs.lightbox.classList.contains('is-open')) {
    if(e.code === 'Escape') {
      refs.lightbox.classList.remove('is-open');
      refs.lightboxImage.src = '';
      refs.lightboxImage.alt = '';
    // };
  };
}

/*-----------------------------------------*/

/* МАССИВ ССЫЛОК НА ОРИГИНАЛЫ */

const arrayOfOriginalImages = galleryObjs.map(obj => obj.original);

// console.log(arrayOfOriginalImages);

/* ПЕРЕКЛЮЧЕНИЕ КАРТИНОК */
document.addEventListener('keydown', switchImages);

function switchImages (e) {
  let newId;
  const currentId = arrayOfOriginalImages.indexOf(refs.lightboxImage.src);
  if (e.key === 'ArrowLeft') {
    newId = currentId - 1;
    if (newId === -1) {
      closeLightBox();
      return console.log('это самая первая картинка, чтобы посмотреть всю галарею, щелкните по первой картинке и листайте вправо')
      // newId = arrayOfOriginalImages.length - 1;
    };
  } else if (e.key === 'ArrowRight') {
    newId = currentId + 1;
    if (newId === arrayOfOriginalImages.length) {
      closeLightBox();
      return console.log('вы просмотрели всю галерею')
      // newId = 0;
    } 
  } else {
    return;
  };
  refs.lightboxImage.src = arrayOfOriginalImages[newId];
};

