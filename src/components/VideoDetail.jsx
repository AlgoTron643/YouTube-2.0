import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import ReactPlayer from 'react-player'; // To showcase our videos
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle} from '@mui/icons-material';

// Local imports
import {Videos} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

// created the layout for our VideoDetail component 

// We have the videoDetail data that we can render this ReactPlayer

/* This component is responsible for loading the youtube video from rapid API's youtube video component */
// Stack will be column wise or row based on size of the screen making it dynamic
// Inner Box will wrap the left side of our video meaning actual video, title, channel name and likes
// ReactPlayer is a self closing component that accepts a url; since we have to pass the url so its best 
// to fetch the data and then later on continue with the layout so we need the id of the video we want to fetch
// fetchFromAPI(`videos?part=snippet,statistics&id=${id}`) gives videoDetail data
// Load the video data from  url={`https://youtube.com/watch?v=${id}`}/> as in youtube
// navigate and control using 'controls'
// All our video details are in the 'videoDetail' component
// Error : can not read properties of null as snippets sometimes contains 
// doesn't sometimes contain data meaning it has not loaded yet
// parseInt(viewCount).toLocaleString() -> more readable for say millions, opacity =0.7 for making it less noticeable
// <Stack direction="row" gap="20px> so that likes and views don't overlap with each other
// right side bar containing recommended videos will then come up
// we want to get all the videos from the following id props and just get videos 
// and not related channels -> `search?part=snippet&relatedToVideoId=${id}&type=video`

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data)=> setVideoDetail(data.items[0]));  
      
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data)=> setVideos(data.items));
  }, [id])

  if(!videoDetail?.snippet) return 'Loading..'
  
  // destructure title and descripion of videoDetail via object destructing
  const { snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount} } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{xs:'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
            <ReactPlayer url={`https://youtube.com/watch?v=${id}`}
            className="react-player" controls/> 
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title} 
            </Typography>
            <Stack direction="row" justifyContent="space-between" 
            sx={{color: '#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:'subtitle1', md: 'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{fontSize:'12px', color: 'gray', ml:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md:1, xs:5}} justifyContent="center" alignItems="center">
        <Videos videos={videos} direction='column'/>
      </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail