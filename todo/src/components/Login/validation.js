const showToast = () => {
    document.getElementById("liveToastBtn").addEventListener("click", () => {
        let liveToast = document.getElementById("liveToast")
        setTimeout(() => {
            liveToast.classList.add("show")
            liveToast.classList.remove("hide")
        }, 1000);
        setTimeout(() => {
            liveToast.classList.add("hide")
            liveToast.classList.remove("show")
        }, 10000);
    })
    document.getElementById("closeId").addEventListener("click", () => {
        setTimeout(() => {
            let liveToast = document.getElementById("liveToast")
            liveToast.classList.add("hide");
            liveToast.classList.remove("show");
        }, 200);
    })
}

// const toastContentForSuccess = () => {
//     document.getElementById("toastTitle").innerText = "Logged In"
//     document.getElementById("toastDesc").innerText = "You have successfully logged in."
//     document.getElementById("toastLine").style.backgroundColor = "springgreen"
//     document.getElementById("setIcon").style.backgroundColor = "lightgreen"
//     document.getElementById("setIcon").style.color = "cadetblue"
//     document.getElementById("setIcon").innerText = "check"
// }

const toastContentForFailure = () => {
    document.getElementById("toastTitle").innerText = "Error Occured"
    document.getElementById("toastDesc").innerText = "Something went wrong, Please check your credentials and internet"
    document.getElementById("toastLine").style.backgroundColor = "orangered"
    document.getElementById("setIcon").style.backgroundColor = "orangered"
    document.getElementById("setIcon").style.color = "darkred"
    document.getElementById("setIcon").innerText = "close"
}

// export { showToast, toastContentForSuccess, toastContentForFailure }
export { showToast, toastContentForFailure }