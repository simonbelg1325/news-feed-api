import List from "./List";
import axios from "axios";
import Loader from "./Loader";
import ListItem from "./ListItem";

export default class Pagination {
  constructor(holder) {
    this._nrOfItems = 5;
    this._current_page = 1;
    this._total_page = this.numPages();
    this._holder = holder;
    this.nextPage();
    this.prevPage();
    this.changePage();
  }
  nextPage() {
    document.querySelector("#right").addEventListener(
      "click",
      function(e) {
        this._current_page++;
        let btn_prev = document.querySelector("#left");
        if (this._current_page > 1) {
          btn_prev.style.visibility = "visible";
        }
        console.log(this._current_page);
        this.changePage(this._current_page);
      }.bind(this)
    );
  }
  prevPage() {
    let btn_prev = document.querySelector("#left");
    btn_prev.addEventListener(
      "click",
      function(e) {
        this._current_page--;
        if (this._current_page === 1) {
          btn_prev.style.visibility = "hidden";
        }
        console.log(this._current_page);
        this.changePage(this._current_page);
      }.bind(this)
    );
  }
  changePage(page) {
    const bodyRef = document.querySelector(".ui.items");
    bodyRef.innerHTML = "";
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?&count=${
          this._nrOfItems
        }&fields=text&from=${page}`
      )
      .then(new List(5, bodyRef))
      .catch(err => {
        return `An error has occurred: ${err}`;
      });
  }
  numPages() {
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?&count=${
          this._nrOfItems
        }&fields=text&from=${this._current_page}`
      )
      .then(res => {
        let total_articles = res.data.response.total;
        let num_of_pages = Math.ceil(total_articles / this._nrOfItems);
        console.log(num_of_pages);
        return num_of_pages;
      })
      .catch(err => {
        return `An error has occurred: ${err}`;
      });
  }
}
