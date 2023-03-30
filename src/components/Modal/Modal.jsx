import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, children}) => {
  useEffect(() => {
    const onCloseEsc = event => {
    if (event.code === 'Escape') {
      onClose();
    }
    };
    window.addEventListener('keydown', onCloseEsc)
        return () => {window.removeEventListener('keydown', onCloseEsc);
    }
  }, [onClose])
    

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  
    return createPortal(
      <Overlay onClick={handleOverlayClick}>
        <ModalBox>
           {children}
        </ModalBox>
      </Overlay>,
      modalRoot,
    );
  }

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};