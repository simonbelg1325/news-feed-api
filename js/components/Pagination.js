import axios from "axios";
import List from "./List";
import Loader from "./Loader";
export default class Pagination {
  constructor(resPerPage, page = 0) {
    this._resPerPage = resPerPage || 5;
    this._page = page;
    this._start = (this._page - 1) * this._resPerPage;
    this._end = this._page * this._resPerPage;
    this._totalPages = this.numPages();
    this._list = List.bind(this);
    this.next();
    this.prev();
  }
  next() {
    const loaderRef = document.querySelector(".ui.segment");
    const btn_prev = document.querySelector("#left");
    document.querySelector("#right").addEventListener(
      "click",
      function(e) {
        this._page++;
        if (this._page > -1) {
          btn_prev.style.visibility = "visible";
        }
        if (this._page === this._totalPages) {
          btn_next.style.visibility = "hidden";
        }
        new Loader(loaderRef);
        new List(this._resPerPage, this._page);
        // console.log(this._page);
      }.bind(this)
    );
  }
  prev() {
    const loaderRef = document.querySelector(".ui.segment");
    const btn_prev = document.querySelector("#left");
    const btn_next = document.querySelector("#right");
    btn_prev.addEventListener(
      "click",
      function(e) {
        this._page--;
        if (this._page === 0) {
          btn_prev.style.visibility = "hidden";
        }
        if (this._page < this._totalPages) {
          btn_next.style.visibility = "visible";
        }
        new Loader(loaderRef);
        new List(this._resPerPage, this._page);
        // console.log(this._page);
      }.bind(this)
    );
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
