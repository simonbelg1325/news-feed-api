import axios from "axios";
import ListItem from "./ListItem";
import Loader from "./Loader";
import Pagination from "./Pagination";

export default class List {
  constructor(nrOfArticles, holder) {
    this._nrOfArticles = nrOfArticles || 5;
    this._holder = holder;
    this.getData();
  }
  getData() {
    const bodyRef = document.querySelector(".ui.items");
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?&count=${
          this._nrOfArticles
        }&fields=text&from=${this._current_page++}`
      )
      .then(res => {
        console.log(res.data.response);
        let articles = res.data.response.items;
        if (articles.length > 0) {
          document
            .querySelector(".ui.active.dimmer")
            .classList.remove("active");
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
