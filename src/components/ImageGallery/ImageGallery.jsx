import React from 'react';
import { Gallery } from './Styled';

export function ImageGallery({ children }) {
  return (
    <>
      <Gallery>
        <>{children}</>
      </Gallery>
    </>
  );
}

// export class ImageGallery extends Component {

//   render() {
//     return (
//       <>
//         <Gallery>
//           <>{this.props.children}</>
//         </Gallery>
//       </>
//     );
//   }
// }
