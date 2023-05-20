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
