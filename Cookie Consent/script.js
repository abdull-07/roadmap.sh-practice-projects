const popCookie = document.querySelector("#cookie-consent")
const acceptButton = document.querySelector("#accept-btn")
const closeButton = document.querySelector("#close-btn")
const massege = document.querySelector("#msg")


// * 1st Method
const main = () =>{
    // this store the cookies in local storage
    // if (localStorage.getItem("cookiesAccepted") === "true") {
    //     popCookie.style.display = "none";
    // }
    massege.style.display = "none"

    acceptButton.addEventListener("click", accept)
    closeButton.addEventListener("click", close)
}

const accept = () =>{
    popCookie.style.display = "none";
    massege.style.display = "flex"
    massege.innerText = "Thanks for accepting cookies!"
}

const close =()=>{
    popCookie.style.display = "none";
}



document.addEventListener("DOMContentLoaded", main)



// * 2nd Method
// document.addEventListener("DOMContentLoaded", () => {
    
// this store the cookies in local storage
    // if (localStorage.getItem("cookiesAccepted") === "true") {
    //     popCookie.style.display = "none";
    // }

//     acceptButton.addEventListener("click", () => {
//         alert("Thanks for accepting cookies!");
//         popCookie.style.display = "none";
//     })

//     closeButton.addEventListener("click", () =>{
//         popCookie.style.display = "none";
//     })
// })

