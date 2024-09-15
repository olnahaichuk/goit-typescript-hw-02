import { Image } from '../../App/App.type'
import css from './ImageCard.module.css'
interface ImageCardProps{
  image: Image;
  onClick: (image: Image) => void;
}
const ImageCard:React.FC<ImageCardProps>= ({image, onClick}) => {
  return (
      <div className={css.ImageCard} onClick={() => onClick(image)}>     
      <img src={image.urls.small} alt={image.alt_description}  />
    </div>
  )
}

export default ImageCard
