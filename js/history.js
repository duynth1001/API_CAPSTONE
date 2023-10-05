let historyTable = document.getElementById('historyTable')
let historyComponent = document.querySelector(".history")
let detailHistory = document.querySelector(".historyDetail")
let user = JSON.parse(localStorage.getItem("user"))
let AdminOrderComponent = document.getElementById("adminOrder")
let AdminOrderDetail = document.getElementById("adminOrderDetail")



   

const historyDetail = (id) =>{
    historyComponent.classList.add("hide")
    detailHistory.classList.remove("hide")
    axios.get(`https://651320e48e505cebc2e99e3a.mockapi.io/bill/${id}`)
    .then((data) => {
        let bill =data.data
        document.getElementById("userName").innerText = "User: " + user.nameLogin
        document.getElementById("userEmail").innerText ="Email: " + user.emailLogin
        document.getElementById("date").innerText = "Date: " + bill.date

        let newData =  bill.bill.map((item,index) =>{
            return(
               ` <tr>
                    <th>${index+1}</th>
                    <th>${item.name}</th>
                    <th><img src="${item.imageUrl}"/></th>
                    <th>${item.qty}</th>
                    <th>${item.price}$</th>
                    <th>${item.price * item.qty}$</th>
                </tr>`
            )
        }).join("")
        document.getElementById("historyTableDetail").innerHTML = newData
    })
}


const goToDetail =(id) =>{
    AdminOrderComponent.classList.add("hide")
    AdminOrderDetail.classList.remove("hide")
    axios.get(`https://651320e48e505cebc2e99e3a.mockapi.io/bill/${id}`)
    .then((data) =>{
        let bill =data.data
        document.getElementById("adminOrderCustomer").innerText ="Khách hàng đặt: "+ bill.user
        document.getElementById("adminOderDate").innerText ="Ngày đặt: "+ bill.date
        document.getElementById("adminOderTotal").innerText ="Tổng hóa đơn: "  + bill.total+"$"
        let newData =  bill.bill.map((item,index) =>{
            return(
               ` <tr>
                    <th>${index+1}</th>
                    <th>${item.name}</th>
                    <th><img src="${item.imageUrl}"/></th>
                    <th>${item.qty}</th>
                    <th>${item.price}$</th>
                    <th>${item.price * item.qty}$</th>
                </tr>`
            )
        }).join("")
       
        document.getElementById("AdminOderDetailTable").innerHTML = newData
    })
}


const getHistory = () =>{
    let newData;
    if(localStorage.getItem("user")){
        const {emailLogin} = user;
        axios.get("https://651320e48e505cebc2e99e3a.mockapi.io/bill")
        .then((data) => {
            let listBill = data.data
            document.getElementById("userName").innerText = "Khách hàng: " + user.nameLogin
            let billUser = listBill.filter((item) =>item.user === emailLogin)
          
            newData =  billUser.map((item,index) => {
                return(
                    `<tr onclick="historyDetail(${item.id})" class="tableDetail"  >
                        <th>${index+1}</th>
                        <th>${item.date}</th>
                        <th>${item.total}$</th>
                    </tr>`
                )
            }).join("")
            document.getElementById('historyTable').innerHTML = newData
        })
    }
}
