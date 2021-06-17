// New Customer
const newform = document.getElementById('new-form');
const customerError = document.getElementById('error');
const fnameBox = document.getElementById('fname-textbox');
const snameBox = document.getElementById('sname-textbox');
const addressBox = document.getElementById('address-textbox');
const postcodeBox = document.getElementById('postcode-textbox');

// Existing Customer
const existingform = document.getElementById('existing-form');
const efnameBox = document.getElementById('existing-fname');
const esnameBox = document.getElementById('existing-sname');

document.getElementById("existing-form").style.display = "none";
document.getElementById("new-form").style.display = "none";
document.getElementById("error-form").style.display = "none";

let customerId;

const orderform = document.getElementById("orderform");

const nameFormat = /[`¬!£@#$%^&*()_+=\[\]{};':"\\|,<>\/?~]/;
const postcodeFormat = /[`¬!£@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const valueBox = document.getElementById("price-textbox");
document.getElementById("order-add").disabled = true;

document.getElementById("result-plate").value = localStorage.getItem("platevalue");
document.getElementById("price-textbox").value = localStorage.getItem("plateprice");

newform.addEventListener('submit', (e) => {

    let isCustomerInputValid = true;
    let userInputError = "";
    let messages = [];

    // Validation for present text in all customer boxes
    if ((isTextPresent(fnameBox.value) === false) || (isTextPresent(snameBox.value) === false) || (isTextPresent(addressBox.value) === false) || (isTextPresent(postcodeBox.value) === false))
    {
        userInputError = userInputError + "All text boxes must be filled\n"
        isCustomerInputValid = false;
    }
    // Validation for first and surname exceeding 35 characters each
    if ((isTextLong(fnameBox.value.length, 35) === false) || (isTextLong(snameBox.value.length, 35) === false))
    {
        userInputError = userInputError + "First and surnames can't exceed 35 characters\n"
        isCustomerInputValid = false;
    }
    // Validation for first and surname not containing certain symbols
    if((isTextSymbols(fnameBox.value, nameFormat)) === false || (isTextSymbols(snameBox.value, nameFormat)) === false)
    {
        userInputError = userInputError + "Disallowed symbols in first name or surname\n"
        isCustomerInputValid = false;
    }
    // Validation for address not being longer than 100 characters
    if(isTextLong(addressBox.value.length, 100) === false)
    {
        userInputError = userInputError + "Address can't be longer than 100 characters"
    }
    // Validation for the postcode not containing symbols
    if(isTextSymbols(postcodeBox.value, postcodeFormat) === false)
    {
        userInputError = userInputError + "Symbols not allowed in postcodes\n"
        isCustomerInputValid = false;
    }
    // Validation for the postcode not being longer than 8 characters
    if(isTextLong(postcodeBox.value.length, 8) === false)
    {
        userInputError = userInputError + "Postcode can't be longer than 8 characters\n"
        isCustomerInputValid = false;
    }
    // Validation for the postcode not being shorter than 5 characters
    if(isTextShort(postcodeBox.value.length, 5) === false)
    {
        userInputError = userInputError + "Postcode can't be shorter than 5 characters\n"
        isCustomerInputValid = false;
    }

    if (isCustomerInputValid === false) {
        document.getElementById("error-form").style.display = "block";
        console.log("What the user sees: " + userInputError)
        messages.push(userInputError)
        customerError.innerText = messages.join(', ')
        e.preventDefault()
    } else
    {
        document.getElementById("error-form").style.display = "none";
        console.log("Input is valid")
        $.ajaxSetup({cache:false});
        AddCustomerClick(e);
    }
    e.preventDefault()
});

function AddCustomerClick(e)
{
    let json = {
        fname: fnameBox.value.trim(),
        sname: snameBox.value.trim(),
        address: addressBox.value.trim(),
        postcode: postcodeBox.value.trim()
    };

    $.ajax({
        cache:false,
        type:"POST",
        url:'http://localhost:1339/customer',
        data:JSON.stringify(json),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: (res) => disableCustomerBoxes(res),
        error:(req, status, error) => console.log("Failed to add Customer")
    });
    e.preventDefault();
    return false;
}

function disableCustomerBoxes(customer)
{
    console.log(customer)
    customerId = customer.customerid;
    document.getElementById("add-button").disabled=true;
    document.getElementById("order-add").disabled=false;

    console.log("Added Customer")
    fnameBox.disabled = true;
    snameBox.disabled = true;
    addressBox.disabled = true;
    postcodeBox.disabled = true;
}

orderform.addEventListener('submit', (e) => {
    console.log("Orderform started")
    $.ajaxSetup({cache:false});
    AddOrderClick(e);
})

function AddOrderClick(e)
{
    let price = $("#price-textbox").val()
    let json = {
        customerid: "http://localhost:1339/customer/" + customerId,
        platename: $("#result-plate").val(),
        price: parseFloat(price)
    };
    console.log(json)

    $.ajax({
        cache:false,
        type:"POST",
        url:'http://localhost:1339/order',
        data:JSON.stringify(json),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: (res) => disableOrderBox(res),
        error:(req, status, error) => console.log("Failed to add Order")
    });
    e.preventDefault();
    return false;
}

function disableOrderBox(res)
{
    document.getElementById("error-form").style.display = "block";
    console.log(res)
    document.getElementById("order-add").disabled=true;
    let messages = [];
    messages.push("You have successfully purchased plate " + $("#result-plate").val())
    customerError.innerText = messages.join(', ')
}

function existingCustomer()
{
    document.getElementById("choice-form").style.display="none";
    document.getElementById("existing-form").style.display = "block";
}
function newCustomer()
{
    document.getElementById("choice-form").style.display="none";
    document.getElementById("new-form").style.display = "block";
}

existingform.addEventListener('submit', (e) => {
    let isCustomerInputValid = true;
    let userInputError = "";
    let messages = [];

    if((isTextPresent(efnameBox.value) === false) || (isTextPresent(esnameBox.value) === false)){
        userInputError = userInputError + "All text boxes must be filled\n"
        isCustomerInputValid = false;
    }
    if((isTextSymbols(efnameBox.value, nameFormat)) === false || (isTextSymbols(esnameBox.value, nameFormat)) === false)
    {
        userInputError = userInputError + "Disallowed symbols in first name or surname\n"
        isCustomerInputValid = false;
    }
    if ((isTextLong(efnameBox.value.length, 35) === false) || (isTextLong(esnameBox.value.length, 35) === false))
    {
        userInputError = userInputError + "First and surnames can't exceed 35 characters\n"
        isCustomerInputValid = false;
    }
    if (isCustomerInputValid === false) {
        document.getElementById("error-form").style.display = "block";
        console.log("What the user sees: " + userInputError)
        messages.push(userInputError)
        customerError.innerText = messages.join(', ')
        e.preventDefault()
    } else
    {
        document.getElementById("error-form").style.display = "none";
        console.log("Input is valid")
        $.ajaxSetup({cache:false});
        SearchExistingCustomer(e);
    }
    e.preventDefault()
});

function SearchExistingCustomer(e)
{
    const url = 'http://localhost:1339/customer/search/findCustomerByFnameAndSname?fname=' + efnameBox.value + "&sname=" + esnameBox.value;
    console.log("URL AJAX uses " + url)
    $.ajax({
        cache: false,
        type: "GET",
        url: url,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (res) => GetCustomerId(res),
        error: (res) => ErrorFindingCustomer(res),
    })
}

function GetCustomerId(result) {
    let x = result._embedded.customer
    let customers = x[0];
    customerId = customers.customerid;
    console.log("Customerid = " + customerId)
    efnameBox.disabled = true;
    esnameBox.disabled = true;
    document.getElementById("order-add").disabled=false;
    document.getElementById("searchname-button").disabled = true;
}

function ErrorFindingCustomer(result)
{
    console.log(result)
}