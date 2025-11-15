import '../global.scss';
import './home.scss';
import axios from "axios";

let token = localStorage.getItem("accessToken");
if (!token) {
    window.location.href = "/login.html";
}



const CloseIcon = document.getElementById("closing") as HTMLElement;
const OpenIcon = document.getElementById("open") as HTMLElement;
const navBar = document.getElementById("navBar") as HTMLElement;
const home = document.getElementById("home") as HTMLElement;

function removeCols(element: HTMLElement) {
    element.classList.forEach((cls: string) => {
        if (cls.startsWith("col-")) {
            element.classList.remove(cls);
        }
    });
}

function navbarContro() {
    CloseIcon.style.display = "inline-block";
    OpenIcon.style.display = "none";

    CloseIcon.addEventListener("click", () => {
        removeCols(navBar);
        removeCols(home);
        navBar.classList.add("col-1");
        home.classList.add("col-11");

        CloseIcon.style.display = "none";
        OpenIcon.style.display = "inline-block";
    });

    OpenIcon.addEventListener("click", () => {
        removeCols(navBar);
        removeCols(home);
        navBar.classList.add("col-2");
        home.classList.add("col-10");

        CloseIcon.style.display = "inline-block";
        OpenIcon.style.display = "none";
    });
}

window.addEventListener("DOMContentLoaded", navbarContro);



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

