import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Header, Form, Button } from './Styled';
import { ReactComponent as SearchIcon } from '../img/search-solid.svg';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');
  const [page] = useState(1);

  //  записываем в state из поля input
  function handleInputChange(evt) {
    setSearch(evt.currentTarget.value);
    // setPage(1)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (search.trim() === '') {
      Notiflix.Notify.warning('Please enter search data');
      return;
    }

    // передаем ч/з пропс значениие search и page в App
    onSubmit(search, page);
    setSearch('');
  }

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <SearchIcon width="13" height="13" />
        </Button>

        <input
          type="text"
          name="search"
          // в value записываем данные из state
          value={search}
          // при вводе в поле атрибут onChange вызывает метод handleInputChange, который будет записывать вводимое в State
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
