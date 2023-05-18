import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalCont } from './Styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ children, onClose }) {
  // вначале Mount, пототм WillUnmount
  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }
    // DidMount
    window.addEventListener('keydown', handleKeyDown);

    // WillUnmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalCont>{children}</ModalCont>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
