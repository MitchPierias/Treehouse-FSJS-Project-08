# <img src="https://i.ibb.co/6FWgBTN/logo.jpg" height="36" alt="Treehouse Logo"> Fullstack Javascript Tech Degree
## Project 8 - SQL Library Manager

### Usage
Install all required dependencies
```
npm install
```
Start the express server with
```
npm start
```
and navigate too [localhost:8000](localhost:8000)

### Project tasks
* Setup and Initialization
    - `.gitignore` correctly Setup
    - `npm install` and `npm start` execute properly
#### Books Table

| Key    | Type    | Required |
|--------|---------|----------|
| title  | string  | true     |
| author | string  | true     |
| genre  | string  | false    |
| year   | integer | false    |

#### Routes

| Path              | Method |
|-------------------|--------|
| /                 | get    |
| /books            | get    |
| /books/new        | get    |
| /books/new        | post   |
| /books/:id        | get    |
| /books/:id        | post   |
| /books/:id/delete | post   |

#### Views

| View               |
|--------------------|
| layout.pug         |
| index.pug          |
| new-book.pug       |
| update-book.pug    |
| error.pug          |
| page-not-found.pug |

* Book search
    - Add search functionality to the main booklist
    - Search `title`, `author`, `genre`, `year` fields
    - Case insensitive
    - Partial matches
    - Includes pagination
* Form fields
    - `title` and `author` fields are required, error message shows otherwise
    - Employ Sequalize validation, not HTML validation
    - Label selection focuses on related input
* Errors
    - Non existant `book_id` displays a `not found` error message
    - Defualt page not found displayed for invalid routes
* Styles
    - Use provided styles and match example mockups