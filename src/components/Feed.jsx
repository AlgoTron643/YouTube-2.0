import {useState, useEffect} from 'react';
import {Box, Stack, Typography} from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import {SideBar,Videos} from './';

/* nice subtitles, headings and body elements */
/* lower box for videos*/
/* ./ as we are already in components folder */
/* using usestate we can use the fetchFromAPI function as soon as our feed loads */
/* useEffect is a lifecycle hook called when the component initially loads;
   provide dependency array and leave it empty where code will run when we reload page
*/
/* In fetchFromAPI we want to pass the remainder of the url we want to call */
/* use state field defined ensures any selected category chosen is updated and 
   fetch the videos for that specific categories
*/
/* We use selectedCategory in the dependency array in fetchFromAPI 
   to allow it to recall the fetchFromAPI function whenever we change our category
*/

/* selectedCategory in Feed and fetchFromAPI allows us to also update the category header name */
/* fetchFromAPI is an asynchronous function that returns a promise (successful return) 
   and we chain a .then to it -> get data and set it to the */

/* return videos now by updating Videos component */

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(()=> {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data) => setVideos(data.items))
    },[selectedCategory]);

  return (
    <Stack 
    sx={{flexDirection: {sx: "column", md: "row"}}}
    >
      <Box 
      sx={{height: { sx: 'auto', md: '92vh'}, 
      borderRight: '1px solid #3d3d3d',px:{sx: 0, md: 2}}}
      >
      <SideBar
        selectedCategory=
        {selectedCategory}
        setSelectedCategory=
        {setSelectedCategory}
      />
      <Typography className="copyright" variant="body2" sx={{mt: 1.5, color: '#fff',}}>
        Copyright © 2023 Newaz Saif
      </Typography>
      </Box>

      <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex:2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{color: 'white'}}>
          {selectedCategory} <span style={{color:'#FC1503'}}>videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;