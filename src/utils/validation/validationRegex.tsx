const validationRegex = {
    emailRegex:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    emptyStringRegex: /^\s*$/,
    mobileRegex: /^[6789]\d{9}$/ ,
    upercaseRegex: /[a-zA-Z0-9_.-]*$/,
    nameRegex:/^[a-zA-Z\s]+$/,
    designationRegex:/^[a-zA-Z]+$/,
    floatRegex:/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
    numberRegex:/^(0|[1-9][0-9]*)$/,
    nonzeroFloatRegex:/^-?(0\.\d*[1-9]\d*|[1-9]\d*(\.\d+)?)$/,
    organisationRegex:/^[0-9A-Za-z'-]+(?:\s[0-9A-Za-z'-]+)*$/
};

export default validationRegex;
