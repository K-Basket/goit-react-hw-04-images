import React, { Component } from 'react';
import { Main, Loading } from './Styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './Api/api';
import Notiflix from 'notiflix';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    showModal: false,
    searchData: '',
    largeImageURL: '',
    dataGallery: [],
    loader: false,
    page: 1,
    status: 'idle',
    button: false,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (prevState.searchData !== this.state.searchData) {
        const data = await getImages(this.state.searchData, this.state.page);
        console.log('getImages 1', data);

        this.setState({ status: 'pending', dataGallery: [], page: 1 });

        if (!data.totalHits) {
          this.setState({ status: 'rejected', page: 1 });
          Notiflix.Notify.info('Sorry, there are no such images');

          return;
        }

        this.setState(prevState => ({
          dataGallery: data.hits,
          totalHits: data.totalHits,
          status: 'resolved',
        }));
      }

      if (prevState.page !== this.state.page) {
        const data = await getImages(this.state.searchData, this.state.page);
        console.log('getImages 2', data);

        this.setState({ loader: true });

        this.setState(prevState => ({
          dataGallery: [...prevState.dataGallery, ...data.hits],
          loader: false,
        }));
      }
    } catch (error) {
      console.warn(error);
    }
  }

  // ===================================================================================================

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleFormSubmit = data => {
    this.setState({ searchData: data.search });
  };

  handleLargeImageURL = url => {
    this.setState({ largeImageURL: url });
  };

  addMoreload = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    // console.log(this.state.dataGallery);

    if (this.state.status === 'resolved') {
      return (
        <Main>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery>
            {this.state.dataGallery.map(
              ({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  onClose={this.toggleModal}
                  onLargeImailURL={this.handleLargeImageURL}
                />
              )
            )}
          </ImageGallery>

          {this.state.loader && (
            <Loading>
              <Loader />
            </Loading>
          )}
          {this.state.totalHits !== this.state.dataGallery.length && (
            <Button onMoreLoad={this.addMoreload} />
          )}

          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.largeImageURL} alt={this.state.searchData} />
            </Modal>
          )}
        </Main>
      );
    }

    if (this.state.status === 'idle') {
      return (
        <Main>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loading>
            <p>Введіть дані для пошуку</p>
          </Loading>
        </Main>
      );
    }

    if (this.state.status === 'pending') {
      return (
        <Main>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loading>
            <Loader />
          </Loading>
        </Main>
      );
    }

    if (this.state.status === 'rejected') {
      return (
        <Main>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loading>
            <p>{`Зображення "${this.props.searchData}" відсутні`}</p>
          </Loading>
        </Main>
      );
    }
  }
}
