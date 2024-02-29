
// $("#loginBtn").click(function() {  
//   $("#box form").toggle("slow");
//   return false;
// });


function replaceURLs(message) {
  if(!message) return;
 
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match('^https?:\/\/')) {
      hyperlink = 'https://' + hyperlink;
    }
    return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
  });
}




// var contacts_container = document.getElementById('contacts-container');
var chats_container2 = document.getElementById('chats-container2');
// var messageListElement;


var CHAT_TEMPLATE2 = '<div class="message stark">' + 
                    '<span class="message-time"></span>' +
                    '</div>';


// var CONTACT_TEMPLATE= '<div class="pic"></div>' +
//       '<div class="badge">12</div>' +
//       '<div class="name"></div>' +
//       '<div class="message"></div>';


var CHAT_PAGE_TEMPLATE2 = '<div class="contact bar">' +
      '<div class="pic">' +
      '</div>' +
     ' <div class="name"></div>' +
     ' <div class="seen">Today at 12:56</div>' +
    '</div>' +
    '<div class="messages chatBox2">' +
   ' </div>' +
    '<div class="input">' +
      '  <form class="chatInputForm2">' +
         ' <i class="fas fa-camera imageTextBtn2" ></i>' +
          '<input type="file" class="hide mediaCaptureElement2" />' +
          '<input class="msgText2" name="msgText" placeholder="Type your message here!" type="text" />' +
          '<i class="fa-regular fa-paper-plane sendMsgBtn2"></i>' +
          // '<i class="fas fa-microphone"></i>' +
        '</form>' +
   ' </div>';

    


let chat2 = document.createElement('div');
chat2.classList.add('chat');
// chat.classList.add('hide');
chat2.innerHTML = CHAT_PAGE_TEMPLATE2;
// chat.setAttribute('id', room_data.uid);
chats_container2.appendChild(chat2);

chat2.querySelector('.pic').style.backgroundImage = 'url(https://www.screengeek.net/wp-content/uploads/2019/08/spider-man-3-peter-parker.jpg)';
                          chat2.querySelector('.name').innerText = 'Parker';

chat2.querySelector('.sendMsgBtn2').setAttribute('onclick', 'saveMsg2(this.previousElementSibling.value);');

chat2.querySelector('.chatInputForm2').addEventListener('submit', (event) => {
  // console.log(event.target);
  event.preventDefault();
  console.log(event.target.msgText.value);
  // test = event.target;
  console.log(event.target.msgText.value);
  saveMsg2(event.target.msgText.value);
  event.target.reset();
});

let messageListElement2 = chat2.querySelector('.chatBox2');

// Events for image upload.
let imageButtonElement2 = chat2.querySelector('.imageTextBtn2');
let mediaCaptureElement2= chat2.querySelector('.mediaCaptureElement2');
imageButtonElement2.addEventListener('click', function (e) {
  e.preventDefault();
  mediaCaptureElement2.click();
});
mediaCaptureElement2.addEventListener('change', onMediaFileSelected2);


let gallery2 = new Viewer(messageListElement2,messageListElement2.querySelectorAll('.text-image'));
if(!messageListElement2.childElementCount)
        {setTimeout(function() {
          loadMessages2( gallery2, messageListElement2);
        // last_message.innerText = last_message_text;
        // console.log(last_message_text);
            }, 200);
}


            

            




//         message_container.querySelector('.message-form').setAttribute('id', ('message-form-' + room_uid));
//         message_container.querySelector('.image-form').setAttribute('id', ('image-form-' + room_uid));
//         message_container.querySelector('.mediaCapture').setAttribute('id', ('mediaCapture-' + room_uid));
//         message_container.querySelector('.submitImage').setAttribute('id', ('submitImage-' + room_uid));
//         message_container.querySelector('.message').setAttribute('id', ('message-' + room_uid));
//         message_container.querySelector('.sendMsg').setAttribute('id', ('sendMsg-' + room_uid));
//         message_container.querySelector('.messages').setAttribute('id', ('messages-' + room_uid));


        
// let messageListElement = message_container.querySelector('#messages-' + room_uid);
//  let messageFormElement = message_container.querySelector('#message-form-' + room_uid);
//  let messageInputElement = message_container.querySelector('#message-' + room_uid);
//  let submitButtonElement = message_container.querySelector('#sendMsg-' + room_uid);
//  let imageButtonElement = message_container.querySelector('#submitImage-' + room_uid);
// //  let imageFormElement = 
//  let mediaCaptureElement = message_container.querySelector('#mediaCapture-' + room_uid);






    




function saveMsg2(messageText){
  saveMessage2(messageText);
}




// Saves a new message to Cloud Firestore.
async function saveMessage2(messageText) {
  // Add a new message entry to the Firebase database.
    if(messageText){
      await db.collection('portfolio-chat').add({
        name: 'parker',
          message: messageText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: 'text'

    });

    }
}


// Triggered when a file is selected via the media picker.
function onMediaFileSelected2(event) {
  event.preventDefault();
  var files = event.target.files;
  let target = event.target.parentElement.parentElement.parentElement.getAttribute('id');
  // let target = 'A308ujyxWA69YIURsvHi';
  console.log(target);
console.log(files);
  // Clear the selection in the file picker input.
  // imageFormElement.reset();
  // test2 = files;

  // Check if the file is an image.
//   for(let ctr=0; ctr<files.length; ctr++) {
//     if (!files[ctr].type.match('image.*')) {
//     var data = {
//       message: 'You can only share images',
//       timeout: 2000,
//     };
//     signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
//     return;
//   }
// };
  

    saveImageMessage2(files, target);

}



var LOADING_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/web-chat-3312a.appspot.com/o/loading.gif?alt=media&token=483f3809-f039-452a-8a43-55b1cfd80478';
async function saveImageMessage2(files, room_uid="portfolio-chat") {
  console.log(files);
  // test2 = files;

for(let ctr=0; ctr<files.length; ctr++){

  try {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    const messageRef = await db.collection('portfolio-chat').add({
      name: 'parker',
      imageUrl: LOADING_IMAGE_URL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      type: 'image'
});


var last_message;

if (files[ctr].type.match('image.*')){
  last_message = 'image';

            new Compressor(files[ctr], {
              quality: 0.6,

              async success(compressedImage) {

              
              var storageRef = firebase.storage().ref();

              // 2 - Upload the image to Cloud Storage.
              const filePath = 'portfolio-chat' + `/${messageRef.id}/${files[ctr].name}`;
              const newImageRef = storageRef.child(filePath);
              const fileSnapshot = await newImageRef.put(compressedImage);
              
              // 3 - Generate a public URL for the file.
              const publicImageUrl = await newImageRef.getDownloadURL();

              console.log(messageRef.id);
              console.log(publicImageUrl);

              // 4 - Update the chat message placeholder with the image's URL.
              const abcd = await db.collection('portfolio-chat').doc(messageRef.id).update({
                imageUrl: publicImageUrl,
                storageUri: fileSnapshot.metadata.fullPath,
                type: last_message
          });

            },
            error(err) {
              console.log(err.message);
            },
          });
}
else{

              var storageRef = firebase.storage().ref();

              // 2 - Upload the image to Cloud Storage.
              const filePath = 'portfolio-chat' + `/${messageRef.id}/${files[ctr].name}`;
              const newImageRef = storageRef.child(filePath);
              const fileSnapshot = await newImageRef.put(files[ctr]);
              
              // 3 - Generate a public URL for the file.
              const publicImageUrl = await newImageRef.getDownloadURL();

              console.log(messageRef.id);
              console.log(publicImageUrl);

       if(files[ctr].type.match('video.*')){
  last_message = 'video';
}
else{
  last_message = 'file';
}

              // 4 - Update the chat message placeholder with the image's URL.
              const abcd = await db.collection('portfolio-chat').doc(messageRef.id).update({
                imageUrl: publicImageUrl,
                storageUri: fileSnapshot.metadata.fullPath,
                type: last_message
          });

}


  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  }
}

  
}



// Loads chat messages history and listens for upcoming ones.
function loadMessages2(gallery2, messageListElement2) {

  // let messageListElement = document.querySelector('.chatBox2');

  // Create the query to load the last 12 messages and listen for new ones.
  // const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
  let recentMessagesQuery = db.collection('portfolio-chat').orderBy('timestamp', 'desc').limit(12);
  
    recentMessagesQuery.onSnapshot((snapshot) => {
            // console.log(snapshot);
            snapshot.docChanges().forEach((change) => {

              // console.log('change: ');
              // console.log(change);
              // console.log(change.doc.data().text);
                if (change.type.toLowerCase() != 'added' || change.type.toLowerCase() != 'removed')
                 {
             let message = change.doc.data();
             console.log(change.type);
             console.log(message);
             console.log('end')
             displayMessage2(change.doc.id, message.name, message.timestamp, message.message, messageListElement2, message.type, message.imageUrl, gallery2);
           }
            });

        });
}



// Displays a Message in the UI.
 // function displayMessage(id, timestamp, name, text, picUrl, type, imageUrl, messageListElement, messageInputElement, gallery) {
 function displayMessage2(message_id, user_uid, timestamp, message, messageListElement2, type, imageUrl, gallery) {
   var div = document.getElementById(message_id + 'parker') || createAndInsertMessage2(message_id, user_uid, timestamp, messageListElement2);

 
   // profile picture
   // if (picUrl) {
   //   div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
   // }
 
   // div.querySelector('.name').textContent = timestamp ? (name + ', ' + timestamp.toDate().toLocaleTimeString('en-US')) : (name);

   var messageElement = div.querySelector('.message-text');
 
   if (message) { // If the message is text.
     messageElement.innerHTML = replaceURLs(message)

     // Replace all line breaks by <br>.
     messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');

   } 
   else if (imageUrl) { // If the message is an image.

      messageListElement.setAttribute('data-type', type);

    if(type == 'image' || type == 'photo'){
     var image = document.createElement('img');
     image.classList.add('text-image');
     image.addEventListener('load', function() {
       messageListElement2.scrollTop = messageListElement2.scrollHeight;
     });
     image.src = imageUrl + '&' + new Date().getTime();
     messageElement.innerHTML = '';
     messageElement.appendChild(image);
     gallery.update();
    }
    else if(type == 'video'){
     var video = document.createElement('video');
     video.setAttribute('controls', true);
     video.addEventListener('load', function() {
       messageListElement2.scrollTop = messageListElement2.scrollHeight;
     });
     video.src = imageUrl + '&' + new Date().getTime();
     messageElement.innerHTML = '';
     messageElement.appendChild(video);
     gallery.update();
    }
    else{
      var image = document.createElement('img');
     image.addEventListener('load', function() {
       messageListElement2.scrollTop = messageListElement2.scrollHeight;
     });
     image.src = 'https://img.icons8.com/pastel-glyph/50/000000/file.png';
     messageElement.innerHTML = '';
    var file = document.createElement('a');
     file.addEventListener('load', function() {
       messageListElement2.scrollTop = messageListElement2.scrollHeight;
     });
     file.setAttribute('href', imageUrl + '&' + new Date().getTime());
     file.setAttribute('target', '_blank');
     messageElement.innerHTML = '';
     file.appendChild(image);
     messageElement.appendChild(file);
     // gallery.update();
    }


   }



   // Show the card fading-in and scroll to view the new message.
   setTimeout(function() {div.classList.add('visible')}, 1);
   messageListElement2.scrollTop = messageListElement2.scrollHeight;
   // messageInputElement.focus();

   // element.scrollIntoView();
 }


var CHAT_TEMPLATE2 = '<span class="message-text"></span>' +
                    '<span class="message-time"></span>';


 function createAndInsertMessage2(id, user_uid, timestamp, messageListElement2) {
   const msg_container = document.createElement('div');
   msg_container.classList.add('message');
   msg_container.innerHTML = CHAT_TEMPLATE2;
   msg_container.setAttribute('id', id + 'parker');


   const time = msg_container.lastChild;

   if(user_uid == 'parker'){
    msg_container.classList.add('parker');
   }
 
   // If timestamp is null, assume we've gotten a brand new message.
   // https://stackoverflow.com/a/47781432/4816918
   timestamp = timestamp ? timestamp.toMillis() : Date.now();
   msg_container.setAttribute('timestamp', timestamp);
   time.innerText = moment(timestamp).format('lll');
 
   // figure out where to insert new message
   const existingMessages = messageListElement2.children;
   if (existingMessages.length === 0) {
     messageListElement2.appendChild(msg_container);
   } else {
     let messageListNode = existingMessages[0];
 
     while (messageListNode) {
       const messageListNodeTime = messageListNode.getAttribute('timestamp');
 
       if (!messageListNodeTime) {
         throw new Error(
           `Child ${messageListNode.id} has no 'timestamp' attribute`
         );
       }
 
       if (messageListNodeTime > timestamp) {
         break;
       }
 
       messageListNode = messageListNode.nextSibling;
     }
 
     messageListElement2.insertBefore(msg_container, messageListNode);
   }
 console.log('messageListElement2');

   return msg_container;
 }
