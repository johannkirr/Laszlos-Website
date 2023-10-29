import { useState, useEffect } from 'react';
import { storage, db } from "../pages/firebase/firebase";
import { collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { TrashIcon } from '@heroicons/react/24/solid';

export default function TextLoading() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageListState, setImageListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [textInputs, setTextInputs] = useState({});
  const [isPageUpdated, setPageUpdated] = useState(false);

  const imageListRef = ref(storage, "images/");
  const bookCollectionRef = collection(db, "text");

  const fetchData = async () => {
    setLoading(true);

    // Fetch image list
    const imageListResponse = await listAll(imageListRef);
    const imageUrls = await Promise.all(
      imageListResponse.items.map(async (item) => getDownloadURL(item))
    );

    // Fetch book data
    const bookDataResponse = await getDocs(bookCollectionRef);
    const bookData = bookDataResponse.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setImageListState(imageUrls);
    setBooks(bookData);
    setLoading(false);
  };

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageName = imageUpload.name;
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // Überprüft, ob das Bild bereits in der Liste ist
        if (!imageListState.includes(url)) {
          setImageListState((prev) => [...prev, url]);
          setPageUpdated(!isPageUpdated);
        }
      });
    });
  };
  
  const deleteImage = async (imageName) => {
    try {
      // Löscht das Bild aus dem Storage
      const imageRef = ref(storage, `images/${imageName}`);
      await deleteObject(imageRef);

      // Entfernt das Bild aus der Liste
      setImageListState((prev) => prev.filter((url) => url !== imageName));
      setPageUpdated(!isPageUpdated);
    } catch (error) {
      console.error("Fehler beim Löschen des Bildes:", error);
      console.log(imageName)
    }
  };

  const deleteText = async (textId) => {
    try {
      await deleteDoc(doc(bookCollectionRef, textId));
      setPageUpdated(!isPageUpdated);
    } catch (error) {
      console.error("Fehler beim Löschen des Textes:", error);
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
          console.log("Text erfolgreich hochgeladen");
          setPageUpdated(!isPageUpdated);
        })
        .catch((error) => {
          console.error("Fehler beim Hochladen des Textes:", error);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [isPageUpdated]);

  return (
    <div className="Admin">
      <label className='custom-file-upload'>
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
          accept="image/*"
          title="Bild suchen"
        />
        <span className="button-text">Bild suchen</span>
      </label>
      <button className="uploadImage" onClick={uploadImage}>Bild hochladen</button>

      {loading ? (
        <div>Laden...</div>
      ) : (
        imageListState.map((imageName, index) => (
          <div key={index} className="image-container">
            <img width={200} height={200} src={imageName} alt="book" />
            <button className="button-container" onClick={() => deleteImage(imageName)}>
              <TrashIcon style={{ width: "20" }} />
            </button>
            <div>
              <input
                type="text"
                placeholder="Text eingeben"
                value={textInputs[imageName] || ''}
                onChange={(e) => {
                  const newTextInputs = { ...textInputs };
                  newTextInputs[imageName] = e.target.value;
                  setTextInputs(newTextInputs);
                }}
              />
              <button className="uploadText" onClick={() => uploadText(imageName)}>Text hochladen</button>
              {books.map((book) => (
                <div key={book.id}>
                  {book.imageName === imageName && (
                    <div>
                      {book.text}
                      <button onClick={() => deleteText(book.id)}>Text löschen</button>
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














