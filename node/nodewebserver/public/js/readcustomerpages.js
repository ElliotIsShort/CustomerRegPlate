$ (function ()
{
    $.ajaxSetup({cache:false});
    $("#read-button").click(ReadCustomersClick);
});

function ReadCustomersClick(e)
{
    $.ajax({
        cache: false,
        type: "GET",
        url: 'http://localhost:1339/customer',
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ReadCustomerResult,
        error:(req, status, error) => console.log("Failed to read Customers")
    });
    e.preventDefault();
    return false;
}

function ReadCustomerResult(json, status, req)
{
    console.log(json)
    let html = "";
    let x = json._embedded.customer
    for (let s in x)
    {
        let customer = x[s];
        html += `Id: ${customer.customerid} Fname: ${customer.fname} Sname: ${customer.sname} `;
        html += `Address: ${customer.address} Postcode: ${customer.postcode}<br/>`;
    }
    $("#all-customers").html( html );
}