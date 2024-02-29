document.forms['addTodDoItem-Form'].addEventListener('submit', (event) => {
    event.preventDefault();
    db.collection("toDoList-portfolio").doc().set({
        item: document.forms['addTodDoItem-Form'].addTodDoItem.value,
        lastUpdateTime: firebase.firestore.Timestamp.fromDate(new Date()),
        isCompleted: false
    }).then(()=>{
    	document.forms['addTodDoItem-Form'].reset();
    }).catch((err) => {
        console.log(err)
    });
});

var itemCounter = 0;

db.collection("toDoList-portfolio").onSnapshot((snapshot) => {
    // snapshot.forEach((item) => {
snapshot.docChanges().forEach((item) => {
            if (item.type === "added") {
                // console.log("New city: ", item.doc.data());

itemCounter++;

        console.log(item.doc.id);
        let clone = document.getElementsByTagName("template")[0].content.cloneNode(true);
        console.log(clone);
        clone.children[0].children[0].setAttribute('id', itemCounter);
        clone.children[0].children[0].setAttribute('value', item.doc.data().item);
            clone.children[0].children[0].checked = item.doc.data().isCompleted;

        clone.children[0].children[1].setAttribute('for', itemCounter);
        clone.children[0].children[1].innerText = item.doc.data().item;
        clone.children[0].classList.add('slideUp');

        clone.children[0].children[0].setAttribute('data-db-id', item.doc.id);
        clone.children[0].children[2].setAttribute('data-db-id', item.doc.id);


        document.getElementById('toDoList').appendChild(clone);
            }

    })

});


function updateList(element){
	console.log(element.checked);
	db.collection("toDoList-portfolio").doc(element.getAttribute('data-db-id')).update({
        // item: document.forms['addTodDoItem-Form'].addTodDoItem.value,
        lastUpdateTime: firebase.firestore.Timestamp.fromDate(new Date()),
        isCompleted: element.checked
    }).then().catch((err) => {
        console.log(err)
    });
}


function deleteListItem(element){
let docId = element.getAttribute('data-db-id');
    db.collection("toDoList-portfolio").doc(docId).delete().then(() => {
    console.log("Document successfully deleted!");
    element.parentElement.remove();
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}