import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Box } from '@mui/material';

import {Videos, ChannelCard} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

/* http://localhost:3000/channel/UCmXmlB4-HJytD7wek0Uo97A  so need to destruct channel and its ID */

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const {id} = useParams();

  // we pass the marginTop prop to ChannelCard to adjust it upwards or the measurement given
  // inner box updates margin right on small devices and larger than 100px, so 100px margin 
  // right wont be applied to extra small devices

  // create a new UseEffect based on that id and will work as soon as our component opens
  // rendering when our id changes by passing it into the dependency array
  // first channel in the list
  // change url to get different part of the data
  useEffect(() => { 
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0])); 

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((videosData) => setVideos(videosData?.items)); 
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.9694613945193407) 15%, rgba(145,7,118,1) 78%, rgba(0,212,255,1) 100%)',
          zIndex:10, // appears above profile image
          height: '300px'
        }}/>
        <ChannelCard channelDetail={channelDetail} marginTop="-93px"/> 
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr: {sm: '100px'}}}/>
        <Videos videos={videos}/>
      </Box>
    </Box>
  );
};

export default ChannelDetail