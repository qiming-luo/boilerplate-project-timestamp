function convertDate(param){
    const paramToNum = Number(param);
    let unix;
    let utc;
    if(paramToNum){ // param can be converted to number
        let newdate = new Date(paramToNum);
        if(newdate.toString() === 'Invalid Date'){
            return {error : "Invalid Date"};
        }
        utc = newdate.toUTCString();
        unix = paramToNum;
    }else{ // param cannot be converted to number
        let newdate = new Date(param);
        if(newdate.toString() === 'Invalid Date'){
            return {error : "Invalid Date" };
        }
        utc = newdate.toUTCString();
        unix = Date.parse(newdate);
    }
    
    const resObj = {
        unix,
        utc
    }
    
    return resObj;
  }

module.exports = convertDate;


