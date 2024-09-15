import React from "react";
import { Image } from "../../App/App.type"
import ImageCard from "../ImageCard/ImageCard"
import css from './ImageGallery.module.css'

interface ImageGalleryProps{
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (!Array.isArray(images)) {
    return <p>Невірний формат даних.</p>
  }
  return (
   <ul className={css.imageList}>
          {Array.isArray(images) && images.length === 0 && <p>За Вашим запитом не знайдено зображенью Спробуйте, будь ласка , з іншим запитом</p>}
          {Array.isArray(images) && images.map(img => (
              <li key={img.id} className={css.imageItem}>
                  <ImageCard image={img} onClick={onImageClick} />
             </li> 
          ))}
</ul>
  )
}

export default ImageGallery
