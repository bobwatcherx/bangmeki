// CARI  FILE
const { 
    key_api, 
    BASE_API,
    total_folder_indo,
    total_folder_jepang,
    f_indo,
    f_jepang,
     } = require("../../src/base/domain.js");

export async function handler(event, context) {
    let statusCode, data;
     const { title,limit,page } = event.queryStringParameters ;
    console.log("search_term:", title,page,limit);
    try {
        const response = await fetch(`${BASE_API}/search?key=${key_api}&title=${title}&page=${page}&limit=${limit}`);
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