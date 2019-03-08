import axios from "axios";
import List from "./List";

export default class Paginator {
  constructor(resPerPage, page = 0) {
    this._resPerPage = resPerPage || 10;
    this._totalPages = this.numPages();
    this._page = page;
    this._listRef = List;
    this.next();
    this.prev();
  }
  next() {
    this._listRef;
  }
  prev() {
    this._listRef;
  }
  numPages() {
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?&count=${
          this._resPerPage
        }&fields=text&from=${this._page}`
      )
      .then(res => {
        let total_articles = res.data.response.total;
        let num_of_pages = Math.ceil(total_articles / this._resPerPage);
        console.log(num_of_pages);
        return num_of_pages;
      })
      .catch(err => {
        return `An error has occurred: ${err}`;
      });
  }
}
