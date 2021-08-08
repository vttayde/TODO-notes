console.log('welcome to nots app');
// if usar adds a note add it to the localStorage
// showNotes();
let addBtn = document.getElementById('addBtn');
console.log(addBtn);
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle"); 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
})
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index){
        html += `
        <div  class=" noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}"  onclick="deleteNote(this .id)" class="btn btn-primary">Delete Note </button>
                </div>
            </div>
            `;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = '<b>Nothing to show! use"Add a Note" section</b>'
    }
}

// function to delete note
function deleteNote(index) {
    // console.log('i an deleting',index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search input
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    //  console.log("inpumvt");
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal)
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})