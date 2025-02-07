import Modal from "react-modal";
import styles from "./ImageModal.module.css";

// Типизация для изображения
interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  user: {
    name: string;
    location: string | null;
    links: {
      html: string;
    };
  };
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

const ImageModal = ({ isOpen, onClose, image }: ImageModalProps) => {
  if (!image) return null;

  const { alt_description, urls, user, likes } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200}
    >
      <div className={styles.modalContent}>
        <img
          src={urls.full}
          alt={alt_description}
          className={styles.modalImage}
        />
        <div className={styles.imageInfo}>
          <p>
            <strong>Author:</strong> {user.name}
          </p>
          <p>
            <strong>Likes:</strong> {likes}
          </p>
          <p>
            <strong>Location:</strong> {user.location || "Unknown"}
          </p>
          <p>
            <strong>Profile Link:</strong>{" "}
            <a href={user.links.html} target="_blank" rel="noopener noreferrer">
              Visit Author's Profile
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
