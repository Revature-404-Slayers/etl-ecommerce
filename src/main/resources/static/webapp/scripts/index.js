

function $(x){
    return document.getElementById(x)
}

let loginUrl = "http://localhost:8080/ETL-E-Commerce/login"
let registerUrl = "http://localhost:8080/ETL-E-Commerce/users"

function showRegister() {
    let registerCard = $("register-card")
    let loginCard = $("login-card")
    loginCard.parentNode.replaceChild(registerCard, loginCard)
    registerCard.style.display = "block"
}

async function login() {
 
  let username = $("username").value
  let password = $("password").value
  let user = {
    "username": username,
    "password": password
  }

  const rawResponse = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(user)
  })
  .then(resp => {
    return resp.json()
  })
  .then(() => {
    redirect: window.location.replace("http://localhost:8080/ETL-E-Commerce/dashboard.html")
  })
  .catch(error => {
    alert("Invalid Credentials")
    location.reload()
  })
 /*  if(content =! undefined) {
    redirect: window.location.replace("http://localhost:8080/ETL-E-Commerce/dashboard.html")
  } else {
    location.reload()
    await alert("Invalid Credentials")
  } */
  
}

let password = $("reg-password")
let confirm_password = $("confirm-password")

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Do not Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

async function register() {
  let firstName = $("first-name").value
  let lastName = $("last-name").value
  let username = $("reg-username").value
  let regPassword = $("reg-password").value
  
  let user = {
      'firstName': firstName,
      'lastName': lastName,
      'username': username,
      'password': regPassword
  }

  let response = await fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(user)
  })
  .then((resp) => {
    return resp.text()
  })
  .then((data) => {
    if (data == 'User registered') {  
      alert("Registration Successful, Please Log In")
      location.reload()  
    } else {
      alert("Username Not Available")
      location.reload()
      .then(showRegister())
    }
  })
  .catch(error => {
    alert(error)
    location.reload
  })

}

