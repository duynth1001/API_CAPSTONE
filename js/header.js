import { AdminOrderComponent,AdminOrderDetail } from "./login.js";


let home = document.getElementById("home")
let navItem = document.querySelectorAll(".nav-item .nav-link")
let login = document.getElementById("login");
let homeComponent = document.querySelector(".home")
let loginComponent = document.querySelector(".login")
let register = document.getElementById("register")
let registerComponent = document.querySelector(".register")
let adminComponent = document.querySelector(".admin")
let historyComponent = document.querySelector(".history")
let history = document.getElementById("history")
let detailHistory = document.querySelector(".historyDetail")

// delecte activce class
const deleteActive = () =>{
    navItem.forEach((item) =>{
        item.classList.remove("active")
    })
}

//add active class
const addActive = (index) =>{
    deleteActive()
    if(index == 0){
       homeComponent.classList.remove("hide")
       loginComponent.classList.add("hide")
       registerComponent.classList.add("hide")

    }
    navItem[index].classList.add("active");
}
// add eventlistener
navItem.forEach((item,index) =>{
    item.addEventListener('click',()=>addActive(index))
})


login.addEventListener('click', () =>{
    deleteActive()
    loginComponent.classList.remove("hide")
    homeComponent.classList.add("hide")
    registerComponent.classList.add("hide")
    historyComponent.classList.add("hide")
    detailHistory.classList.add("hide")
    AdminOrderComponent.classList.add("hide")
    AdminOrderDetail.classList.add("hide")
})

register.addEventListener("click",()=>{
    deleteActive()
    registerComponent.classList.remove("hide")
    loginComponent.classList.add("hide")
    homeComponent.classList.add("hide")
    historyComponent.classList.add("hide")
    detailHistory.classList.add("hide")
    AdminOrderComponent.classList.add("hide")
    AdminOrderDetail.classList.add("hide")
})


home.addEventListener('click',()=>{
    deleteActive()
    navItem[0].classList.add('active')
    homeComponent.classList.remove("hide")
    adminComponent.classList.add("hide")
    historyComponent.classList.add("hide")
    detailHistory.classList.add("hide")
    AdminOrderComponent.classList.add("hide")
    AdminOrderDetail.classList.add("hide")
})


