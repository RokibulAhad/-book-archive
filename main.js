const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const searchBooK = () => {
    document.getElementById('totalDisplayBooks').innerHTML = ""
    document.getElementById('totalSearchBooks').innerHTML = ""
    document.getElementById('search-result').innerHTML = ""
    document.getElementById('books-not-found').innerHTML = ""

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //DisplaySpinner
    toggleSpinner('block');

    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.docs.length)
            dataChecker(data)
        });
}

const dataChecker = (datalendth) => {

    if (datalendth.docs.length === 0) {
        const searchResult = document.getElementById('books-not-found');
        searchResult.innerHTML = '<h1>Please Write a Valid Book Name<h1/>';
        //StopSpinner
        toggleSpinner('none');
    }
    else {
        displaySearchResult(datalendth, datalendth.docs.slice(0, 20))

    }
}

const displaySearchResult = (bookTotal, book) => {
    console.log(book)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    //StopSpinner
    toggleSpinner('none');

    const totalDisplayBooks = document.getElementById('totalDisplayBooks')
    totalDisplayBooks.innerHTML = `<h2 class="text-center text-success mt-3">Total display Books:${book.length}</h2>`

    const totalSearchBooks = document.getElementById('totalSearchBooks')
    totalSearchBooks.innerHTML = `<h2 class="text-center text-success mt-3">Total search Books:${bookTotal.docs.length}</h2>`

    book.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 text-center">
                
               
                   <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : "Image Not Found"}-L.jpg " class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Title:${book.title ? book.title : "Data not found"}</h5>
                    <h5 class="card-title">Author:${book.author_name?.[0] ? book.author_name?.[0] : "Data not found"}</h5>
                    <h5 class="card-title">Publish year:${book.first_publish_year ? book.first_publish_year : "Data not found"}</h5>
                    <h5 class="card-title">Publisher:${book.publisher?.[0] ? book.publisher?.[0] : "Data not found"}</h5>
                </div>
            </div>
            `;
            if(book.cover_i === undefined){
                div.innerHTML = `
        <div class="card h-100 text-center">
                
               
                   <img src="images/404.jpg" class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Book Name:${book.title ? book.title : "Data not found"}</h5>
                    <h5 class="card-title">Author:${book.author_name?.[0] ? book.author_name?.[0] : "Data not found"}</h5>
                    <h5 class="card-title">Published year:${book.first_publish_year ? book.first_publish_year : "Data not found"}</h5>
                    <h5 class="card-title">Publisher:${book.publisher?.[0] ? book.publisher?.[0] : "Data not found"}</h5>
                </div>
            </div>
            `;
            }

            
        searchResult.appendChild(div);
    })
}