
let SHORTLINK_FORACOACH_API = 'https://links.foracoach.in/yourls-api.php';

async function shortenURL(urlToShorten, keyword=null){

    let shortURL;
    let signature = "991ba9584d";

    let params = {
            signature: signature,
            url: urlToShorten,
            action: 'shorturl',
            format: 'json',

        };

        if(keyword){
            params.keyword = keyword;
        }

let objString = SHORTLINK_FORACOACH_API + '?' + new URLSearchParams(params).toString();

    const rawResponse = await fetch(objString);
    
    shortURL = await rawResponse.json();
    
    console.log(shortURL);

    return shortURL;

}


//Initial References
let full_URL = document.getElementById("full-url");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let form = document.getElementById("url-shorten-form");


//Function to fetch data from API
// let shortenURL = () => {
//   let original_URL = full_URL.value;

//   if(original_URL.length){

// result.appendChild(spinner);

//   let short_URL_string = generateRandomString();

// let short_URL = 'sarathkishore.com/shorten/#/' +  short_URL_string;

//     db.collection("URL_Shortener").doc(short_URL_string).set({
//         original_URL: original_URL,
//         created_on: firebase.firestore.Timestamp.fromDate(new Date()),
//         access_count: 0
//     }).then(()=>{
        
//         form.reset();

//         result.innerHTML = `
//             <div class="info">
//                <img src="tick3.gif" alt="">
//                 <div>
//                     <h2>${short_URL}</h2>
//                         <input type="text" value="" id="short_url" hidden />
//                     <div class="genre">
//                         <div class="duplicateIcon" onclick="copyText()">copy</div>
//                     </div>
//                 </div>
//             </div>
//         `;

//         document.getElementById("short_url").value = short_URL;

//     }).catch((err) => {
//         console.log(err)
//     });



//   }
//         }



form.addEventListener('submit', async(event)=>{
    event.preventDefault();

searchBtn.classList.add('disabled');

    let linkToShorten = full_URL.value;
    let keyword = document.getElementById('keyword').value;

    let temp = await shortenURL(linkToShorten, keyword);

    console.log(temp);

    if(temp.statusCode === 200){
        form.reset();
        result.classList.remove('hide');
        result.querySelector('#short_url_text').innerText = temp.shorturl;
        result.querySelector('#short_url').value = temp.shorturl;
        result.querySelector('#short_url_qr').src = temp.shorturl + '.qr';

    }
    else{
        console.log('Something went wrong. ', temp.message);
    }
searchBtn.classList.remove('disabled');


    
});



function copyText() {
  /* Get the text field */
  var shortURL = document.getElementById("short_url");

  /* Select the text field */
  shortURL.select();
  shortURL.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(shortURL.value);
  
  /* Alert the copied text */
  alert("Copied the text: " + shortURL.value);
}



function generateRandomString(length=4){
    var result           = (Date.now() + '').slice(-3);
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result.shuffle();
}


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

let spinner = document.createElement('i');
spinner.setAttribute('id', 'spinner');
spinner.classList.add('fas');
spinner.classList.add('fa-sync');
spinner.classList.add('fa-spin');
spinner.classList.add('ml-2');
spinner.style.padding = "0";
spinner.style.position = "absolute";
spinner.style.left = "50%";
spinner.style.transform = "translateX(-50%)";
spinner.style.bottom = "10%";
