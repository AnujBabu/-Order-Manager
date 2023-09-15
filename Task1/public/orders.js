const urlParams = new URLSearchParams(window.location.search);
const phoneno = urlParams.get('phoneno');
const id = urlParams.get('id');

const addOrderForm = document.querySelector('.new-order-form');
addOrderForm.addEventListener('submit', event => {
    event.preventDefault();
    fetch("/order", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "user_id": `${id}`,
                "sub_total": `${event.target['new-order-subtotal'].value}`,
                "phone_number": `${phoneno}`
            })
        })
        .then(fetchOrders())
        .catch(err => console.log(err));
});

function fetchOrders(){
    const orders = document.querySelector(".orders");
    fetch(`/order/${phoneno}`)
        .then(response => response.json())
        .then(res => {
            //console.log(res.data.orders);
            const orderList = res.data.orders;
            let ordersTemplate = "";
            orderList.forEach(order => {
                const orderTemplate = ` <div class="order" style="border: 2px solid black;padding: 10px;margin:10px;width:max-content;">
                                        <h4>User Id:</h4>
                                        <label for="user_id" class="user-id">${order.user_id}</label>
                                        <h4>Sub Total:</h4>
                                        <label for="sub-total" class="sub-total">${order.sub_total}</label>
                                        <h4>Phone No:</h4>
                                        <label for="phoneno" class="phoneno">${order.phone_number}</label>
                                    </div>`;
                ordersTemplate += orderTemplate;
            });
            orders.innerHTML = ordersTemplate;
        })
        .catch(err => console.log(err));
}

fetchOrders();