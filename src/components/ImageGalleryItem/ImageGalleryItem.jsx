import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './Styled';

export function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  onClose,
  onLargeImailURL,
}) {
  // функция передает largeImageURL в state App.jsx
  function handleLargeImageUrl(evt) {
    onLargeImailURL(evt.currentTarget.dataset.url);
  }

  // const { id, webformatURL, largeImageURL, onClose } = this.props;

  return (
    <GalleryItem onClick={onClose}>
      <img
        onClick={handleLargeImageUrl}
        src={webformatURL}
        alt={id}
        data-url={largeImageURL}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onLargeImailURL: PropTypes.func.isRequired,
};

// ============= ================== ==================== ====================

// export class ImageGalleryItem extends Component {
//   static propTypes = {
//     id: PropTypes.number,
//     webformatURL: PropTypes.string.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onLargeImailURL: PropTypes.func.isRequired,
//   };
//   // функция передает largeImageURL в state App.jsx
//   handleLargeImageUrl = evt => {
//     this.props.onLargeImailURL(evt.currentTarget.dataset.url);
//   };

//   render() {
//     const { id, webformatURL, largeImageURL, onClose } = this.props;

//     return (
//       <GalleryItem onClick={onClose}>
//         <img
//           onClick={this.handleLargeImageUrl}
//           src={webformatURL}
//           alt={id}
//           data-url={largeImageURL}
//         />
//       </GalleryItem>
//     );
//   }
// }
