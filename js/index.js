import "semantic-ui/dist/semantic.min.css";
import "../css/style.scss";
// import axios from "axios";
// import ListItem from "./components/ListItem";
import Loader from "./components/Loader";
import List from "./components/List";
import Pagination from "./components/Pagination";

const bodyRef = document.querySelector(".ui.items");
const loaderRef = document.querySelector(".ui.segment");

new Loader(loaderRef);
new List(5, bodyRef);
new Pagination(bodyRef);

// (function displayArticle() {
//   axios
//     .get(
//       `https://nieuws.vtm.be/feed/articles?type=video&sort=mostRecent&fields=video`
//     )
//     .then(res => {
//       console.log(res);
//       let articles = res.data.response.items;
//       articles.forEach(article => {
//         new ListItem(article, bodyRef);
//       });
//     });
// })();
