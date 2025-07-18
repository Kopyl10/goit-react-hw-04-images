import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ onClick }) {
  return (
    <div className="button-container">
      <button type="button" className="load-more-button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
