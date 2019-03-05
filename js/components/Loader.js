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
        <div class="ui indeterminate text loader">Preparing Files</div>
      </div>
      `
    );
    return [...this._holder.querySelectorAll(".ui.active.dimmer")];
  }
  get show() {
    document.querySelector(".ui.active.dimmer").classList.add("active");
  }
  get hide() {
    document.querySelector(".ui.active.dimmer").classList.remove("active");
  }
}
