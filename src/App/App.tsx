import  {  useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import axios from 'axios'
import ImageGallery from '../components/ImageGallery/ImageGallery'
import { Toaster } from 'react-hot-toast'
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'

import ImageModal from '../components/ImageModal/ImageModal'
import { ApiResponce, Image } from './App.type'

const API_KEY = 'QDSQSzrhDXbytyMlxlefkODEZIpjGy2dlfBWuurC1TM';
const API_URL = 'https://api.unsplash.com/search/photos';


function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [query, setQuery] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  
  const handleSearch = async(newQuery: string): Promise<void> =>  {
    try {
      setIsLoading(true);
      setError(null);
      setQuery(newQuery);
      setHasSearched(true);
      const { data }  = await axios.get(API_URL, {
        params: { query: newQuery, page:1 , per_page: 12 },
        headers: { Authorization: `Client-ID ${API_KEY}` }
      });
      
      setImages(data.results);
      setPage(2);
     
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  const loadMoreImages = async ():Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ApiResponce>(API_URL, {
        params: {
          query,
          page,
          per_page: 12
        },
        headers:{Authorization:`Client-ID ${API_KEY}`}
      })

      setImages(prevImages => [...prevImages, ...data.results])
      setPage(prevPage => prevPage + 1);
      
    } catch (error: unknown) {
      if (error instanceof Error) {
           setError(error.message)
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleImageClick = (image: Image) => {
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
            {images.length > 0 && !isLoading && !error && <LoadMoreBtn onClick={loadMoreImages}/>}
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
