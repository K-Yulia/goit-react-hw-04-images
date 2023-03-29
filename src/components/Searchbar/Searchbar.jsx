import '../styles.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import { Header, SearchForm, SearchFormBtn, SearchFormInput} from './Searchbar.styled'


export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInput = event => {
    this.setState({ inputValue: event.target.value.toLowerCase() });
  };

  handleFormSUbmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.error('Please, enter some text', {
        position: 'top-center',
        duration: 3000,
          });
      return;
    }


    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <Header className="Searchbar">
        <SearchForm className="SearchForm" onSubmit={this.handleFormSUbmit}>
          <SearchFormBtn type="submit" className="SearchFormButton">
            <GoSearch style={{ width: 20, height: 20 }} />
          </SearchFormBtn>

          <SearchFormInput
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            name="inputValue"
            value={this.state.inputValue}
            autoFocus
            onChange={this.handleInput}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};