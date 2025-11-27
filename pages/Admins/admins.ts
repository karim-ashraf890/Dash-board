import '../../global.scss';
import '../common/sideMenu.scss';
import './admins.scss'
import '../common/sideMenu';
import axios from "axios";
import { refreshTokenFun } from "../../api/api";

let token = localStorage.getItem("accessToken");
if (!token) {
    window.location.href = "/login.html";
}

let refreshToken = localStorage.getItem("refreshToken");

const addNewBtn = document.getElementById("addNewBtn");

addNewBtn.addEventListener("click", () => {
    window.location.href = "/Add-new.html";
});


const tbody = document.getElementById("adminsTableBody");

const apiUrl = "http://127.0.0.1:9696";


function getAdmins() {
    axios.get(apiUrl + "/admins?page=1",
        {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            console.log("Data:", response.data);

            let admins = response.data.admins;

            for (let i = 0; i < admins.length; i++) {
                console.log(admins[i]); // هنا تقدر تتصرف بالبيانات براحتك

                const admin = admins[i];
                const id = admin.id;
                let firstName = admin.first_name;
                let lastName = admin.last_name;
                console.log(id);
                console.log(firstName);
                console.log(lastName);
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {

                refreshTokenFun(token, refreshToken)
                    .then((tokens) => {
                        token = tokens.token;
                        refreshToken = tokens.refreshToken;

                        return axios.get(apiUrl + "/admins?page=1",
                            {
                                headers: {
                                    Authorization: token
                                }
                            });
                    })

                    .then((response) => {
                        console.log("Data after refresh:", response.data);

                    })

                    .catch((error) => {
                        console.error("Error refreshing token:", error);
                        window.location.href = "/login.html";
                    });
            }
        });
}

getAdmins();
