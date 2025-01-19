export default function myContact(){
    if (document.forms["contact"]["name"].value === ""){
      document.getElementById("name-warn").innerHTML="Please fill out your name.";
    } else if (document.forms["contact"]["name"].value !== "" && document.forms["contact"]["name"].value.length > 100){
      document.getElementById("name-warn").innerHTML="Your name should not exceed 100 characters.";
    } else{
      document.getElementById("name-warn").innerHTML="";
    }

    if (document.forms["contact"]["email"].value === ""){
      document.getElementById("email-warn").innerHTML="Please fill out your email.";
    }
    else if (document.forms["contact"]["email"].value !== "" && document.forms["contact"]["email"].value.length > 100){
      document.getElementById("email-warn").innerHTML="Your email should not exceed 100 characters.";
    }
    else{
      document.getElementById("email-warn").innerHTML="";
    }

    if (document.forms["contact"]["phone"].value === ""){
      document.getElementById("phone-warn").innerHTML="Please fill out your phone number.";
    }
    else{
      document.getElementById("phone-warn").innerHTML="";
    }

    if (document.forms["contact"]["address"].value === ""){
      document.getElementById("address-warn").innerHTML="Please fill out your address.";
    }
    else if (document.forms["contact"]["address"].value !== "" && document.forms["contact"]["address"].value.length < 15){
      document.getElementById("address-warn").innerHTML="Your address should not be shorter than 15 characters.";
    }
    else if (document.forms["contact"]["address"].value !== "" && document.forms["contact"]["address"].value.length > 250){
      document.getElementById("address-warn").innerHTML="Your address should not exceed 250 characters.";
    }
    else{
      document.getElementById("address-warn").innerHTML="";
    }

    if(document.forms["contact"]["bank-or-cod"].value===""){
      document.getElementById("payment-method-warn").innerHTML="Please choose a payment method.";
    }
    else{
      document.getElementById("payment-method-warn").innerHTML="";
    }
}
