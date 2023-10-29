
import { useState, useEffect } from 'react';
import { storage, db } from "./firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { TrashIcon } from '@heroicons/react/24/solid';

function Admin() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageListState, setImageListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [textInputs, setTextInputs] = useState({}); // Hinzugefügter State für Textfelder
  const [isPageUpdated, setPageUpdated] = useState(false);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageName = imageUpload.name;
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageListState((prev) => [...prev, url]);
        setPageUpdated(!isPageUpdated);
      });
    });
  };

  const deleteImage = (imageName) => {
    const imageRefToDelete = ref(storage, `images/${imageName}`);
    deleteObject(imageRefToDelete)
      .then(() => {
        setImageListState((prev) => prev.filter(name => name !== imageName));
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };


    const uploadText = (imageName) => {
      const text = textInputs[imageName];
      if (text) {
        addDoc(collection(db, "text"), {
          imageName,
          text,
        }).then(() => {
          console.log("Text erfolgreich hochgeladen");
          setPageUpdated(!isPageUpdated);
        }).catch((error) => {
          console.error("Fehler beim Hochladen des Textes:", error);
        });
      }
    };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      const newImageNames = {};

      for (const item of response.items) {
        newImageNames[item.name] = '';
      }

      setTextInputs(newImageNames);
      setImageListState(Object.keys(newImageNames));
      setLoading(false);
    });
  }, [isPageUpdated]);

  const bookCollectionRef = collection(db, "text");

  useEffect(() => {
    const getData = async () => {
      const res = await getDocs(bookCollectionRef);
      setBooks(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
      return res;
    }
    getData();
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
      <button className="uploadImage" onClick={uploadImage}> Bild hochladen </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        imageListState.map((imageName, index, url) => (
          <div key={index} className="image-container">
            <span className="image-name">{imageName}</span>
            <img width={200} height={200} src={imageName} alt="book" />
            <button className="button-container" onClick={() => deleteImage(imageName)}><TrashIcon style={{width:"20"}}/></button>
            <div>
              <input
                type="text"
                placeholder="Text eingeben"
                value={textInputs[imageName]}
                onChange={(e) => {
                  const newTextInputs = { ...textInputs };
                  newTextInputs[imageName] = e.target.value;
                  setTextInputs(newTextInputs);
                }}
              />
              <button className="uploadText" onClick={() => uploadText(imageName)}> Upload Text </button>
              {/* Hier wird der Text nur für das entsprechende imageName angezeigt */}
              {books.map((book) => (
                <div key={book.id}>
                  {book.imageName === imageName && <div>{book.text}</div>}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}


export default Admin;