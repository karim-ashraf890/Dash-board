import '../global.scss';
import './common/sideMenu.scss';
import './home.scss';
import './common/sideMenu';
import axios from "axios";

const currentPage = window.location.pathname;
const links = document.querySelectorAll(".side-menu-link");

let activeAdded = false;

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        activeAdded = true;
    }
});

// لو مفيش صفحة مطابقة — خلّي أول واحدة Active افتراضيًا
if (!activeAdded && links.length > 0) {
    links[1].classList.add("active"); // أول واحدة بعد الـ Profile
}

// function getuser() {
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//         .then(function (response) {
//             for (let i = 0; i < response.data.length; i++) {
//                 // id
//                 let container = document.getElementById("Userscontainer");
//                 let kk = document.createElement("h1");
//                 container.appendChild(kk);
//                 let id = response.data[i].id;
//                 kk.innerText = "User Id : " + id;
//                 //title
//                 let title = response.data[i].title;
//                 //body
//                 let body = response.data[i].body;
//                 console.log(id, title, body);

//             }

//             // console.log(response);
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

// const btn = document.getElementById("get-btn");
// btn.addEventListener("click", () => {
//     getuser();
// });

// localStorage.setItem("token", "fhggkhfghdgjhfhjdgjdgdxgj");
// console.log(localStorage.getItem("token"));
// localStorage.removeItem("token")

