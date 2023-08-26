const RAK_BELUM_SELESAI = "incompleteBookshelfList";
const RAK_SUDAH_SELESAI = "completeBookshelfList"; 
const RAK_ITEMID = "itemId";

function tambahBuku(){
    const rakBelumSelesai = document.getElementById(RAK_BELUM_SELESAI);
 
    const textTitle = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const textYear = document.getElementById("inputBookYear").value;

    console.log("Book Title" + textTitle);
    console.log("Book Author" + textAuthor);
    console.log("Book Year" + textYear);
 
    const addedBook = masukkanKeRak(textTitle, textAuthor, textYear);
    const bookObject = composeBookObject(textTitle, textAuthor, textYear, false);
    
    addedBook[RAK_ITEMID] = bookObject.id;
    rak.push(bookObject);
    rakBelumSelesai.append(addedBook);
    updateDataToStorage();
}

function masukkanKeRak(title, author, year, isCompleted) {
    const titleText = document.createElement("h3");
    titleText.innerText = title;

 
    const authorText = document.createElement("p");
    authorText.innerText = author;

    const yearText = document.createElement("p");
    yearText.innerText = year;
 
 
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action");

    if(isCompleted){
        actionContainer.append(
            createUndoButton(isCompleted),
            createTrashButton()
        );
    }else{
        actionContainer.append(createCheckButton(isCompleted), createTrashButton());
    }

    const articleContainer = document.createElement("article");
    articleContainer.classList.add("book_item");
    articleContainer.append(titleText, authorText, yearText, actionContainer);
 
    return articleContainer;
}

function createButton(buttonTypeClass , eventListener, isCompleted) {
    const button = document.createElement("button");

    if (buttonTypeClass == "green" && isCompleted != true) {
        button.innerText = "Selesai dibaca";
    }else if(buttonTypeClass == "green" && isCompleted == true){
         button.innerText = "Belum Selesai dibaca";
    }else{
        button.innerText = "Hapus buku";
    }

    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}


function createCheckButton(isCompleted) {
    return createButton("green", function(event){
         tambahkanBukuKeRakSelesai(event.target.parentElement.parentElement);
    }, isCompleted);
}

function tambahkanBukuKeRakSelesai(bookElement) {
    const bookTitle = bookElement.querySelector("h3").innerText;
    const bookAuthor = bookElement.querySelector("p").innerText;
    const bookYear = bookElement.querySelector("p + p").innerText;

    const newBook = masukkanKeRak(bookTitle, bookAuthor, bookYear, true);
    
    const addedBook = findBook(bookElement[RAK_ITEMID]);
    addedBook.isComplete = true;
    newBook[RAK_ITEMID] = addedBook.id;

    const listCompleted = document.getElementById(RAK_SUDAH_SELESAI);
    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}



function hapusBuku(bookElement) {
    const bookPosition = findBookIndex(bookElement[RAK_ITEMID]);
    rak.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("red", function(event){
        hapusBuku(event.target.parentElement.parentElement);
    });
}

function undoTaskFromCompleted(bookElement){
    const rakBelumSelesai = document.getElementById(RAK_BELUM_SELESAI);
    const bookTitle = bookElement.querySelector("h3").innerText;
    const bookAuthor = bookElement.querySelector("p").innerText;
    const bookYear = bookElement.querySelector("p + p").innerText;
 
    const newBook = masukkanKeRak(bookTitle, bookAuthor, bookYear, false);
   
    const addedBook = findBook(bookElement[RAK_ITEMID]);
    addedBook.isComplete = false;
    newBook[RAK_ITEMID] = addedBook.id;

    rakBelumSelesai.append(newBook);
    bookElement.remove();   

    updateDataToStorage();
}

function createUndoButton(isCompleted) {
    return createButton("green", function(event){
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    }, isCompleted);
}

function tambahkanBukuKeRakSelesai_checked() {
    const rakSudahSelesai = document.getElementById(RAK_SUDAH_SELESAI);
 
    const textTitle = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const textYear = document.getElementById("inputBookYear").value;

    console.log("Book Title" + textTitle);
    console.log("Book Author" + textAuthor);
    console.log("Book Year" + textYear);
    
    const addedBook = masukkanKeRak(textTitle, textAuthor, textYear, true);
    const bookObject = composeBookObject(textTitle, textAuthor, textYear, true);
    
    addedBook[RAK_ITEMID] = bookObject.id;
    rak.push(bookObject);
    rakSudahSelesai.append(addedBook);
    updateDataToStorage();
}

function klik(){
    const INPUT_BOOK_COMPLETE = "inputBookIsComplete";
    const inputBookComplete = document.getElementById(INPUT_BOOK_COMPLETE);

    inputBookComplete.setAttribute("checked", "true");
}


