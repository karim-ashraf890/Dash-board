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




function renderAdmins(admins: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_code: string;
    phone_number: string;
    created_at?: string | null;
    created_by_adminName?: string | null;
    updated_at?: string | null;
    updated_by_adminName?: string | null;
}[]) {
    const table = document.querySelector(".admins-table") as HTMLTableElement;
    if (!table) return;

    if (!admins || admins.length === 0) {
        table.style.display = "none";
        return;
    } else {
        table.style.display = "table";
    }

    tbody.innerHTML = "";

    for (let i = 0; i < admins.length; i++) {

        const admin = admins[i];

        const tr = document.createElement("tr");

        // 1) ID
        const id = admin.id;
        const td1 = document.createElement("td");
        td1.textContent = admin.id.toString();
        // 2) First name
        let firstName = admin.first_name;
        const td2 = document.createElement("td");
        td2.textContent = firstName;
        // 3) Last name
        let lastName = admin.last_name;
        const td3 = document.createElement("td");
        td3.textContent = lastName;
        // 4) Email
        let email = admin.email;
        const td4 = document.createElement("td");
        td4.textContent = email;
        // 5) Phone number
        let phone = admin.phone_code + "-" + admin.phone_number;
        const td5 = document.createElement("td");
        td5.textContent = phone;
        // 6) Created at
        let createdAt = admin.created_at;

        const td6 = document.createElement("td");

        if (createdAt && createdAt !== "") {
            td6.textContent = createdAt;
        } else {
            td6.textContent = "—";
        }
        // 7) Created by
        let createdBy = admin.created_by_adminName;
        const td7 = document.createElement("td");
        if (createdBy && createdBy !== "") {
            td7.textContent = createdBy;
        } else {
            td7.textContent = "—";
        }
        // 8) Updated at
        let updatedAt = admin.updated_at;
        const td8 = document.createElement("td");
        if (updatedAt && updatedAt !== "") {
            td8.textContent = updatedAt;
        } else {
            td8.textContent = "—";
        }
        // 9) Updated by
        let updatedBy = admin.updated_by_adminName;
        const td9 = document.createElement("td");
        if (updatedBy && updatedBy !== "") {
            td9.textContent = updatedBy;
        } else {
            td9.textContent = "—";
        }
        // 10) Actions column
        const td10 = document.createElement("td");

        td10.classList.add("actions-col");
        td10.innerHTML = `<span class="actions-menu">⋮</span>`;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tr.appendChild(td10);

        tbody.appendChild(tr);
    }
}

function getAdmins() {
    axios.get(apiUrl + "/admins?page=1",
        {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            renderAdmins(response.data.admins);
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
                        renderAdmins(response.data.admins);
                    })
                    .catch((err) => {
                        localStorage.clear();
                        window.location.href = "/login.html";
                    });

            }
        });
}

getAdmins();
