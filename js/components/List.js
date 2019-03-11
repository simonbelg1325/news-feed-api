import axios from "axios";
import ListItem from "./ListItem";
import Loader from "./Loader";
export default class List {
  constructor(resPerPage, page = 0) {
    this._resPerPage = resPerPage || 5;
    this._page = page;
    this._start = (this._page - 1) * this._resPerPage;
    this._end = this._page * this._resPerPage;
    this.data();
  }
  data() {
    const bodyRef = document.querySelector(".ui.items");
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?count=${
          this._resPerPage
        }&fields=text&from=${this._end}&sort=mostRecent`
      )
      .then(res => {
        let articles = res.data.response.items;
        articles.slice(this._start, this._end);
        if (articles.length > 0) {
          Loader.hide();
        }
        document.querySelector(".ui.items").innerHTML = "";
        articles.forEach(article => {
          new ListItem(article, bodyRef);
        });
      })
      .catch(err => {
        return `An error has occurred: ${err}`;
      });
  }
}
