import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

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

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const API_KEY = "zKbEmOTumiq6bcRgNOFKq2wxoz95nHdp1lpOEviJJUI";
  const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

  const fetchImages = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(UNSPLASH_URL, {
        params: { query, page, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });

      if (response.data.results.length === 0) {
        setHasMore(false);
        toast.error(
          "Sorry, there are no images matching your search query. Please try again!"
        );
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setIsButtonVisible(true);
      }
    } catch (err: any) {
      setError(true);
      if (err.response && err.response.status === 403) {
        toast.error("Error: Please check your request limit.");
      } else {
        toast.error("An error occurred while loading images.");
      }
      console.error("Error while receiving images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setImages([]);
      setPage(1);
      setHasMore(true);
      setIsButtonVisible(false);
      fetchImages();
    }
  }, [query]);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSearchSubmit = (query: string) => {
    setQuery(query);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsButtonVisible(false);
    fetchImages();
  };

  const openModal = (image: Image) => {
    if (image) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && hasMore && isButtonVisible && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {loading && <Loader />}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
      <Toaster />
    </div>
  );
};

export default App;
