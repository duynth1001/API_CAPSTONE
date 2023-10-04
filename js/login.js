
let admin = document.getElementById('admin')
let login = document.getElementById("loginToShop")
let loginComponent = document.querySelector(".login")
let registerComponent = document.querySelector(".register")
let homeComponent = document.querySelector(".home")
let navItem = document.querySelectorAll(".nav-item .nav-link")
let logout =  document.getElementById("logout")
let adminComponent = document.querySelector(".admin")
let registerToShop = document.getElementById("registerToShop")

const deleteActive = () =>{
    navItem.forEach((item) =>{
        item.classList.remove("active")
    })
}

function saveAdmin(user){ 
        if(user){
            if(user.emailLogin.toLowerCase() == "admin2003@gmail.com"){
                admin.classList.remove("hide")
                homeComponent.classList.remove("hide")
            }
            else{
            admin.classList.add("hide")
            }
        }
}
const saveUser = () =>{
   if(localStorage.getItem("user")){
        let users = JSON.parse(localStorage.getItem("user"))
        deleteActive()
        navItem[0].classList.add('active')
        document.getElementById("login").classList.add("hide")
        document.getElementById("register").classList.add("hide")
        document.getElementById("history").classList.remove("hide")
        homeComponent.classList.remove("hide")
        loginComponent.classList.add("hide")
        registerComponent.classList.add("hide")
        logout.classList.remove("hide")
        document.getElementById("account").innerText = users.nameLogin 
        saveAdmin(users)
   }
}
saveUser()



function ValidateEmail(mail) 
{
 if(mail.length == 0){
    return "empty"
 }
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }
  else{
    return false;
  }
}
function ValidatePassword(password){
    if(password.length >= 6){
        return true;
    }
    else{
        return false
    }
}

login.addEventListener("click",(e) =>{
    let mess = document.getElementById('loginMess')
    e.preventDefault()
    let email = document.getElementById("loginInputEmail").value
    let password = document.getElementById("loginInputPassword").value
    if(ValidateEmail(email) == "empty"){
        mess.innerText = "Email is empty!"
    }
    else if(!ValidateEmail(email)){
        mess.innerText = "Invalid email"
    }
    else{
        if(ValidatePassword(password)){
            axios.get('https://651320e48e505cebc2e99e3a.mockapi.io/users')
            .then((data) =>{
                let index = data.data.findIndex((user) => user.emailInput == email && user.passwordInput == password)
                if(index >= 0){
                    let emailLogin = email;
                        let nameLogin = email.substring(0,email.indexOf('@'))
                        let login = true;
                        let data = {emailLogin,nameLogin,login}
                        localStorage.setItem("user", JSON.stringify(data))
                        saveUser()
                }
                else{
                    mess.innerText = "Email or password wrong"
                }
            })
        }
        else{
            mess.innerText = "Password have more than 6 character"
        }
    }
    
    
})


logout.addEventListener("click",()=>{
    homeComponent.classList.remove("hide")
    document.getElementById("history").classList.add("hide")
    document.getElementById("account").innerText = "Account"
    logout.classList.add("hide")
    document.getElementById("login").classList.remove("hide")
    document.getElementById("register").classList.remove("hide")
    localStorage.removeItem("user")
    deleteActive()
    admin.classList.add("hide")
    navItem[0].classList.add("active")
    adminComponent.classList.add("hide")
})


admin.addEventListener("click",()=>{
    adminComponent.classList.remove("hide")
    deleteActive()
    navItem[1].classList.add("active")
    homeComponent.classList.add("hide")
})



registerToShop.addEventListener("click",(e) =>{
    e.preventDefault()
    let emailInput = document.getElementById("registerInputEmail").value
    let passwordInput = document.getElementById("registerInputPassword").value
    let passwordInput1 = document.getElementById("registerInputPassword2").value
    let mess = document.getElementById("registerMess")
    if(ValidateEmail(emailInput)){
        if(ValidatePassword(passwordInput)){
            if(passwordInput === passwordInput1){
                axios.get("https://651320e48e505cebc2e99e3a.mockapi.io/users")
                .then((data) =>{
                    let count =0 ;
                    data.data.forEach((item) =>{
                        if(item.email === emailInput){
                            mess.innerText = "Email exist"
                            count++;
                        }
                    })
                    if(count == 0){
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                .then((data) =>{
                    if(data){
                        let newUser = {emailInput,passwordInput}
                        axios.post("https://651320e48e505cebc2e99e3a.mockapi.io/users",newUser)
                        .then(() => alert("Register successfully"))
                        navItem[0].classList.add("active")
                        loginComponent.classList.remove("hide")
                        registerComponent.classList.add("hide")
                        deleteActive()
 
                    }
                })
              
            }else{
                mess.innerText = "Password confirm wrong"
            }
        }
        else{
            mess.innerText = "Password have more than 6 character"
        }
    }
    else{
        mess.innerText = "Email wrong"
    }
})





