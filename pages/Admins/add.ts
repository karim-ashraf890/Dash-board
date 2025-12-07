import '../../global.scss';
import '../common/sideMenu.scss';
import './add.scss'
import '../common/sideMenu';
import axios from "axios";
import { refreshTokenFun } from "../../api/api";

let token = localStorage.getItem("accessToken");
if (!token) {
    window.location.href = "/login.html";
}

let refreshToken = localStorage.getItem("refreshToken");

const avatarPreview = document.getElementById('avatarPreview') as HTMLImageElement;
const avatarInput = document.getElementById('avatarInput') as HTMLInputElement;

avatarPreview.addEventListener('click', () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];

        // عرض الصورة في avatarPreview
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target && e.target.result) {
                avatarPreview.src = e.target.result as string;
            }
        }
        reader.readAsDataURL(file);

        // رفع الصورة للسيرفر
        uploadFileToServer(file);
    }
});


//     const submitbtn = document.getElementById('submit-btn') as HTMLButtonElement;
//     submitbtn.addEventListener("click", () => {
//     console.log("Button clicked!");
// });

function uploadFileToServer(file: File) {
    const formData = new FormData();
    formData.append("profile_image", file);

    const apiUrl = "http://localhost:9696";


    axios
        .post(apiUrl + "/admins", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token
            },
        })
        .then(function (response) {
            console.log("Uploaded:", response.data);
        })
        .catch(async function (error) {
            console.log("Upload error:", error);

            // مثال لو حابب تستخدم refreshTokenFun لو التوكن منتهية
            if (error.response && error.response.status === 401) {
                refreshTokenFun(token, refreshToken)
                    .then((tokens) => {
                        token = tokens.token;
                        refreshToken = tokens.refreshToken;
                        return axios.post(apiUrl + "/admins", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: token
                            }
                        });
                    })
                    .then((response) => {
                        // renderAdmins(response.data.admins);
                    })
                    .catch((error) => {
                        localStorage.clear();
                        // window.location.href = "/login.html";
                    });

            }

        });
}