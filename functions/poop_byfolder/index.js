
// LIST RANDOM FILE
const { 
    key_api, 
    BASE_API,
    total_folder_indo,
    total_folder_jepang,
    f_indo,
    f_jepang,
     } = require("../../src/base/domain.js");

export async function handler(event, context) {
    let statusCode, data,page;
     const { fld_id } = event.queryStringParameters ;

    if (fld_id === f_indo) {
        page = Math.floor(Math.random() * total_folder_indo) + 1;
    } else if (fld_id === f_jepang) {
        page = Math.floor(Math.random() * total_folder_jepang) + 1;
    }
    console.log("fld_id:", fld_id,page);
    try {
        const response = await fetch(`${BASE_API}/list?key=${key_api}&folder=${fld_id}&page=${page}&limit=50`);
        data = await response.json();
        statusCode = 200;
    } catch (err) {
        statusCode = err.statusCode || 500;
        data = { error: err.message };
    }

    return {
        statusCode,
        body: JSON.stringify(data)
    };
};