import { items } from "./items.js";
import { orders } from "./orders.js";

function sessionStorageInitilaize() {

    if (!sessionStorage.getItem('initialized')) {
        
        sessionStorage.setItem('items', JSON.stringify(items));

        sessionStorage.setItem("orders",JSON.stringify(orders));
        
        sessionStorage.setItem('initialized', 'true'); 
        
    }
    else{
        
    }
}

window.onload = function() {

    sessionStorageInitilaize();
}