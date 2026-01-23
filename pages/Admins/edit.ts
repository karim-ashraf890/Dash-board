import '../../global.scss';
import '../common/sideMenu.scss';
import './add.scss';
import '../common/sideMenu';
import axios from "axios";
import { refreshTokenFun } from "../../api/api";

let token = localStorage.getItem("accessToken");
if (!token) {
    window.location.href = "/login.html";
}

let refreshToken = localStorage.getItem("refreshToken");

const apiUrl = "http://127.0.0.1:9696";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const adminId = urlParams.get('id') ? parseInt(urlParams.get('id')!) : null;

if (!adminId) {
    alert("No admin id provided!");
    window.location.href = "/admins.html";
}

let selectedAvatarFile: File | null = null;

const avatarInput = document.getElementById("avatarInput") as HTMLInputElement;
const avatarPreview = document.getElementById("avatarPreview") as HTMLImageElement;

avatarPreview.addEventListener("click", () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];

        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target && e.target.result) {
                avatarPreview.src = e.target.result as string;
            }
        }
        reader.readAsDataURL(file);

        selectedAvatarFile = file;
    }
});

function getAdmin(id: number) {
    axios.get(`${apiUrl}/admins/${id}`, {
        headers: { Authorization: token }
    })
        .then(response => {
            fillForm(response.data);
            console.log(response)
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                // تجديد التوكن
                refreshTokenFun(token, refreshToken)
                    .then(tokens => {
                        token = tokens.token;
                        refreshToken = tokens.refreshToken;
                        return axios.get(`${apiUrl}/admins/${id}`, {
                            headers: { Authorization: token }
                        });
                    })
                    .then(response => {
                        fillForm(response.data);
                    })
                    .catch(err => {
                        localStorage.clear();
                        window.location.href = "/login.html";
                    });
            } else {
                console.error(error);
                alert("Failed to fetch admin data.");
            }
        });
}

// ----- 7️⃣ دالة لملء الفورم مع الصورة -----
function fillForm(admin: any) {
    if (admin.avatar_url && admin.avatar_url !== "") {
        avatarPreview.src = admin.avatar_url;
    } else {
        avatarPreview.src = "../../assets/imge/avatar_holder_dashboard.gif";
    }

    const firstNameInput = document.getElementById("firstName") as HTMLInputElement;
    firstNameInput.value = admin.first_name || "";

    const lastNameInput = document.getElementById("lastName") as HTMLInputElement;
    lastNameInput.value = admin.last_name || "";

    const emailInput = document.getElementById("email") as HTMLInputElement;
    emailInput.value = admin.user.email || "";

    const countrySelect = document.getElementById("countryCode") as HTMLSelectElement;
    let phoneCode = admin.user.phone_code || "";
    if (!phoneCode.startsWith("+")) {
        phoneCode = "+" + phoneCode;
    }
    countrySelect.value = phoneCode;

    const phoneInput = document.getElementById("phone") as HTMLInputElement;
    phoneInput.value = admin.user.phone_number || "";

    const permissions = admin.user.permissions;
    console.log(permissions);
    const container = document.getElementById("permissionsContainer") as HTMLElement;





    axios.get(apiUrl + "/permissions")
        .then(response => {

            const permissions = response.data.permissions;
            const container = document.getElementById("permissionsContainer") as HTMLElement;

            container.innerHTML = "";

            for (let i = 0; i < permissions.length; i++) {

                const perm = permissions[i];

                const col = document.createElement("div");
                col.className = "col-md-3 col-sm-6 mb-2 perm-col";

                const formCheck = document.createElement("div");
                formCheck.className = "form-check perm-check";

                const input = document.createElement("input");
                input.type = "checkbox";
                input.className = "form-check-input perm-input";
                input.value = perm.id.toString();
                input.id = "perm_" + perm.id;

                const label = document.createElement("label");
                label.className = "form-check-label perm-label";
                label.htmlFor = input.id;
                label.textContent = perm.name_en;

                formCheck.appendChild(input);
                formCheck.appendChild(label);
                col.appendChild(formCheck);
                container.appendChild(col);
                for (let i = 0; i < admin.user.permissions; i++) {
                    console.log("hiiiiii" + i)
                }
            }

        })
        .catch(function (error) {
            console.log(error);
        })



}

if (adminId) {
    getAdmin(adminId);
}

// ----- 9️⃣ حفظ التعديلات مع الصورة -----
const submitBtn = document.getElementById("submit-btn");
submitBtn?.addEventListener("click", () => {
    const data = {
        first_name: (document.getElementById("firstName") as HTMLInputElement).value,
        last_name: (document.getElementById("lastName") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone_code: (document.getElementById("phone") as HTMLInputElement).value,
        phone_number: (document.getElementById("phone") as HTMLInputElement).value,
    };

    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("phone_code", data.phone_code);
    formData.append("phone_number", data.phone_number);

    if (selectedAvatarFile) {
        formData.append("avatar", selectedAvatarFile);
    }

    axios.put(`${apiUrl}/admins/${adminId}`, formData, {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
        }
    })
        .then(() => {
            alert("Admin updated successfully!");
            window.location.href = "/admins.html";
        })
        .catch(err => {
            console.error(err);
            alert("Failed to update admin.");
        });
});
