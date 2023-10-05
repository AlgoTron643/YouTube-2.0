import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { demoProfilePicture } from '../utils/constants';

/* We are passing on the channelDetail from our Videos to our ChannelCard component */
/* For each channel, we automatically return a Box element */
/* When somebody clicks on to the channel, we the link to the display the channel logo */
/* Links to a dynamic channel with '/channel' */
/* "channelDetail?.snippet?.thumbnails?.high?.url" -> place where the url of our channel is sitting */
/* CardMedia's sx={{borderRadius: '50%'}} makes the channel logo round */
/* Needed to make logo dynamic to be used in profile picture upon click for later on */
/* Make our profile feature proof by immediately so upon clicking shows subscribers */
/* {channelDetail?.statistics?.subscriberCount && ( -> if there are at least one subscriber of the channel */
/* parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString() -> human readable subscriber number */
/* for reusable components in different position pass it as prop like marginTop to shift logo up */


const ChannelCard = ({channelDetail,marginTop}) => (
  <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px'}, //dynamic
      height: '326px',
      margin: 'auto',
      marginTop,
    }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', textAlign:'center', color:'#fff' }}>
        <CardMedia 
          image={channelDetail?.snippet?.thumbnails?.high?.url||demoProfilePicture} 
          alt={channelDetail?.snippet?.title} 
          sx={{borderRadius: '50%', height: '180px', width: '180px', mb:2, border: '1px solid #e3e3e3'}}
        />
        <Typography variant="h6">
          {channelDetail?.snippet?.title}
          <CheckCircle sx={{fontSize:14, color: 'gray', ml: '5px'}}/>
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography>
            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
          </Typography>
        )}
      </CardContent>
    </Link>
  </Box>
)

export default ChannelCard