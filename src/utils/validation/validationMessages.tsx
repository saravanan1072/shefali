const validationMessages: Record<string, string> = {
    isEmpty: 'This field is required',
    isEmail: 'Please enter a valid email id',
    isNumber: 'Please enter positive numeric values only',
    isNonzeroNumber:'Please enter numeric values greater than zero',
    isText:'Please enter characters only',
    isMobile:'Please enter a valid mobile number',
    isOrganisation:'Please enter a valid name'
};

export default validationMessages;