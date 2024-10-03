export let orders = [
    {
        orderId: "O1001",
        customerDetails:{
            customerName: "John Doe",
            telephoneNumber: "1234567890"
        },
        orderTimeandDate: "2022-01-01 12:00:00",
        orderItems: ["Burger", "Fries"],
        orderTotal: 1000.00,
        orderDiscount: "10%"   
    },
    {
        orderId: "O1002",
        customerDetails:{
            customerName: "Jane Smith",
            telephoneNumber: "9876543210"
        },
        orderTimeandDate: "2022-01-02 14:30:00",
        orderItems: ["Pizza", "Salad"],
        orderTotal: 1500.00,
        orderDiscount: "5%"
    },
    {
        orderId: "O1003",
        customerDetails:{
            customerName: "Michael Johnson",
            telephoneNumber: "5555555555"
        },
        orderTimeandDate: "2022-01-03 16:45:00",
        orderItems: ["Burger", "Fries"],
        orderTotal: 1200.00,
        orderDiscount: "15%"
    },
    {
        orderId: "O1004",
        customerDetails:{
            customerName: "Emily Davis",
            telephoneNumber: "1111111111"
        },
        orderTimeandDate: "2022-01-04 09:20:00",
        orderItems: ["Pasta", "Salad"],
        orderTotal: 1800.00,
        orderDiscount: "20%"
    }
];
// sessionStorage.setItem("orders",JSON.stringify(orders));
