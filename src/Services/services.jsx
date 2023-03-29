import axios from 'axios';


const API_KEY = '33027161-d89bfd7878d1ab614bd7e969e';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (inputValue, page) => {
  const response = await axios.get(
    `?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data; 
};

