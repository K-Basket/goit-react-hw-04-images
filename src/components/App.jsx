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
  // const [button, setButton] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  // функция запускается при первом поиске Search

  // useEffect(() => {
  //   if (searchData) {
  //     setPage(1);
  //   }
  // }, [searchData]);

  useEffect(() => {
    if (searchData) {
      setStatus('pending');
      setDataGallery([]);
      setPage(1);

      (async () => {
        try {
          const data = await getImages(searchData, page);
          console.log('getImages 1 :>> ', data, page);

          // setStatus('pending');
          // setDataGallery([]);

          // setPage(1);

          if (!data.totalHits) {
            setStatus('rejected');
            // setPage(1);

            Notiflix.Notify.info('Sorry, there are no such images');

            return;
          }

          setDataGallery(await data.hits);
          setTotalHits(await data.totalHits);
          // setStatus('resolved');
        } catch (error) {
          console.warn(error);
        }
      })();

      setStatus('resolved');
    }
  }, [searchData]);

  useEffect(() => {
    if (page > 1) {
      setLoader(true);

      (async () => {
        try {
          const data = await getImages(searchData, page);
          console.log('getImages 2 :>> ', data, page);

          // setLoader(true);
          setDataGallery([...dataGallery, ...data.hits]);

          // setLoader(false);
        } catch (error) {
          console.warn(error);
        }
      })();

      setLoader(false);
    }
  }, [page]);

  //   if (page > 1) {
  //     async () => {
  //       try {
  //         const data = await getImages(searchData, page);
  //         console.log('getImages 2 :>> ', data);

  //         setLoader(true);
  //         setDataGallery([...dataGallery, ...data.hits]);

  //         setLoader(false);
  //       } catch (error) {
  //         console.warn(error);
  //       }
  //     };
  //   }
  // }, [page]);

  // async componentDidUpdate(prevProps, prevState) {
  //   try {
  //     if (prevState.searchData !== this.state.searchData) {
  //       const data = await getImages(this.state.searchData, this.state.page);
  //       console.log('getImages 1', data);

  //       this.setState({ status: 'pending', dataGallery: [], page: 1 });

  //       if (!data.totalHits) {
  //         this.setState({ status: 'rejected', page: 1 });
  //         Notiflix.Notify.info('Sorry, there are no such images');

  //         return;
  //       }

  //       this.setState(prevState => ({
  //         dataGallery: data.hits,
  //         totalHits: data.totalHits,
  //         status: 'resolved',
  //       }));
  //     }

  // if (prevState.page !== this.state.page) {
  //   const data = await getImages(this.state.searchData, this.state.page);
  //   console.log('getImages 2', data);

  //   this.setState({ loader: true });

  //   this.setState(prevState => ({
  //     dataGallery: [...prevState.dataGallery, ...data.hits],
  //     loader: false,
  //   }));
  // }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // ===================================================================================================

  function toggleModal() {
    setShowModal(prev => !prev);

    // this.setState(prevState => ({
    //   showModal: !prevState.showModal,
    // }));
  }

  function handleFormSubmit(data) {
    setSearchData(data);

    // this.setState({ searchData: data });
  }

  function handleLargeImageURL(url) {
    setLargeImageURL(url);

    // this.setState({ largeImageURL: url });
  }

  function addMoreload() {
    // setPage(prev => prev + 1);
    setPage(page + 1);

    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
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

// Class =============== =============== =============== ===============

// export class App extends Component {
//   state = {
//     showModal: false,
//     searchData: '',
//     largeImageURL: '',
//     dataGallery: [],
//     loader: false,
//     page: 1,
//     status: 'idle',
//     button: false,
//     totalHits: 0,
//   };
//   // продолжать здесь!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   async componentDidUpdate(prevProps, prevState) {
//     try {
//       if (prevState.searchData !== this.state.searchData) {
//         const data = await getImages(this.state.searchData, this.state.page);
//         console.log('getImages 1', data);

//         this.setState({ status: 'pending', dataGallery: [], page: 1 });

//         if (!data.totalHits) {
//           this.setState({ status: 'rejected', page: 1 });
//           Notiflix.Notify.info('Sorry, there are no such images');

//           return;
//         }

//         this.setState(prevState => ({
//           dataGallery: data.hits,
//           totalHits: data.totalHits,
//           status: 'resolved',
//         }));
//       }

//       if (prevState.page !== this.state.page) {
//         const data = await getImages(this.state.searchData, this.state.page);
//         console.log('getImages 2', data);

//         this.setState({ loader: true });

//         this.setState(prevState => ({
//           dataGallery: [...prevState.dataGallery, ...data.hits],
//           loader: false,
//         }));
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   }

//   // ===================================================================================================

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   handleFormSubmit = data => {
//     this.setState({ searchData: data });
//     console.log('data :>> ', data);
//   };

//   handleLargeImageURL = url => {
//     this.setState({ largeImageURL: url });
//   };

//   addMoreload = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     // console.log(this.state.dataGallery);

//     if (this.state.status === 'resolved') {
//       return (
//         <Main>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ImageGallery>
//             {this.state.dataGallery.map(
//               ({ id, webformatURL, largeImageURL }) => (
//                 <ImageGalleryItem
//                   key={id}
//                   webformatURL={webformatURL}
//                   largeImageURL={largeImageURL}
//                   onClose={this.toggleModal}
//                   onLargeImailURL={this.handleLargeImageURL}
//                 />
//               )
//             )}
//           </ImageGallery>

//           {this.state.loader && (
//             <Loading>
//               <Loader />
//             </Loading>
//           )}
//           {this.state.totalHits !== this.state.dataGallery.length && (
//             <Button onMoreLoad={this.addMoreload} />
//           )}

//           {this.state.showModal && (
//             <Modal onClose={this.toggleModal}>
//               <img src={this.state.largeImageURL} alt={this.state.searchData} />
//             </Modal>
//           )}
//         </Main>
//       );
//     }

//     if (this.state.status === 'idle') {
//       return (
//         <Main>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <Loading>
//             <p>Введіть дані для пошуку</p>
//           </Loading>
//         </Main>
//       );
//     }

//     if (this.state.status === 'pending') {
//       return (
//         <Main>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <Loading>
//             <Loader />
//           </Loading>
//         </Main>
//       );
//     }

//     if (this.state.status === 'rejected') {
//       return (
//         <Main>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <Loading>
//             <p>{`Зображення "${this.props.searchData}" відсутні`}</p>
//           </Loading>
//         </Main>
//       );
//     }
//   }
// }
