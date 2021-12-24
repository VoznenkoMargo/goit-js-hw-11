import Notiflix from 'notiflix';
import './sass/main.scss';
import { getImages } from './api/pixabay';
const form = document.querySelector(".search-form");
import PixaBayApi from './api/pixabay';
const apiService = new PixaBayApi();
const loadMoreButton = document.querySelector(".load-more");
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new SimpleLightbox('.gallery a');

const gallery = document.querySelector(".gallery");
const renderCards = (array, container) => {
   array.forEach(({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads
   }) => {
      container.insertAdjacentHTML("beforeend",
         `<a href=${largeImageURL}><div class="photo-card">
                       <img src=${webformatURL} alt=${tags} loading="lazy" width="300"/>
                        <div class="info">
                          <p class="info-item">
                            <b>Likes:</br><span>${likes}</span></b>
                          </p>
                          <p class="info-item">
                            <b>Views:</br><span>${views}</span></b>
                          </p>
                          <p class="info-item">
                            <b>Comments:</br><span>${comments}</span></b>
                          </p>
                          <p class="info-item">
                            <b>Downloads:</br><span>${downloads}</span></b>
                          </p>
                        </div>
                     </div> </a>`)
   }
   )
   lightbox.refresh();
}

const searchRequest = async (e) => {
   e.preventDefault();
   apiService.query = e.currentTarget.elements.searchQuery.value.trim();
   if (apiService.query === "") {
      return Notiflix.Notify.failure('Please, enter your search request');
   }
   clearContainer();
   apiService.resetPage();
   apiService.getImages().then(({ data: { hits, totalHits } }) => {
      if (hits.length === 0) {
         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
      else {
         Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
         renderCards(hits, gallery);
         loadMoreButton.classList.add("active");
         const totalPagesPB = Math.ceil(totalHits / apiService.perPage);
         if (apiService.page >= totalPagesPB) {
            loadMoreButton.classList.remove("active");
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");

         }
      }
   });
   loadMoreButton.classList.remove("active");
}

const onLoadMore = () => {
   apiService.getImages().then(({ data: { hits, totalHits } }) => {
      const totalPagesPB = Math.ceil(totalHits / apiService.perPage);
      if (totalPagesPB > apiService.page) {
         renderCards(hits, gallery);
      }
      if (apiService.page >= totalPagesPB) {
         loadMoreButton.classList.remove("active");
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }

   }).catch(e => {
      apiService.resetperPage();
      onLoadMore();
   });

}


const clearContainer = () => {
   gallery.innerHTML = "";
}

form.addEventListener("submit", searchRequest);
loadMoreButton.addEventListener("click", onLoadMore);



