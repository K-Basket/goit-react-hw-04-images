import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Header, Form, Button } from './Styled';
import { ReactComponent as SearchIcon } from '../img/search-solid.svg';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  //  записываем в state из поля input
  function handleInputChange(evt) {
    setSearch(evt.currentTarget.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (search.trim() === '') {
      Notiflix.Notify.warning('Please enter search data');
      return;
    }
    // передаем ч/з пропс значениие search в App
    onSubmit(search);
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

// ============== =================== ================== =====================

// const INITIAL_STATE = { search: '' }; // для очистки input

// export class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   // метод записывает в state значение, которое вводим в поле input
//   handleInputChange = evt => {
//     this.setState({ search: evt.currentTarget.value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();

//     if (this.state.search.trim() === '') {
//       Notiflix.Notify.warning('Please enter search data');
//       return;
//     }

//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ ...INITIAL_STATE });
//   };

//   render() {
//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <Button type="submit">
//             <SearchIcon width="13" height="13" />
//           </Button>

//           <input
//             type="text"
//             name="search"
//             // в value записываем данные из state
//             value={this.state.search}
//             // при вводе в поле атрибут onChange вызывает метод handleInputChange, который будет записывать вводимое в State
//             onChange={this.handleInputChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </Form>
//       </Header>
//     );
//   }
// }
