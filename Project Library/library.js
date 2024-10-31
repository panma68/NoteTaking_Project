const button_add_new_book = document.getElementById("button_add_new_book");
const new_book_popup_window = document.getElementById("new_book_popup_window");

const libraryBooks = [];

function Book(){
    this.auhor = ""
    this.title = ""
    this.pages = 0
}


function addBookToLibrary(book){
    libraryBooks.push(book);
}



button_add_new_book.addEventListener("click",()=>{
    new_book_popup_window.showModal();
})

