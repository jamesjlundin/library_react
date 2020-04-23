import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


class BookPagesInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.id, e.target.value);
  }

  render() {
    const pages = this.props.pages;
    return (
      <div>
        <label htmlFor="pages">Pages: </label>
        <input  type={'number'} 
                id={`pages`} 
                name={'pages'}
                value={pages} 
                onChange={this.handleChange} />
      </div>
    );
  }
}

class BookAuthorInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onInputChange(e.target.id, e.target.value);
  }
  render() {
    const author = this.props.author;
    return (
      <div>
        <label htmlFor="author">Author: </label>
        <input  type={'text'} 
                id={`author`} 
                name={'author'}
                value={author} 
                onChange={this.handleChange} />
      </div>
    );
  }
}

class BookTitleInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onInputChange(e.target.id, e.target.value);
  }
  render() {
    const title = this.props.title;
    return (
      <div>
        <label htmlFor="title">Title: </label>
        <input  type={'text'} 
                name={'title'}
                id={`title`} 
                value={title}
                onChange={this.handleChange} />
      </div>
    );
  }
}

class AddBooks extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
    this.state = {
      title: '',
      author: '',
      pages: '',
    };
  }
  handleInputChange(id, value) {
    this.setState({[id]: value});
  }
  addNewBook() {
    this.props.onSubmitNewBook(this.state.title, this.state.author, this.state.pages);
  }
  render() {
    const title = this.state.title;
    const author = this.state.author;
    const pages = this.state.pages;
    return (
      <div>
        <h1>Add A Book!</h1>
        <BookTitleInput 
          title={title}
          onInputChange={this.handleInputChange} />
        <br />
        <BookAuthorInput 
          author={author}
          onInputChange={this.handleInputChange} />
        <br />
        <BookPagesInput 
          pages={pages}
          onInputChange={this.handleInputChange} />
        <br />
        <button id={`newBook`} onClick={this.addNewBook}>Place On Shelf</button>
      </div>
    );
  }
}

class SingleBook extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeReadStatus = this.handleChangeReadStatus.bind(this);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
  }
  handleChangeReadStatus(e) {
    this.props.onReadStatusChange(e.target.id);
  }
  handleRemoveBook(e) {
    this.props.onRemoveBook(e.target.id);
  }
  render() {
    const book = this.props.book;
    return (
      <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.pages}</td>
        <td><button className={`toggleRead`} 
                    id={book.title.replace(/\s+/g, '')} 
                    onClick={this.handleChangeReadStatus}>{book.hasRead ? 'Read' : 'Not Read'}
                    </button>
                    </td>
        <td><button id={book.title.replace(/\s+/g, '')}
                    className={`removeBook ${book.title.replace(/\s+/g, '')}`}
                    onClick={this.handleRemoveBook}>Remove
                    </button>
                    </td>
      </tr>
    );
  }
}


class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.passReadStatusChange = this.passReadStatusChange.bind(this);
    this.passRemoveBook = this.passRemoveBook.bind(this);
  }
  passReadStatusChange(booktitle) {
    this.props.changeReadStatus(booktitle);
  }
  passRemoveBook(booktitle) {
    this.props.removeBook(booktitle);
  }
  render() {
    const rows = [];

    this.props.books.forEach(book => {
      rows.push(
        <SingleBook
        book={book}
        key={book.title}
        onReadStatusChange={this.passReadStatusChange}
        onRemoveBook={this.passRemoveBook} />
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read Status</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class TableHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>Book Library!</h1>
      </div>
    );
  }
}

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.addABook = this.addABook.bind(this);
    this.changeReadStatus = this.changeReadStatus.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.state = {
      books: [
        {title: 'The Hobbit', author: 'J.R.R Tolkien', pages: 295, hasRead: false},
        {title: 'Holes', author: 'Louis Sachar', pages: 240, hasRead: false},
        {title: 'A Game of Thrones', author: 'George R.R. Martin', pages: 694, hasRead: false}
      ],
    };
  }
  changeReadStatus(booktitle) {
    const thebooks = this.state.books;
    const newArray = [];
    thebooks.forEach((book) => {
      if (book.title.replace(/\s+/g, '') === booktitle) {
        book.hasRead = !book.hasRead;
      }
      newArray.push(book);
    });
    this.setState(
      { books: newArray }
    );
  }
  removeBook(bookTitle) {
    const thebooks = this.state.books;
    const newArray = [];
    thebooks.forEach((book) => {
      if (book.title.replace(/\s+/g, '') !== bookTitle) {
        newArray.push(book);
      }
    });
    this.setState(
      { books: newArray }
    );
  }
  addABook(title, author, pages) {
    const newBook = {
      title,
      author,
      pages,
      hasRead: false
    }
    this.setState(
      { books: [...this.state.books, newBook] }
    )
  }
  render() {
    return (
      <div>
        <TableHeader />
        <DataTable  books={this.state.books}
                    changeReadStatus={this.changeReadStatus}
                    removeBook={this.removeBook}/>
        <AddBooks onSubmitNewBook={this.addABook} />
      </div>
    );
  }
}

// const BOOKS = [
//   {title: 'The Hobbit', author: 'J.R.R Tolkien', pages: 295, hasRead: false},
//   {title: 'Holes', author: 'Louis Sachar', pages: 240, hasRead: false},
//   {title: 'A Game of Thrones', author: 'George R.R. Martin', pages: 694, hasRead: false}
// ];

ReactDOM.render(
  <React.StrictMode>
    <Library />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
