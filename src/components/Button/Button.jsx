import PropTypes from 'prop-types';
import { Btn } from './Styled';

export function Button({ onMoreLoad }) {
  return (
    <Btn onClick={onMoreLoad} type="button">
      Load more
    </Btn>
  );
}

Button.propTypes = {
  onMoreLoad: PropTypes.func.isRequired,
};
