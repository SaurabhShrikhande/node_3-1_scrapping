const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');

const arr = [];
arr.push(["Name" , "Price" , "Ratings"])


const scrap = () => {
 axios.get('https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=mobile&_sacat=0')
  .then(response => {
   // console.log('Data:', response.data); // Access the response data


    const html = response.data;
    const $ = cheerio.load(html); 
    // console.log($);
    
    // $('[role="heading"]').each((index, element) => {
    //     const paragraphText = $(element).text();
    //     console.log(paragraphText); 
    //     console.log(paragraphText.length)
    //     console.log(typeof(paragraphText))
    
    //   });

    //   $('.s-item__price').each((index, element) => {
    //     const paragraphText = $(element).text();
    //     console.log(paragraphText); 
    //     console.log(paragraphText.length)
    //     console.log(typeof(paragraphText))
        
    //   });

    const card = $('li');
   // console.log(card , card.length, typeof(card));
    
   card.each((idx, ele) => {
       const container = $(ele);
      
       const head = container.find('[role="heading"]').text();
       const price = container.find('.s-item__price').text();
      const rataing = container.find('[aria-hidden="false"]').text();
    //    console.log(rataing);
 
   console.log(head, price , rataing)
    
   if (head !== '' && price !== '' && rataing !== ''){
       arr.push([head , price , rataing])
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



