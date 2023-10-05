import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

/* Start from the base url -> helps us to call /baseUrl/getChannel or use to make /getVideos  making it dynamic and using different endpoints using Rapid API */

/* we get a response with data destructed and then call it from our components */

/* The below function helps to call this API, pass in dynamic URL, then call it from any component in our application  */

// 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,


const options = {
    //url: BASE_URL,
    params: {
      maxResults: '50',
    },
    headers: {
      'X-RapidAPI-Key': '97c340ebfamsh16d1eb64c9c2be9p19686ajsnfcf5106eae71',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
  };

export const fetchFromAPI = async (url) => {
  const {data} = await axios.get(`${BASE_URL}/${url}`, options);
    
  return data;  
};