/* TO DO

*/


/* 
   serviceList is an object that will define all of
   the services that are offered. The service ID 
   will be the object key, and  each subobject will
   store the following items:

     desc:  Text description for the service and option

     price: pre-tax price for service

     image: filename of the image file in the media folder
            representing this service 

     sideImage: filename of the secondary image file in the
            media folder to be displayed in the shopping cart
   
   These values are used to generate the text for the
   shopping cart and order summary

*/


const serviceList = {
    walk30: {
        desc: "Dog walking for 30 minutes",
        price: 55,
        image: "walking.png",
        sideImage: "frank_walk_sq.jpg"
    },
    walk60: {
        desc: "Dog walking for 60 minutes",
        price: 95,
        image: "walking.png",
        sideImage: "frank_walk_sq.jpg"
    },
    boardingNight: {
        desc: "Dog boarding for one night",
        price: 120,
        image: "boarding.png",
        sideImage: "frank_sleep_sq.jpg"
    },
    boardingWeek: {
        desc: "Dog boarding for one week",
        price: 700,
        image: "boarding.png",
        sideImage: "frank_sleep_sq.jpg"
    },
    trainOrientation: {
        desc: "Dog training - Beginners Orientation",
        price: 65,
        image: "training.png",
        sideImage: "frank_play_sq.jpg"
    },
    trainBasic: {
        desc: "Dog training - Basic Obedience",
        price: 90,
        image: "training.png",
        sideImage: "frank_play_sq.jpg"
    }
}

// Function to update secondary options based on the selected primary option
function updateOptions(selectedValue) {
        // Clear previous secondary options
        document.getElementById("secondaryOptionsContainer").innerHTML = "";

        // Add new secondary options based on the selected primary option
        switch (selectedValue) {
            case "dogwalk":
                // Add side photo until shopping cart appears
                document.getElementById("shoppingCart").innerHTML = `<h3>Dog Walking</h3>
                <img class="sidePic" src="media/frank_walk_sq.jpg" alt="Frank the dog walking"/>`;

                // Add secondary options for Option 1
                document.getElementById("secondaryOptionsContainer").innerHTML = `
                <h3>How long do you want your dog walked?</h3>
                <ul>
                <li>
                <input type="radio" name="secondaryOptions" value="30" id="30">
                <label for="30">30 Minutes</label>
                </li>

                <li>
                <input type="radio" name="secondaryOptions" value="60" id="60">
                <label for="60">60 Minutes</label>
                </li>
                </ul>
                `;
                break;


            case "train":
                // Add side photo until shopping cart appears
                document.getElementById("shoppingCart").innerHTML = `<h3>Dog Training</h3>
                <img class="sidePic" src="media/frank_play_sq.jpg" alt="Frank the dog playing"/>`;

                // Add secondary options for Option 2
                document.getElementById("secondaryOptionsContainer").innerHTML = `
                <h3>What kind of training session would you like to book?</h3>
                <ul>
                <li>
                <input type="radio" name="secondaryOptions" value="orientation" id="orientation">
                <label for="orientation">Beginners Orientation</label>
                </li>

                <li>
                <input type="radio" name="secondaryOptions" value="basic" id="basic">
                <label for="basic">Basic Obedience</label>
                </li>
                </ul>
                `;
                break;

                case "board":
                // Add side photo until shopping cart appears
                document.getElementById("shoppingCart").innerHTML = `<h3>Dog Boarding</h3>
                <img class="sidePic" src="media/frank_sleep_sq.jpg" alt="Frank the dog sleeping"/>`;
                
                // Add secondary options for Option 3
                document.getElementById("secondaryOptionsContainer").innerHTML = `
                <h3>How long do you want your dog boarded?</h3>
                <ul>
                <li>
                <input type="radio" name="secondaryOptions" value="nightly" id="nightly">
                <label for="nightly">Nightly</label>
                </li>

                <li>
                <input type="radio" name="secondaryOptions" value="weekly" id="weekly">
                <label for="weekly">Weekly</label>
                </li>
                </ul>
                `;
                break;

            // Add cases for other primary options if needed

            default:
                // Default case if no specific secondary options are needed
                break;
        }
        // Add Event Listeners to the newly added inputs
        addOptionsEventListeners();
}

// Function to update order summary
// This is called when the customer
// info page loads, and this reads 
// the service chosen from the cookie
// and generates the text for the 
// order summary on the customer data
// entry page
function updateOrderSummary() {
    // Use USDollar to format the number
    // as a price for US currency
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    // Retrieve the value from the cookie
    let selectedValue = getCookie("serviceSelected");
    console.log(selectedValue);
    
    // Check for the cookie. We should NOT be on this page 
    // without a cookie, so its possibly the security
    // settings in the browser do not allow this.
    // Generate a message if no value has been found in
    // the cookie, otherwise, create the order summary
    // for the selected service
    if (selectedValue==="") {
        document.getElementById("orderSummary").innerHTML =`
        <div class="grid-col-span-2">
        <h3>No Cookies Found</h3>
        <p>Order cannot be displayed. 
        Chrome cookies do not work with local files.
        </p>
        <p>Try Firefox, or use Live Server to fix</p>
        </div>`;
    } else {
    document.getElementById("orderSummary").innerHTML = `<div class="grid-col-span-2"><h3>Order Summary:</h3>
        <h4>${serviceList[selectedValue]["desc"]}</h4>
        </div>
    <div>
        <img src="media/${serviceList[selectedValue]["image"]}">
    </div>
    <div>
        <div class="priceTable">
        <div>Subtotal:</div><div class="price">${USDollar.format(serviceList[selectedValue]["price"])}</h4></div>
        <div>Tax:</div><div class="price">${USDollar.format(serviceList[selectedValue]["price"]*.105)}</h4></div>
        <div>Total:</div><div class="price">${USDollar.format(serviceList[selectedValue]["price"]*1.105)}</h4></div>
        </div>
    </div>
    `;
    }
}

// Updates the Customer Address information and delivery date information
// on the order summary page
function updateCustInfo() {
    info = JSON.parse(getCookie("custInfo"));
    //console.log(info)
    var apt = "";
    if (info.apt !== "") {
        apt = "Apt. " + info.apt + "<br>";
    }
    document.getElementById("orderAddress").innerHTML = `
    ${info.first} ${info.last}<br>
    ${info.address}<br>
    ${apt}
    ${info.city}, ${info.state}<br>
    ${info.email}<br>
    ${info.phone}
    `;

    const deliveryBy = new Date();
    deliveryBy.setDate(deliveryBy.getDate() + 5)

    var dd = deliveryBy.getDate();
    var mm = deliveryBy.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = deliveryBy.getFullYear();

    var dateString = mm + "/" + dd + "/" + yyyy;
    document.getElementById("orderETA").innerHTML = dateString;
    //console.log(dateString)
}


// Function to update shopping cart
// This is called when the secondary
// options have been chosen / updated.
// This creates the content for the
// shopping cart side bar, and saves 
// the chosen service in a cookie
function updateCart(selectedValue) {
    // Use USDollar to format the number
    // as a price for US curren
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    // Add content to shopping cart based on the selected value
    document.getElementById("shoppingCart").innerHTML = `

    <h3>Order Summary:</h3>
    <img class="sidePic" src="media/${serviceList[selectedValue]["sideImage"]}" alt="Frank the dog walking"/>
    <h4>${serviceList[selectedValue]["desc"]}</h4>
    <img src="media/${serviceList[selectedValue]["image"]}">
    <div class="priceTable">
    <div>Subtotal:</div><div class="price">${USDollar.format(serviceList[selectedValue]["price"])}</h4></div>
    <div>Tax:</div><div class="price">${USDollar.format(serviceList[selectedValue]["price"]*.105)}</h4></div>
    <div>Total:</div><div class="price">${USDollar.format(serviceList[selectedValue]["price"]*1.105)}</h4></div>
    </div>
    <div class="sidenote">
    Personal details will be entered on the next page.
    </div>
    
    `;

    setCookie("serviceSelected",selectedValue,4);
}

// Helpder function to read the state of the radio
// check boxes to determine which service and which
// secondary options have been selected
// The 'service' string must match the id used in the
// serviceList object.
// If a complete set of options has not been selected,
// this will return an empty string
// This is used by the validateForm function
function getOrderInfo() {
    var service="";
    if (document.getElementById('dogwalk').checked) {
        if (document.getElementById('30').checked) {
            service='walk30';
        } else if (document.getElementById('60').checked) {
            service='walk60';
        }
    } else if (document.getElementById('train').checked) {
        if (document.getElementById('orientation').checked) {
            service='trainOrientation';
        } else if (document.getElementById('basic').checked) {
            service='trainBasic';
        }
    } else if (document.getElementById('board').checked) {
        if (document.getElementById('nightly').checked) {
            service='boardingNight';
        } else if (document.getElementById('weekly').checked) {
            service='boardingWeek';
        }
    } 
    //console.log(service);
    return service
}

// Verify that a service AND the option for the service
// have been selected.
// If the form fails the validation, display an alert
// and do not allow the form submission.
function validateForm(event) {
    // getOrderInfo returns an empty string if
    // the radio checkboxes are not all selected
    // for a service order, otherwise returns the id
    // of the service
    var service=getOrderInfo();
  
    // If the service is empty, options selection is
    // incomplete. If the form is complete, load the
    // customerinfo page
    if (service==="") {
        alert("Please choose a service and required options!");
    } else {
        window.location.href = "customerinfo.html";
    }
    
    //console.log(service);
}

// This code for setcookie from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

// This code for getcookie from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function addOrderPageEventListeners() {   
    // Add event listeners to the 
    // radio buttons for the service choice
    // This is on the order page
    var serviceButtons = document.getElementsByName("service");
    serviceButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", function() {
            var selectedValue = this.value;
            updateOptions(selectedValue);
        });
    });
    // Add an event listener for the Submit button
    // This is on the order page
    document.getElementById('submitButton').addEventListener('click', validateForm);

    console.log("Primary event listeners registered")
}

function addOptionsEventListeners() {
    // Add event listener to the secondary options radio buttons
    // This is on the order page, and the buttons referenced are
    // dynamically generated on the page
    var optionButtons = document.getElementsByName("secondaryOptions");
    optionButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", function() {
            var selectedValue = getOrderInfo();
            updateCart(selectedValue);
        });

    });
    
    console.log("Secondary event listeners registered")
}

function addCustomerInfoEventListeners() {
    // Add event listener to the customer info submit button
    document.getElementById('submitOrder').addEventListener('click', validateCustomerInfo);
    
    console.log("CustInfo event listeners registered")
}

function addContactFormEventListeners() {
    // Add event listener to the contact us form submit button
    document.getElementById('contactus').addEventListener('click', validateContactForm);
    
    console.log("Contact Info event listeners registered")
}

function validateCustomerInfo(event) {
    event.preventDefault();

    const elementFirstname = document.getElementById('firstname');
    const elementLastname  = document.getElementById('lastname');
    const elementEmail     = document.getElementById('email');
    const elementAddress   = document.getElementById('address');
    const elementApt       = document.getElementById('apt');
    const elementCity      = document.getElementById('city');
    const elementState     = document.getElementById('state');
    const elementZip       = document.getElementById('zip');
    const elementPhone     = document.getElementById('phone');
    
    var firstname = elementFirstname.value.trim();
    var lastname  = elementLastname.value.trim();
    var email     = elementEmail.value.trim();
    var address   = elementAddress.value.trim();
    var apt       = elementApt.value.trim();
    var city      = elementCity.value.trim();
    var state     = elementState.value.trim();
    var zip       = elementZip.value.trim();
    var phone     = elementPhone.value.trim();
    var message = `First name: ${firstname}`;
    //console.log(message);
    
    errorMessage="";
    
    if (firstname === '' ) {
        errorMessage = "<p>First name cannot be empty</p>";
        elementFirstname.className = "error";
    } else {
        elementFirstname.className = "";
    }

    if (lastname === '' ) {
        errorMessage += "<p>Last name cannot be empty</p>";
        elementLastname.className = "error";
    } else {
        elementLastname.className = "";
    }

    if (email === '' ) {
        errorMessage += "<p>Email address cannot be empty</p>";
        elementEmail.className = "error";
    } else {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (re.test(email)) {
            elementEmail.className = "";
        } else {
            errorMessage += "<p>Invalid email address format</p>";
            elementEmail.className = "error";
        }
    }
 
    if (address === '' ) {
        errorMessage += "<p>Address cannot be empty</p>";
        elementAddress.className = "error";
    } else {
        elementAddress.className = "";
    }

    if (city === '' ) {
        errorMessage += "<p>City cannot be empty</p>";
        elementCity.className = "error";
    } else {
        elementCity.className = "";
    }

    if (state === '' ) {
        errorMessage += "<p>State cannot be empty</p>";
        elementState.className = "error";
    } else {
        elementState.className = "";
    }

    if (zip === '' ) {
        errorMessage += "<p>Zip code cannot be empty</p>";
        elementZip.className = "error";
    } else {
        elementZip.className = "";
    }

    if (phone === '' ) {
        errorMessage += "<p>Phone cannot be empty</p>";
        elementPhone.className = "error";
    } else {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (re.test(phone)) {
            elementPhone.className = "";    
        } else {
            errorMessage += "<p>Phone number must be in the format ###-###-####</p>";
            elementPhone.className = "error";
        }   
    }

    document.getElementById("errorMessage").innerHTML = `
    ${errorMessage}
    `;

    // If there is no error message, the form is complete. 
    // Save the information to a cookie, and proceed to the
    // next page
    if (errorMessage === '')  {
        var info = { 
            first: firstname,
            last: lastname,
            email: email,
            address: address,
            apt: apt,
            city: city,
            state: state,
            zip: zip,
            phone: phone
        }
        //console.log(info);

        // We need to stringify the object to store it in 
        // the cookie
        setCookie("custInfo", JSON.stringify(info), 4)
        window.location.href = "summary.html";
    }
}


function validateContactForm(event) {
    event.preventDefault();

    const elementFirstname = document.getElementById('firstname');
    const elementLastname  = document.getElementById('lastname');
    const elementEmail     = document.getElementById('email');
    const elementPhone     = document.getElementById('phone');
    const elementNote      = document.getElementById('note');
    
    var firstname = elementFirstname.value.trim();
    var lastname  = elementLastname.value.trim();
    var email     = elementEmail.value.trim();
    var phone     = elementPhone.value.trim();
    var note      = elementNote.value.trim();

    console.log*=("Validate Contact Form");
    errorMessage="";
    
    if (firstname === '' ) {
        errorMessage = "<p>First name cannot be empty</p>";
        elementFirstname.className = "error";
    } else {
        elementFirstname.className = "";
    }

    if (lastname === '' ) {
        errorMessage += "<p>Last name cannot be empty</p>";
        elementLastname.className = "error";
    } else {
        elementLastname.className = "";
    }

    if (email === '' ) {
        errorMessage += "<p>Email address cannot be empty</p>";
        elementEmail.className = "error";
    } else {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (re.test(email)) {
            elementEmail.className = "";
        } else {
            errorMessage += "<p>Invalid email address format</p>";
            elementEmail.className = "error";
        }
        
    }
 
    if (phone === '' ) {
        errorMessage += "<p>Phone cannot be empty</p>";
        elementPhone.className = "error";
    } else {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (re.test(phone)) {
            elementPhone.className = "";    
        } else {
            errorMessage += "<p>Phone number must be in the format ###-###-####</p>";
            elementPhone.className = "error";
        }
        
    }

    if (note === '' ) {
        errorMessage += "<p>Explanation cannot be empty</p>";
        elementNote.className = "error";
    } else {
        elementNote.className = "";
    }

    document.getElementById("errorMessage").innerHTML = `
    ${errorMessage}
    `;

    // If there is no error message, the form is complete. 
    // Save the information to a cookie, and proceed to the
    // next page
    if (errorMessage === '')  {

        window.location.href = "contactSubmit.html";
    }
}