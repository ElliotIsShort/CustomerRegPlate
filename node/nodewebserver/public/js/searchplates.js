const plate = document.getElementById('plate-textbox')
const plateform = document.getElementById('plateform')
const plateError = document.getElementById('error')

document.getElementById("purchase-plate").disabled = true;
document.getElementById("error-form").style.display = "none";
document.getElementById("taken-form").style.display = "none";
document.getElementById("found-form").style.display = "none";

let takenplates = [];
let platename;
let availablePlate = "";
let isPlateTaken = false;
const plateFormat = /[`¬!£@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

plateform.addEventListener('submit', (e) => {

    document.getElementById("error-form").style.display = "none";
    document.getElementById("taken-form").style.display = "none";
    document.getElementById("found-form").style.display = "none";
    document.getElementById('purchase-plate').disabled = true;
    $("#error").html( "" );
    $("#found-plates").html( "" );
    isPlateTaken = false;
    let messages = [];
    let userInputError = "";
    let isPlateInputValid = true;

    //Input Validation for licence plates
    if (isTextPresent(plate.value) === false) {
        userInputError = userInputError + "Plates cannot be blank\n"
        isPlateInputValid = false;
    }
    if (isTextLong(plate.value.length, 8) === false) {
        userInputError = userInputError + "Plates must be shorter than 8 characters\n"
        isPlateInputValid = false;
    }
    if (isTextShort(plate.value.length, 2) === false)
    {
        userInputError = userInputError + "Plates must be longer than 2 characters\n"
        isPlateInputValid = false;
    }
    if (isTextSymbols(plate.value, plateFormat) === false)
    {
        userInputError = userInputError + "Plates cannot contain symbols\n"
        isPlateInputValid = false;
    }
    if (isPlateValid(plate.value) === false)
    {
        userInputError = userInputError + "Plate format is invalid\n"
        isPlateInputValid = false;
    }

    if (isPlateInputValid === false)
    {
        document.getElementById("error-form").style.display = "block";
        console.log("What the user sees: " + userInputError)
        messages.push(userInputError)
        plateError.innerText = messages.join(', ')
        e.preventDefault()
    } else
    {
        document.getElementById("error-form").style.display = "none";
        console.log("Input is valid")
        $.ajaxSetup({cache:false});
        ReadPlatesClick(e);
        ReadSimilarPlates(e);
    }
    e.preventDefault()
});


function ReadPlatesClick(e)
{
    console.log("ReadPlatesClick AJAX")
    const url = 'http://localhost:1339/platedetails/' + plate.value.toUpperCase();
    console.log("URL AJAX uses " + url)
    $.ajax({
        cache: false,
        type: "GET",
        url: url,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (res) => ReadPlateResult(res),
        error: ErrorPlateResult,
    });
    e.preventDefault();
    return false;
}

function ReadSimilarPlates(e)
{
    console.log("ReadSimilarPlates AJAX")
    const url = 'http://localhost:1339/order/search/findByPlatenameContainingIgnoreCase?platename=' + plate.value.toUpperCase();
    console.log("URL AJAX uses " + url)
    $.ajax({
        cache: false,
        type: "GET",
        url: url,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (res) => PartialPlates(res),
        error: ErrorPlateResult,
    })
}

function PartialPlates(result)
{
    if(isPlateTaken === true)
    {
        console.log("taken form active")
        console.log(result)
        let html = "";
        let x = result._embedded.order
        for (let s in x)
        {
            if(s === "10")
            {
                break;
            }
            let orders = x[s];
            if (orders.platename !== plate.value.toUpperCase())
            {
                document.getElementById("taken-form").style.display = "block";
                html += `${orders.platename}<br/> `;
            }

        }
        $("#taken-plates").html( html );
    }
}

function ReadPlateResult(result)
{
    document.getElementById("found-form").style.display = "block";
    console.log(result)
    $("#found-plates").html( "Plate is already taken" );
    isPlateTaken = true;
}
function ErrorPlateResult(json, status, error)
{
    console.log("AJAX call failed to find plate " + plate.value)
    document.getElementById('purchase-plate').disabled = false;
    availablePlate = plate.value;
}
function passPlate()
{
    localStorage.setItem("platevalue", availablePlate.toUpperCase());
    localStorage.setItem("plateprice", 1200);
    return false;
}