function isTextPresent(textBoxString)
{
    //console.log("isTextPresent running")
    return !(textBoxString === '' || textBoxString == null);
}

function isTextLong(textBoxStringLength, textMaxLength)
{
    // console.log("isTextLong running")
    return textBoxStringLength <= textMaxLength;
}

function isTextShort(textBoxStringLength, textMinLength)
{
    // console.log("isTextShort running")
    return textBoxStringLength >= textMinLength;
}

function isTextSymbols(textBoxString, format)
{
    // console.log("isTextSymbols running")
    return !textBoxString.match(format);
}

function isPlateValid(textBoxString)
{
    // console.log("TextBoxString = " + textBoxString.toUpperCase())
    const regex = /^([A-HJ-PR-Y]{2,2}[056][0-9]\s?[A-HJ-PR-Y]{3,3})$|^([A-HJ-NP-Y]{1,3}[0-9]{2,3}?\s[A-Z]{3,3})$|^([A-Z]{1,3}\s?[0-9]{1,4}([A-Z]{1,1})?)$|^([0-9]{4,4}[A-Z]{1,3})$|^([A-Z]{1,2}\s?[0-9]{1,4})$|^([A-Z]{2,3}\s?[0-9]{1,4})$|^([0-9]{1,4}\s?[A-Z]{2,3})$/;
    console.log("Is play valid result = " + regex.test(textBoxString.toUpperCase()));
    return regex.test(textBoxString.toUpperCase());
}