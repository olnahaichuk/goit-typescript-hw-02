import Modal from "react-modal"
import css from './ImageModal.module.css'
import { Image } from "../../App/App.type";

interface ImageModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    image: Image | null;
}

const ImageModal : React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
    if (!image) return null;
  return (
      <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          className={css.modal}
          overlayClassName={css.overlay}
          ariaHideApp={false}
      shouldCloseOnOverlayClick={true}>
          <img src={image.urls.regular} alt={image.alt_description} className={css.image}></img>
         
          <div className={css.modalDescr}>
              <p>{image.alt_description || "No description"}</p>
              <p>By {image.user.name }</p>
              <p>Likes: {image.likes}</p>
          </div>
         
    </Modal>
  )
}

export default ImageModal
