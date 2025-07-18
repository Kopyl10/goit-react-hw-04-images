import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '51235432-547741da21716631263047801';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page,
          },
        });

        if (data.hits.length === 0) {
          Notiflix.Notify.failure('No images found. Try again.');
          return;
        }

        setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
        setTotalHits(data.totalHits);
      } catch (error) {
        Notiflix.Notify.failure('Oops! Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const loadMore = () => setPage(prev => prev + 1);
  const showModal = image => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const hasMore = images.length < totalHits;

  return (
    <div style={{ paddingBottom: '24px' }}>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery images={images} onImageClick={showModal} />

      {loading && <Loader />}
      {hasMore && !loading && <Button onClick={loadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};
