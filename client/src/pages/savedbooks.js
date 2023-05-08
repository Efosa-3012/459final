import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/books/savedBooks/${userID}`
        );
        setSavedBooks(response.data.savedBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedBook();
  }, []);

  return (
    <div>
      {""}
      <h1>Saved Books</h1>
      <ul>
        {savedBooks.map((book) => (
          <li key={book._id}>
            <div className="isbn">
              <h2>{book.isbn}</h2>
            </div>
            <div>
              <h2>{book.name}</h2>
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
