const loginPannel = document.querySelector(".login-panel");
const signupPannel = document.querySelector(".signup-panel");
loginPannel.style.display = "block";
signupPannel.style.display = "none";
function getLoginPannel(event){
    loginPannel.style.display = "block";
    signupPannel.style.display = "none";
}

function getSignupPannel(event){
    loginPannel.style.display = "none";
    signupPannel.style.display = "block";
}

loginPannel.addEventListener('submit', event => {
    event.preventDefault();
    fetch(`/user/${event.target['phoneno'].value}/${event.target['password'].value}`, {
        method: "get"
    })
    .then(response => response.json())
    .then(result => {
        if(result.status === "OK")  location.href = `orders.html?phoneno=${result.data.phoneno}&id=${result.data._id}`;
        else    alert(result.message);
    })
    .catch(err => console.log(err));
});

signupPannel.addEventListener('submit', event => {
    event.preventDefault();
    fetch(`/user`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "name": `${event.target['name'].value}`,
            "phoneno": `${event.target['phonenon'].value}`,
            "password": `${event.target['passwordn'].value}`
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.status === "OK"){
            alert("Signup Completed!!");
            loginPannel.style.display = "block";
            signupPannel.style.display = "none";
        }else   alert("User Already Exists, Try Again!!");
    })
    .catch(err => alert(err));
});