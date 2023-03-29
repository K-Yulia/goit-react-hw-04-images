import { Component } from "react";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import * as API from 'Services/services';
import { GlobalStyle } from './GlobalStyle';
import { Wrapper } from './App.styled';
export class App extends Component {
  state = {
  inputValue: '',
  page: 1,
  images: [],
  status: 'idle',
  showLoadMore: false,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { inputValue, page } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
       
      try {
        this.setState({ status: 'pending' });
        const data = await API.fetchImages(inputValue, page);
        if (data.hits.length === 0) {
          this.setState({ images: [],  status: 'rejected'});
          }
       this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          status: 'resolved',
          showLoadMore: this.state.page < Math.ceil(data.totalHits / 12)
       }
       ));
      } catch (error) {
        console.log(error);
      } 
    }
  }

  handleFormSubmit = inputValue => {
    this.setState({ inputValue, images: [], page: 1 });
     this.pageScrollToTop();
    };

  handleOnClick = () => {
      this.setState(prevState => ({ page: prevState.page + 1, }));
  }
   pageScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  render() {
  const { images, status, showLoadMore } = this.state;
    return (
      <>
      <GlobalStyle />
      <Wrapper >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && toast.error('Sorry, something went wrong. Please, try again')}

        <ImageGallery images={images} />
        {showLoadMore && <Button onClick={this.handleOnClick} />}
        <ToastContainer autoClose={3000} />
        </Wrapper>
        </>
    );
  }
}



