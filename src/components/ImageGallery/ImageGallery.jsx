import React, { Component } from 'react';
import { Gallery } from './Styled';

export class ImageGallery extends Component {
  state = {
    dataGallery: [],
    loader: false,
    page: 1,
    status: 'idle',
  };

  render() {
    return (
      <>
        <Gallery>
          <>{this.props.children}</>
        </Gallery>
      </>
    );
  }
}
