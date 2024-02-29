import { useState, useEffect } from 'react';
import { storage, db } from "../pages/firebase/firebase";
import { collection, getDocs,} from "firebase/firestore";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";


export default function TextLoading() {
  
  const [imageListState, setImageListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const imageListRef = ref(storage, "images/");
  const bookCollectionRef = collection(db, "text");

  const fetchData = async () => {
    setLoading(true);

    // Fetch image list with metadata
    const imageListResponse = await listAll(imageListRef);
    const imageUrlsWithMetadata = await Promise.all(
      imageListResponse.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item); // Änderung hier       
        return { url, uploadDate: metadata.timeCreated};
      })
    );

    // Sort images by upload date
    const sortedImages = imageUrlsWithMetadata.sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));

    // Fetch book data
    const bookDataResponse = await getDocs(bookCollectionRef);
    const bookData = bookDataResponse.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setImageListState(sortedImages);
    setBooks(bookData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Admin">
      {loading ? (
        <div>Loading...</div>
      ) : (
        imageListState.map((image, index) => (
          <div key={index} className="image-container">
            <img className="responsive-image" 
                 src={image.url} 
                 alt="book"/>
            <div>
              {books.map((book) => (
                <div key={book.id}>
                  {book.imageName === image.url && (                  
                    <div className='book-text'>
                      {book.text}
                    </div>                   
                  )}
                  
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}















