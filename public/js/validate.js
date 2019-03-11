const bookForm = document.getElementById('new-book');
const titleElem = document.getElementById('title');
const authorElem = document.getElementById('author');

bookForm.addEventListener('submit', e => {
    if (!titleElem.value || !authorElem.value) {
        e.preventDefault();
        alert("Title and Author required");
    }
});