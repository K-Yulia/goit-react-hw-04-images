import { useState, useEffect } from "react";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import * as API from 'Services/services';
import { GlobalStyle } from './GlobalStyle';
import { Wrapper } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () =>{
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [showLoadMore, setShowLoadMore] = useState(false);  
 
  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setStatus(Status.PENDING);
    
    API.fetchImages(inputValue, page)
      .then(data => {
        if (data.hits.length === 0) {
          setImages([]);
        setStatus(Status.REJECTED)
        return;
      }
        setImages(images => [...images, ...data.hits]);
        // setStatus(status.RESOLVED);
         setShowLoadMore(page < Math.ceil(data.totalHits / 12))     
       }
       )       
      .catch(error => {
      console.log(error);
    setStatus(Status.REJECTED);
      })
    .finally(setStatus(Status.RESOLVED));
   }, [inputValue, page]);
     

       
     
  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
    pageScrollToTop();
    };

   const handleOnClick = () => {
      setPage(prevState => prevState + 1);
  }
   const pageScrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

      return (
      <>
      <GlobalStyle />
      <Wrapper >
        <Searchbar onSubmit={handleFormSubmit} />
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && toast.error('Sorry, something went wrong. Please, try again')}

        <ImageGallery images={images} />
        {showLoadMore && <Button onClick={handleOnClick} />}
        <ToastContainer autoClose={3000} />
        </Wrapper>
        </>
    );
  }




