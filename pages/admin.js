import { useState, useEffect } from 'react';
import { storage, db } from "../pages/firebase/firebase";
import { collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import { TrashIcon } from '@heroicons/react/24/solid';
import { useLogin } from './useLogin';
import Login from './login';
import { useRouter } from 'next/router';

export default function Admin() {

  const { isLoggedIn } = useLogin();
  const router = useRouter();
  
  const [imageUpload, setImageUpload] = useState(null),
        [imageListState, setImageListState] = useState([]),
        [loading, setLoading] = useState(true),
        [books, setBooks] = useState([]),
        [textInputs, setTextInputs] = useState({}),
        [isPageUpdated, setPageUpdated] = useState(false),
        [showPrompt, setShowPrompt] = useState(false),
        [redirected, setRedirected] = useState(false); 

  const imageListRef = ref(storage, "images/");
  const bookCollectionRef = collection(db, "text");

  const fetchData = async () => {
    setLoading(true);

    const imageListResponse = await listAll(imageListRef);
    const imageUrlsWithMetadata = await Promise.all(
      imageListResponse.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);
        return { url, uploadDate: metadata.timeCreated };
      })
    );

    const sortedImages = imageUrlsWithMetadata.sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));

    const bookDataResponse = await getDocs(bookCollectionRef);
    const bookData = bookDataResponse.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setImageListState(sortedImages);
    setBooks(bookData);
    setLoading(false);
    
  };

  const uploadImage = () => {
    if (!imageUpload) return;
    const imageName = imageUpload.name;
    const imageSize = imageUpload.size; // Dateigröße in Bytes
    const maxSizeInBytes = 700 * 1024; // 700 KB in Bytes
    const sizeInMegabyte = (maxSizeInBytes / (1024 * 1024)).toFixed(2)

    if (imageSize > maxSizeInBytes) {
      alert(`Die Dateigröße überschreitet das maximale Limit von 700 KB. Ihre Datei beträgt ${sizeInMegabyte} MB`);
      console.log(sizeInMegabyte)
      return;
    }

    const imageRef = ref(storage, `images/${imageName}`);
    const uploadDate = new Date().toISOString();
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (!imageListState.some((image) => image.url === url)) {
          setImageListState((prev) => [...prev, { url, uploadDate }]);
          setPageUpdated(true);
          setShowPrompt(false)
        }
      });
    });
  };

  const deleteImage = async (imageName) => {
    try {
      const imageRef = ref(storage, imageName);
      await deleteObject(imageRef);

      const updatedImageList = imageListState.filter((image) => image.url !== imageName);
      setImageListState(updatedImageList);

      const book = books.find((book) => book.imageName === imageName);
      if (book) {
        await deleteDoc(doc(bookCollectionRef, book.id));
      }

      setPageUpdated(!isPageUpdated);
      console.log("Image successfully deleted:", imageName);
    } catch (error) {
      console.error("Error deleting the image:", error);
    }
  };

  const deleteText = async (textId) => {
    try {
      await deleteDoc(doc(bookCollectionRef, textId));
      setPageUpdated(!isPageUpdated);
    } catch (error) {
      console.error("Error deleting the text:", error);
    }
  };


  const uploadText = (imageName) => {
    const text = textInputs[imageName];
    if (text) {
      addDoc(collection(db, "text"), {
        imageName: imageName,
        text,
      })
        .then(() => {
          console.log("Text successfully uploaded");
          setPageUpdated(!isPageUpdated);
        })
        .catch((error) => {
          console.error("Error uploading the text:", error);
        });
    }
  };



  useEffect(() => {
    fetchData();
    
    if (!isLoggedIn && !redirected) {
      router.push('/login');
    } else if (isLoggedIn && !redirected) {
      router.push('/admin');
      setRedirected(true);
    }
     
    console.log('eingelogged', isLoggedIn)
  }, [isLoggedIn, isPageUpdated]);


  return (
    <div>
      {isLoggedIn ? (
    <div className="Admin">
      <label className='custom-file-upload'>
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
            setShowPrompt(true)
          }}
          accept="image/*"
        />
        <span className="button-text">Bild wählen</span>
      </label>
      <button className="uploadImage" onClick={uploadImage}>Bild Hochladen</button>

      {showPrompt && <div className="prompt">**Drücke auf "Bild Hochladen"**</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        imageListState.map((image, index) => (
          <div key={index} className="image-container-admin"> 
            <img className="responsive-image" src={image.url} alt="book"/>
          <div>
              <textarea className='input-field'
                type="text"
                placeholder="Enter text"
                value={textInputs[image.url] || ''}
                onChange={(e) => {
                  const newTextInputs = { ...textInputs };
                  newTextInputs[image.url] = e.target.value;
                  setTextInputs(newTextInputs);
                }}
              />
              <button className="uploadText" onClick={() => uploadText(image.url)}>Upload Text</button>
              <button className="button-container" onClick={() => deleteImage(image.url)}>
                <TrashIcon style={{ width: "20" }} />
              </button>
              {books.map((book) => (
                <div key={book.id}>
                  {book.imageName === image.url && (                  
                    <div className='book-text'>
                      {book.text}
                      <button className="delete-text" onClick={() => deleteText(book.id)}>
                        Delete Text
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
      ) : (
       
        <Login/>
        
      )}
    </div>
  );
}





