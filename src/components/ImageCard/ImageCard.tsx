import styles from "./ImageCard.module.css";

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

interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

const ImageCard = ({ image, onImageClick }: ImageCardProps) => {
  return (
    <div className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        onClick={() => onImageClick(image)}
      />
    </div>
  );
};

export default ImageCard;

