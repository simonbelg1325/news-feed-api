import "semantic-ui/dist/semantic.min.css";
import "../css/style.scss";
import "basiclightbox/dist/basicLightbox.min.css";
import Loader from "./components/Loader";
import List from "./components/List";
import Pagination from "./components/Pagination";

const loaderRef = document.querySelector(".ui.segment");

new Loader(loaderRef);
new List();
new Pagination();
