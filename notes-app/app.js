let ShowNoteBtn = document.querySelector('.add-note-btn' );
let EditNoteContainer = document.querySelector('.edit-note' ) ;
let note_title_input = document.querySelector(".note-title-input");
let note_desc_input = document.querySelector(".note-body-input");
let noteBox = document.querySelector(".note-box");
let closeIcon = document.querySelector('.fa-arrow-left');

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//Getting Local Storage Notes
var allNotes = [];
// const allNotes = JSON.parse(localStorage.getItem ( "allNotes") || "[]");

var allNotesDesc = [];

db.collection('notes-portfolio').doc('allNotes').get().then((doc)=>{
	if(doc.exists){
		allNotes = JSON.parse(doc.data().JSON);
	}
showNotes();
	
});

let isUpdate = false, updateId;
note_title_input.addEventListener('keyup',function(e){
this.style.height = '45px';
let height = e.target.scrollHeight;
note_title_input.style.height = `${height}px`;
});

closeIcon.addEventListener( 'click', ( )=>{
EditNoteContainer.style.left = '-100%';
});

ShowNoteBtn.addEventListener('click',()=>{
EditNoteContainer.style.left = '50%';
note_title_input.value = '';
note_desc_input. value = '';
});


function showNotes(){
let NoteAdd = '';
document.querySelectorAll('.note').forEach(note=>note.remove());
allNotes.forEach( (note, index)=>{
let filtDesc = note.description.replaceAll("\n", '<br/>');
NoteAdd+= `<div class="note">
<div onclick="editNote(${index},'${note.title}')" style="display: block;height: 65%;">
<h3 class="note-title">${note.title}</h3>
<p class="note-body">${note.description}</p>
</div>
<hr>
<p class="date">${note.date}</p>
<i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
<div class="settings">
<div class="menu">
<span class="delete-btn" onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i> Delete</span>
</div>
</div>
</div>`;
allNotesDesc[index] = filtDesc;
});

noteBox.innerHTML = NoteAdd || `
<span><i class="fa-solid fa-note-sticky"></i></span>
<span class="no-notes-message">No Notes here yet</span>`;
}




function deleteNote(Noteid){
allNotes.splice(Noteid,1); //Delete Note From Array
// localStorage.setItem("allNotes",JSON.stringify(allNotes));
db.collection('notes-portfolio').doc('allNotes').set({
	JSON: JSON.stringify(allNotes)
});
showNotes();
};

function editNote(Noteid, title){
let desc = allNotesDesc[Noteid].replaceAll('<br/>', '\r\n' );
updateId = Noteid;
isUpdate = true;
ShowNoteBtn.click();
note_title_input.value = title;
note_desc_input.value = desc;
};

closeIcon.addEventListener('click', e =>{
e.preventDefault();
let noteTitle = note_title_input.value; //Note Title Value
let noteDesc = note_desc_input.value; //Note Description Value

if(noteTitle || noteDesc){
let date = new Date(),
month = months[date.getMonth()],
day = date.getDate(),
year = date.getFullYear();
//All Notes Info
let noteInfo = {
title:noteTitle,
description: noteDesc,
date: `${month} ${day}, ${year}`
}

if(!isUpdate){
allNotes.push(noteInfo); //Push Note Info In Notes
}else{
isUpdate = false;
allNotes[updateId] = noteInfo;
}

//Saving To Local Storage
// localStorage.setItem("allNotes",JSON.stringify(allNotes));
db.collection('notes-portfolio').doc('allNotes').set({
	JSON: JSON.stringify(allNotes)
});

showNotes();
}
});