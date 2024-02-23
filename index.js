const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');

const arr = [];
arr.push(["Job Title" , "Company name" , "Location", "Salary", "Posted Date"])


const scrap = () => {
 axios.get('https://www.linkedin.com/jobs/search?keywords=tech%20job&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0')
  .then(response => {
   // console.log('Data:', response.data); // Access the response data


    const html = response.data;
   // console.log(html)
    const $ = cheerio.load(html); 
   //  console.log($);
  

    const card = $('li');
  // console.log(card , card.length, typeof(card));
    
   card.each((idx, ele) => {
       const container = $(ele);
     //  console.log(container);
       const jobtitle = container.find('.base-search-card__title').text();
        const company = container.find('.hidden-nested-link').text();
       const location = container.find('.job-search-card__location').text()
       const salary = container.find('.job-search-card__salary-info').text()
       const posteddate = container.find('.job-search-card__listdate').text()

  console.log(jobtitle)
    


    if (jobtitle !== '' && company !== '' && posteddate !== ''){
      arr.push([jobtitle , company, location, salary , posteddate])
  }
//  console.log(arr[arr.length  -1 ])

 if(idx === card.length - 1) {
     // Create a new workbook
const workbook = xlsx.utils.book_new();

// Create a new sheet
const sheetData = arr;
                     //array of array
const sheet = xlsx.utils.aoa_to_sheet(sheetData);

// Append the sheet to the workbook
xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1');

// Save the workbook to a file
xlsx.writeFile(workbook, 'output.xlsx');

console.log('XLSX file created successfully!');


 }

  
   })
    
  })
  .catch(error => {
    console.error('Error:', error.message); // Handle errors
  });

     
}
 
scrap();



