import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseEsc);
  }

  onCloseEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalBox>
           {this.props.children}
        </ModalBox>
      </Overlay>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};