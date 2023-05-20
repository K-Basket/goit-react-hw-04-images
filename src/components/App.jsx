import React, { useEffect, useState } from 'react';
import { Main, Loading } from './Styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './Api/api';
import Notiflix from 'notiflix';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export function App() {
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [dataGallery, setDataGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  // функция запускается при первом поиске (Search)
  useEffect(() => {
    if (searchData) {
      setStatus('pending');
      setDataGallery([]);

      (async () => {
        try {
          const data = await getImages(searchData, 1);
          console.log('getImages 1 :>> ', data, 1);

          if (!data.totalHits) {
            setStatus('rejected');
            Notiflix.Notify.info('Sorry, there are no such images');

            return;
          }

          setDataGallery(await data.hits);
          setTotalHits(await data.totalHits);
          setStatus('resolved');
        } catch (error) {
          console.warn(error);
        }
      })();
    }
  }, [searchData]);

  // функция запускаетсяя при нажатии на btn LoadMore
  useEffect(() => {
    if (page > 1) {
      setLoader(true);

      (async () => {
        try {
          const data = await getImages(searchData, page);
          console.log('getImages 2 :>> ', data, page);

          setDataGallery(prev => [...prev, ...data.hits]);

          setLoader(false);
        } catch (error) {
          console.warn(error);
        }
      })();
    }
  }, [searchData, page]);

  function toggleModal() {
    setShowModal(prev => !prev);
  }
  // получаем данные из Searchbar
  function handleFormSubmit(data, page) {
    setSearchData(data);
    setPage(page);
  }

  function handleLargeImageURL(url) {
    setLargeImageURL(url);
  }

  function addMoreload() {
    setPage(prev => prev + 1);
  }

  if (status === 'resolved') {
    return (
      <Main>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery>
          {dataGallery.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClose={toggleModal}
              onLargeImailURL={handleLargeImageURL}
            />
          ))}
        </ImageGallery>

        {loader && (
          <Loading>
            <Loader />
          </Loading>
        )}
        {totalHits !== dataGallery.length && (
          <Button onMoreLoad={addMoreload} />
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={searchData} />
          </Modal>
        )}
      </Main>
    );
  }

  if (status === 'idle') {
    return (
      <Main>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loading>
          <p>Введіть дані для пошуку</p>
        </Loading>
      </Main>
    );
  }

  if (status === 'pending') {
    return (
      <Main>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loading>
          <Loader />
        </Loading>
      </Main>
    );
  }

  if (status === 'rejected') {
    return (
      <Main>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loading>
          <p>{`Зображення "${searchData}" відсутні`}</p>
        </Loading>
      </Main>
    );
  }
}
