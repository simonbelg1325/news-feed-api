import axios from "axios";
import Pagination from "./Pagination";

export default class ListItem {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder;
    this._articleRef = this.generateHtml();
    this.extraData();
  }

  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="item">
            <div class="image">
              <img src="${this._article.image.thumb}" />
            </div>
            <div class="content">
              <a class="header">${this._article.title}</a>
              <div class="meta">
                <span>${this._article.teaser}</span>
              </div>
              <div class="description">
                <p></p>
              </div>
              <div class="extra">
              </div>
            </div>
          </div>
          <div class="ui divider"></div>
      `
    );
    return [...this._holder.querySelectorAll(".item")].reverse()[0];
  }
  extraData() {
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?ids=${
          this._article.id
        }&fields=video`
      )
      .then(res => {
        console.log(res.data.response.items);
        this._articleRef.querySelector(".header").addEventListener(
          "click",
          function(e) {
            console.log("clicked");
          }.bind(this)
        );
      });
  }
}
