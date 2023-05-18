import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '7971179-456b552bdb2500af743f56cc5';
const PARAMS = 'image_type=photo&per_page=12&orientation=horizontal';

export async function getImages(searchData, page) {
  const { data } = await axios.get(
    `${BASE_URL}?key=${API_KEY}&${PARAMS}&q=${searchData}&page=${page}`
  );

  // return data;

  // =====================================

  const dataImage = {
    hits: data.hits.map(el => ({
      id: el.id,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    })),
  };

  const totalImages = { totalHits: data.totalHits };

  const dataImages = { ...dataImage, ...totalImages };

  return dataImages;
}

// getImages('89', 1).then  (console.log);
