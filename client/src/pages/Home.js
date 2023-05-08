import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [savedBooks, setSaveBooks] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books");
        setBooks(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/books/savedBooks/ids/${userID}`
        );
        setSaveBooks(response.data.savedBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
    fetchSavedBook();
  }, []);

  const saveBook = async (bookID) => {
    try {
      const response = await axios.put("http://localhost:3001/books", {
        bookID,
        userID,
      });
      setSaveBooks(response.data.savedBooks);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isBookSaved = (bookID) => savedBooks.includes(bookID);

  return (
    <div>
      {""}
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <div className="isbn">
              <h2>{book.isbn}</h2>
            </div>
            <div>
              <h2>{book.name}</h2>
              <button
                onClick={() => saveBook(book._id)}
                disabled={isBookSaved(book._id)}
              >
                {isBookSaved(book._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div>
              <h2>{book.author}</h2>
            </div>
            <div>
              <h2>{book.N0_copies}</h2>
            </div>
            <img src={book.imgurl} alt={book.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
