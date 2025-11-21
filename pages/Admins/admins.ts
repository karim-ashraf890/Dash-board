import '../../global.scss';
import '../common/sideMenu.scss';
import './admins.scss'
import '../common/sideMenu';
import axios from "axios";
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
    axios.get(apiUrl + "/admins?page=1", {
        headers: {
            Authorization: token
        }
    })
        .then((response) => {
            console.log("Data:", response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            if (error.response && error.response.status === 401) {
                axios.get(apiUrl + "/authentication/refresh-token", {
                    headers: {
                        Authorization: refreshToken
                    }
                })
                    .then((response) => {
                        // التعامل مع أي شكل للـ response
                        const newAccess = response.data.data?.access_token || response.data.access_token;
                        const newRefresh = response.data.data?.refresh_token || response.data.refresh_token;

                        token = newAccess;
                        refreshToken = newRefresh;

                        localStorage.setItem("accessToken", token);
                        localStorage.setItem("refreshToken", refreshToken);

                        return axios.get(apiUrl + "/admins?page=1", {
                            headers: {
                                Authorization: token
                            }
                        });
                    })
                    .then((response) => {
                    })
                    .catch((error) => {
                        console.error("Error refreshing token:", error);
                        window.location.href = "/login.html";
                    });
            }
        });
}

getAdmins();