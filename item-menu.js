
let FullItems = JSON.parse(sessionStorage.getItem('items')) || [];

let Fullorders = JSON.parse(sessionStorage.getItem('orders')) || [];

//Display Table
function displayItems() {


    let itemtable = document.getElementById("itemTable");
   
    let tablebody = `<tr>
                        <th>ITEM ID</th>
                        <th>ITEM NAME</th>
                        <th>PRICE</th>
                        <th>DISCOUNT</th>
                        <th>EXPIRE DATE</th>
                        
                    </tr>`;

    const today = new Date();               
    FullItems.forEach (item=> {

        const expireDate = new Date(item.expireDate);
        const rowClass = expireDate < today ? 'expired' : ''; 

        tablebody += `<tr class="${rowClass}">
        <td>${item.itemCode}</td>
        <td>${item.itemName}</td>
        <td>${item.itemPrice}</td>
        <td>${item.itemDiscount}</td>
        <td>${item.expireDate}</td>
        </tr>`
        
    })
    itemtable.innerHTML = tablebody;


    itemtable.addEventListener('click', (event) => {
        if (event.target.tagName === 'TD') {
            const row = event.target.parentNode;
            const itemCode = row.cells[0].textContent;
            const itemName = row.cells[1].textContent;
            const itemPrice = row.cells[2].textContent;
            const itemDiscount = row.cells[3].textContent;
            const expireDate = row.cells[4].textContent;

            document.getElementById('input_itemId').value = itemCode;
            document.getElementById('input_itemName').value = itemName;
            document.getElementById('input_itemPrice').value = itemPrice;
            document.getElementById('input_itemDiscount').value = itemDiscount;
            document.getElementById('input_expireDate').value = expireDate;
        }
    });

}



//Filter Table By Name or ID

function filterTable() {
    const searchInput = document.getElementById('searchItem').value.toLowerCase();
    const itemtable = document.getElementById("itemTable");

    let tablebody = `<tr>
                        <th>ITEM ID</th>
                        <th>ITEM NAME</th>
                        <th>PRICE</th>
                        <th>DISCOUNT</th>
                        <th>EXPIRE DATE</th>
                        
                    </tr>`;

    FullItems.forEach(item => {
        const itemName = item.itemName.toLowerCase();
        const itemCode = item.itemCode.toLowerCase();
        if (itemName.includes(searchInput) || itemCode.includes(searchInput)) {
            tablebody += `<tr>
                <td>${item.itemCode}</td>
                <td>${item.itemName}</td>
                <td>${item.itemPrice}</td>
                <td>${item.itemDiscount}</td>
                <td>${item.expireDate}</td>
            </tr>`;
        }
        
        
    });

    itemtable.innerHTML = tablebody;
}

//Auto Increament ID

function autoIncreamentId() {

    const getlastid = FullItems[FullItems.length - 1].itemCode;
    const onlyid= getlastid.slice(1);
    const newid = parseInt(onlyid) + 1;
    const itemCode = `B${newid}`;
    console.log(itemCode);

    document.getElementById('input_itemId').value = itemCode;

}

//Add Item

document.getElementById('addItemButton').addEventListener('click', function() {
    
    autoIncreamentId();
    const itemCode = document.getElementById('input_itemId').value;
    const itemName = document.getElementById('input_itemName').value;
    const itemPrice = document.getElementById('input_itemPrice').value;
    const itemDiscount = document.getElementById('input_itemDiscount').value;
    const expireDate = document.getElementById('input_expireDate').value;
    
    FullItems.push({itemCode, itemName, itemPrice, itemDiscount, expireDate});
    sessionStorage.setItem('items', JSON.stringify(FullItems));
    displayItems();
    clearInputFields();
    autoIncreamentId();
    
});



//Delete Item

document.getElementById('deleteItemButton').addEventListener('click', function () {

    const itemCode = document.getElementById('input_itemId').value;

    for (let i = 0; i < FullItems.length; i++) {

        if (FullItems[i].itemCode === itemCode) {

            FullItems.splice(i,1);  
            sessionStorage.setItem('items', JSON.stringify(FullItems));   
            displayItems();
            clearInputFields();
            autoIncreamentId();
            break;
        }
    }
} );
    



//Modify Item

document.getElementById('updateItemButton').addEventListener('click', function() {
   
    const itemCode = document.getElementById('input_itemId').value;
    const itemName = document.getElementById('input_itemName').value;
    const itemPrice = document.getElementById('input_itemPrice').value;
    const itemDiscount = document.getElementById('input_itemDiscount').value;
    const expireDate = document.getElementById('input_expireDate').value;

    for (let i = 0; i < FullItems.length; i++) {

        if (FullItems[i].itemCode === itemCode) {

            FullItems[i].itemName = itemName;
            FullItems[i].itemPrice = itemPrice;
            FullItems[i].itemDiscount = itemDiscount;
            FullItems[i].expireDate = expireDate;
            sessionStorage.setItem('items', JSON.stringify(FullItems));
            displayItems();
            clearInputFields();
            autoIncreamentId();
            break;
        }
    }
    
});


//Set Input Fields to Empty

function clearInputFields() {

    //document.getElementById('input_itemId').value = "";
    document.getElementById('input_itemName').value = "";
    document.getElementById('input_itemPrice').value = "";
    document.getElementById('input_itemDiscount').value = "";
    document.getElementById('input_expireDate').value = "";
}



window.onload = function() {

  displayItems();
  autoIncreamentId();
 
};