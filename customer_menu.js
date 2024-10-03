// import { orders } from "./orders.js";

// let sampleorders = orders;
// let storedOrders = JSON.parse(sessionStorage.getItem('orders')) || [];

// let Fullorders = [...storedOrders];

// console.log(orders);

let FullItems = JSON.parse(sessionStorage.getItem('items')) || [];

let Fullorders = JSON.parse(sessionStorage.getItem('orders')) || [];

function loadCustomers() {

    let customerTable = document.getElementById('customerTable');

    let tableBody = `<tr>
    <th>ORDER ID</th>
    <th>CUSTOMER DETAILS</th>
    <th>TIME & DATE</th>
    <th>ITEM LIST</th>
    <th>TOTAL</th>
    <th>DISCOUNT</th>
    <tr>
    `;

    Fullorders.forEach(order=>{

        tableBody += `<tr>
        <td>${order.orderId}</td>
        <td>${order.customerDetails.customerName} (${order.customerDetails.telephoneNumber})</td>
        <td>${order.orderTimeandDate}</td>
        <td>${order.orderItems.join(', ')}</td>
        <td>${order.orderTotal.toFixed(2)}</td>
        <td>${order.orderDiscount}</td>
        </tr>`;
    });

    customerTable.innerHTML = tableBody;


    customerTable.addEventListener('click', (event) => {
        if (event.target.tagName === 'TD') {
            const row = event.target.parentNode;
            
            const orderId = row.cells[0].textContent;
            const customerDetails = row.cells[1].textContent;
            const orderTimeandDate = row.cells[2].textContent;
            const orderItems = row.cells[3].textContent;
            const orderTotal = row.cells[4].textContent;
            const orderDiscount = row.cells[5].textContent;

            document.getElementById('input_orderId').value = orderId;
            document.getElementById('input_customer_Details').value = customerDetails;
            document.getElementById('input_orderTimeandDate').value = orderTimeandDate;
            document.getElementById('input_orderItems').value = orderItems;
            document.getElementById('input_orderTotal').value = orderTotal;
            document.getElementById('input_orderDiscount').value = orderDiscount;
        }
    });    
}

//Search Customers

function SearchOrders ()  {

    const searchInput = document.getElementById('searchOrder').value.toLowerCase();
    const customerTable = document.getElementById("customerTable");

    let tablebody = `<tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER DETAILS</th>
                        <th>TIME & DATE</th>
                        <th>ITEM LIST</th>
                        <th>TOTAL</th>
                        <th>DISCOUNT</th>         
                    </tr>`;

                    Fullorders.forEach(order => {
        const orderId = order.orderId.toLowerCase();
        const customerName = order.customerDetails.customerName.toLowerCase();
        if (orderId.includes(searchInput) || customerName.includes(searchInput)) {
            tablebody += `<tr>
                <td>${order.orderId}</td>
                <td>${order.customerDetails.customerName} (${order.customerDetails.telephoneNumber})</td>
                <td>${order.orderTimeandDate}</td>
                <td>${order.orderItems.join(', ')}</td>
                <td>${order.orderTotal.toFixed(2)}</td>
                <td>${order.orderDiscount}</td>
            </tr>`;
        }
    });

    customerTable.innerHTML = tablebody;

}


//Delete Customer
document.getElementById("deleteCustomerButton").addEventListener("click", function() {

    const orderId = document.getElementById("input_orderId").value;
    for (let i = 0; i < Fullorders.length; i++) {

        if (Fullorders[i].orderId === orderId) {

            Fullorders.splice(i, 1);
            sessionStorage.setItem("orders",JSON.stringify(Fullorders));
            loadCustomers();
            clearInputFields();
            break;
      }
    }

});


//Update Customer
document.getElementById("updateCustomerButton").addEventListener("click", function() {

    const orderId = document.getElementById('input_orderId').value;

    const customerDetails = document.getElementById('input_customer_Details').value;
    const customerName = customerDetails.split(' (')[0];
    const customerPhoneNumber = customerDetails.split(' (')[1].slice(0, -1);

    const orderItems = document.getElementById('input_orderItems').value;
    
    
    for (let i = 0; i < Fullorders.length; i++) {

        if (Fullorders[i].orderId === orderId) {

            Fullorders[i].customerDetails.customerName = customerName;
            Fullorders[i].customerDetails.telephoneNumber = customerPhoneNumber;
            Fullorders[i].orderItems = orderItems.split(', ');
            Fullorders[i].orderTimeandDate = document.getElementById('input_orderTimeandDate').value;
            Fullorders[i].orderTotal = parseFloat(document.getElementById('input_orderTotal').value);
            Fullorders[i].orderDiscount = document.getElementById('input_orderDiscount').value;

            sessionStorage.setItem("orders",JSON.stringify(Fullorders));
            
            loadCustomers();
            clearInputFields();
            break;
        }
    }
});




//Clear Input Fields

function clearInputFields() {

    document.getElementById('input_orderId').value = "";
            document.getElementById('input_customer_Details').value = "";
            document.getElementById('input_orderTimeandDate').value = "";
            document.getElementById('input_orderItems').value = "";
            document.getElementById('input_orderTotal').value = "";
            document.getElementById('input_orderDiscount').value ="";
}


//Go To Home Page 

document.getElementById("exitButton").addEventListener("click",function() {

    window.location.href = "index.html";
});


window.onload = function() {


    loadCustomers();
    
    
}