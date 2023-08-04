function generateCode(length){
    let code = "";
    let schema = "0123456789";

    for(let i = 0; i < length; i++){
        /*  You might why this is working? So It is because Math.random() always
            generates number between 0 to 1 i.e for exapmle: 0.9170512147529675 
        */
        code += schema.charAt(Math.floor(Math.random() * schema.length)); 
    }
    return code;
}
module.exports = generateCode;