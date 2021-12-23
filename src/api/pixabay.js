import axios from "axios";
const API_KEY = "12783290-c038bea7d68fccc79fac86cff";
export default class PixaBayApi {
   constructor() {
      this.searchQuery = "";
      this.page = 1;
      this.imgCount = 0;
      this.per_page = 20;
   }
   async getImages() {
      const gallery = document.querySelector(".gallery");
      this.page += 1;
      return await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`);
   }
   resetPage() {
      this.page = 1;
   }
   resetCount() {
      this.imgCount = 0;
   }
   resetperPage() {
      this.per_page = 20;
   }
   get query() {
      return this.searchQuery;
   }
   set query(newQuery) {
      this.searchQuery = newQuery;
   }
   get count() {
      return this.imgCount;
   }
   set count(newCount) {
      this.imgCount = newCount;
   }
   get perPage() {
      return this.per_page;
   }
   set perPage(newPage) {
      this.per_page = newPage;
   }


}