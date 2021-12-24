import axios from "axios";
const API_KEY = "12783290-c038bea7d68fccc79fac86cff";
export default class PixaBayApi {
   constructor() {
      this.searchQuery = "";
      this.page = 1;
      this.perPage = 40;
   }
   async getImages() {
      const res = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`);
      this.incrementPage();
      return res;
   }
   resetPage() {
      this.page = 1;
   }
   incrementPage() {
      this.page += 1;
   }

   resetperPage() {
      this.perPage = 20;
   }
   get query() {
      return this.searchQuery;
   }
   set query(newQuery) {
      this.searchQuery = newQuery;
   }
}