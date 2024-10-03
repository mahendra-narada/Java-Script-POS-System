// import { items } from './items.js';
// import{ orders } from './orders.js';

// let sampleItems = items;
// let storedItems = JSON.parse(sessionStorage.getItem('items')) || [];

// let FullItems = [...storedItems];

// let sampleOrders = orders;
// let storedOrders = JSON.parse(sessionStorage.getItem('orders')) || [];

// let Fullorders = [...sampleOrders, ...storedOrders];

 let FullItems = JSON.parse(sessionStorage.getItem('items')) || [];

 let Fullorders = JSON.parse(sessionStorage.getItem('orders')) || [];



//Generate  OrderID
function generateOrderID() {

    const getlastid = Fullorders[Fullorders.length - 1].orderId;
    const onlyid= getlastid.slice(1);
    const newid = parseInt(onlyid) + 1;
    const OrderID = `O${newid}`;
    console.log(OrderID);

    document.getElementById('orderId').value = OrderID;
}


//Search Items
document.getElementById('searchButton').addEventListener('click', function() {
    let item = document.getElementById('searchItem').value;  
    let name = document.getElementById('searchItem').value.toLowerCase();
    const today = new Date(); 
    let itemFound =false;
    for(let i=0;i<FullItems.length;i++) {
        if(FullItems[i].itemCode===item || FullItems[i].itemName.toLowerCase().includes(name)) {
            itemFound=true;
            let expireDate = new Date(FullItems[i].expireDate);
            if(expireDate < today) {
                window.alert('Item Expired');
            }
            else{
            document.getElementById('itemId').value = FullItems[i].itemCode;
            document.getElementById('itemName').value = FullItems[i].itemName;
            document.getElementById('itemPrice').value = FullItems[i].itemPrice;
            document.getElementById('itemDiscount').value = FullItems[i].itemDiscount;   
            }                 
        }
        
    }
    if(!itemFound){
        window.alert("Item Cant Find");
    }
});

//Add To Cart
document.getElementById('addToCartButton').addEventListener('click', function() {

    if(document.getElementById('itemQuantity').value <= 0){
        window.alert('Quantity must be greater than 0');
        return;
    }
    else{
        //Add Item Names To Cart
    const itemName = document.getElementById('itemName').value;
    document.getElementById('orderItems').textContent += itemName + ', ';


    //Takes Item Price and Quantity
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const quantity  = parseInt(document.getElementById("itemQuantity").value);
    
    let itemDiscountPercentage=0; 
    
    //Calculates Item Discount
    if(document.getElementById('itemDiscount').value === '-') {
        itemDiscountPercentage=0;  
        
    }
    else{
        itemDiscountPercentage =document.getElementById("itemDiscount").value.replace("%","");      
    }

    //Calculates Total Item Price
    let itemPriceWithQuantity = itemPrice*quantity;

    //Calculates Total Item Discount
    let TotalItemDiscount = quantity*(itemPrice-(((100-parseFloat(itemDiscountPercentage))*itemPrice)/100));

    //Calculates Total Item Price After Discount
    let totalItemPrice = itemPriceWithQuantity-TotalItemDiscount;

    //Pass values to UpdateOrder
    UpdateOrder(totalItemPrice,TotalItemDiscount);
    
    
    }
});

// Calculate Order Total Code
let TotalOrderPrice = 0;
let TotalOrderDiscount = 0;

function UpdateOrder( totalItemPrice,TotalItemDiscount) {

    TotalOrderPrice += totalItemPrice;
    TotalOrderDiscount += TotalItemDiscount;
    document.getElementById('orderTotal').value = TotalOrderPrice;
    document.getElementById('orderDiscount').value = TotalOrderDiscount;  
}


//Place Order
document.getElementById('placeOrderButton').addEventListener('click', function() {
    
    // Getting the values from the form
    const orderId = document.getElementById('orderId').value; 
    const customerName = document.getElementById('customerName').value;
    const telephoneNumber = document.getElementById('telephoneNumber').value;
    const orderItems = document.getElementById('orderItems').textContent.split(', ').filter(item => item.trim() !== ""); 
    const orderDiscount = document.getElementById('orderDiscount').value;
    const orderTotal = parseFloat(document.getElementById('orderTotal').value); 

    // Getting the current time and date
    const orderTimeandDate = new Date().toISOString().replace('T', ' ').slice(0, 19); 

    if(customerName === '' || telephoneNumber === '' || orderItems.length === 0 || orderTotal === 0) {

        window.alert('Please fill in all required fields');
    }
    else{

    const newOrder = {
        orderId: orderId,
        customerDetails: {
            customerName: customerName,
            telephoneNumber: telephoneNumber
        },
        orderTimeandDate: orderTimeandDate, // Current time and date
        orderItems: orderItems, // List of items
        orderTotal: orderTotal, // Numeric value for total
        orderDiscount: orderDiscount // Discount as a string
    };

    // Add the new order to the orders array
    Fullorders.push(newOrder);
    sessionStorage.setItem('orders', JSON.stringify(Fullorders));

    console.log(Fullorders); 

    window.alert('Order Placed Successfully');


    //Generate Pdf

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set up the document
    doc.text("Order Confirmation", 10, 10);
    doc.text(`Order ID: ${orderId}`, 10, 20);
    doc.text(`Customer Name: ${customerName}`, 10, 30);
    doc.text(`Phone Number: ${telephoneNumber}`, 10, 40);
    doc.text(`Order Date and Time: ${orderTimeandDate}`, 10, 50);
    doc.text(`Order Items: ${orderItems}`, 10, 60);
    doc.text(`Total: $${orderTotal}`, 10, 70);
    doc.text(`Discount: ${orderDiscount}`, 10, 80);

    // Save the PDF
    doc.save(`Order_${orderId}.pdf`);

    ClearInputFields();
    generateOrderID();

    }
});

//Go To Home Page 

document.getElementById("exitButton").addEventListener("click",function() {

    window.location.href = "index.html";
});

//Clear Input Fields

function ClearInputFields() {

    document.getElementById("orderId").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("telephoneNumber").value = "";
    document.getElementById("orderItems").textContent = "";
    document.getElementById("orderTotal").value = "";
    document.getElementById("orderDiscount").value = "";
    document.getElementById("itemId").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemDiscount").value = "";

}

// function sessionStorageInitilaize() {

//     if (!sessionStorage.getItem('initialized')) {
        
//         storedItems = JSON.parse(sessionStorage.getItem('items')) || [];
//         FullItems = [...sampleItems, ...storedItems];

//         storedOrders = JSON.parse(sessionStorage.getItem('orders')) || [];
//         Fullorders = [...sampleorders, ...storedOrders];

//         sessionStorage.setItem('initialized', 'true'); 
//         return FullItems;
//     }
//     else{

//         return FullItems;
//     }
// }



window.onload = function() {
    // sessionStorageInitilaize();
    generateOrderID();
}


