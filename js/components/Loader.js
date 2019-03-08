export default class Loader {
  constructor(holder) {
    this._holder = holder;
    this._loaderRef = this.loader();
  }
  loader() {
    this._holder.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="ui active dimmer">
        <div class="ui indeterminate text loader">Even geduld...</div>
      </div>
      `
    );
    return [...this._holder.querySelectorAll(".ui.active.dimmer")];
  }
  static show() {
    document.querySelector(".ui.active.dimmer").classList.add("active");
  }
  static hide() {
    document.querySelector(".ui.active.dimmer").classList.remove("active");
  }
}
