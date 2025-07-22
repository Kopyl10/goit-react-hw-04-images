import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="gallery-item" onClick={() => onClick(image)}>
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
