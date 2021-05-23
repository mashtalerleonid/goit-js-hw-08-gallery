import gallery from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const galleryMarkup = createGalleryMarkup(gallery);
const lightbox = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxCloseBth = document.querySelector(
  '[data-action="close-lightbox"]'
);
const lightboxImage = document.querySelector(".lightbox__image");

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onImageClick);
lightboxCloseBth.addEventListener("click", onCloseBtnClick);
lightboxOverlay.addEventListener("click", onlightboxOverlayClick);

function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
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
    })
    .join("");
}

function onImageClick(e) {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  e.preventDefault();

  lightbox.classList.add("is-open");
  window.addEventListener("keydown", onKeydown);

  lightboxImage.src = e.target.dataset.source;
  lightboxImage.alt = e.target.alt;
}

function closeModal() {
  lightbox.classList.remove("is-open");
  window.removeEventListener("keydown", onKeydown);

  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function onCloseBtnClick() {
  closeModal();
}

function onlightboxOverlayClick(e) {
  closeModal();
}

function onKeydown(e) {
  if (e.code === "Escape") {
    closeModal();
    return;
  }

  const currentIndex = gallery.indexOf(
    gallery.find((el) => el.original === lightboxImage.src)
  );

  if (e.code === "ArrowRight") {
    moveRight(currentIndex);
    return;
  }

  if (e.code === "ArrowLeft") {
    moveLeft(currentIndex);
    return;
  }
}

function moveRight(index) {
  if (index === gallery.length - 1) {
    lightboxImage.src = gallery[0].original;
  } else {
    lightboxImage.src = gallery[index + 1].original;
  }
}

function moveLeft(index) {
  if (index === 0) {
    lightboxImage.src = gallery[gallery.length - 1].original;
  } else {
    lightboxImage.src = gallery[index - 1].original;
  }
}
