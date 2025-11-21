import '../global.scss';
import './common/sideMenu.scss';
import './home.scss';
import './common/sideMenu';
import axios from "axios";


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

