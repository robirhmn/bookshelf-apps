const INPUT_BOOK_COMPLETE = "inputBookIsComplete";
const inputBookComplete = document.getElementById(INPUT_BOOK_COMPLETE);

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
          event.preventDefault();
          if (inputBookComplete.checked == true){
            tambahkanBukuKeRakSelesai_checked();
          }else{
            tambahBuku();
          }
    });
    
     if(isStorageExist()){
       loadDataFromStorage();
   }
});

document.addEventListener("ondatasaved", () => {
   console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
   refreshDataFromRak();
});