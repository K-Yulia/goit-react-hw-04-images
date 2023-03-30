import '../styles.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import { Header, SearchForm, SearchFormBtn, SearchFormInput} from './Searchbar.styled'


export const Searchbar = ({onSubmit}) => {
  const [inputValue, setInputValue] = useState('');
  
const handleInput = event => {
   setInputValue(event.target.value.toLowerCase());
  };

  const handleFormSUbmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Please, enter some text', {
        position: 'top-center',
        duration: 3000,
          });
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };
 
    return (
      <Header className="Searchbar">
        <SearchForm className="SearchForm" onSubmit={handleFormSUbmit}>
          <SearchFormBtn type="submit" className="SearchFormButton">
            <GoSearch style={{ width: 20, height: 20 }} />
          </SearchFormBtn>
          <SearchFormInput
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            name="inputValue"
            value={inputValue}
            autoFocus
            onChange={handleInput}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};