import  { useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import axios from 'axios'
import ImageGallery from './components/ImageGallery/ImageGallery'
import { Toaster } from 'react-hot-toast'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import Loader from './components/Loader/Loader'
import './App.css'
import ImageModal from './components/ImageModal/ImageModal'

const API_KEY = 'QDSQSzrhDXbytyMlxlefkODEZIpjGy2dlfBWuurC1TM';
const API_URL = 'https://api.unsplash.com/search/photos';
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  
     const handleSearch = async (newQuery) => {
    try {
      setIsLoading(true);
      setError(null);
      setQuery(newQuery);
      setHasSearched(true);
      const { data } = await axios.get(API_URL, {
        params: { query: newQuery, page:1 , per_page: 12 },
        headers: { Authorization: `Client-ID ${API_KEY}` }
      });
      
      setImages(data.results);
      setPage(2);
     
    } catch(error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
     }
  const LoadMoreImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(API_URL, {
        params: {
          query,
          page,
          per_page: 12
        },
        headers:{Authorization:`Client-ID ${API_KEY}`}
      })

      setImages(prevImages => [...prevImages, ...data.results])
      setPage(prevPage => prevPage + 1);
      
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleImageClick = (image) => {
    setModalImage(image);
  }
  const closeModal = () => {
    setModalImage(null);
 }
  return (
    <>
      <div>
        <SearchBar onSubmit={handleSearch} />
        {images.length === 0 && isLoading && <Loader />}
        {!isLoading && images.length === 0 && !error && hasSearched && (
          <p style={{color: 'blue' , textAlign: 'center', fontSize: 30}}>За Вашим запитом результатів не знайдено</p>
        )}

        {error && <ErrorMessage message={error} />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} onImageClick={handleImageClick} />
            {isLoading && <Loader />}
            {images.length > 0 && !isLoading && !error && <LoadMoreBtn onClick={LoadMoreImages}/>}
          </>
        )}
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={closeModal}
          image={modalImage}/>
          <Toaster
          position="top-right"
          />
      </div>
      
    </>
  )
}

export default App
