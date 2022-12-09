//C100000972

let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

let url = 'https://schoolmenukr.ml/api/middle/C100000972?year=' + String(year) + '&month=' + String(month) + '&date=' + String(date);

async function requester() {
    const response = await fetch(url,
    {
        method: 'GET',
    });
    const data = await response.json();
    return data.menu[0].lunch;
}
//request().then((name) => console.log(name));

//https://schoolmenukr.ml/api/middle/C100000972?year=2022&month=12&date=7