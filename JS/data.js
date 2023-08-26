const STORAGE_KEY = "BOOKSHELF_APPS";
 
let rak = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false;
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(rak);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       rak = data;
    
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(title, author, year, isComplete) {
   return {
       id: +new Date(),
       title,
       author,
       year,
       isComplete
   };
}
 
function findBook(bookId) {
   for(book of rak){
       if(book.id === bookId)
           return book;
        
   }
   return null;
}
 
 
function findBookIndex(bookId) {
   let index = 0;
   for (book of rak) {
       if(book.id === bookId)
           return index;
        
       index++;
   }
 
   return -1;
}

function refreshDataFromRak() {
   const listUncompleted = document.getElementById(RAK_BELUM_SELESAI);
   let listCompleted = document.getElementById(RAK_SUDAH_SELESAI);
 
 
   for(book of rak){
       const newBook =  masukkanKeRak(book.title, book.author, book.year, book.isComplete);
       newBook[RAK_ITEMID] = book.id;
 
 
       if(book.isComplete){
           listCompleted.append(newBook);
       } else {
           listUncompleted.append(newBook);
       }
   }
}