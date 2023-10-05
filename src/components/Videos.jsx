import {Stack, Box} from '@mui/material';
import {ChannelCard, VideoCard} from './';

/* create stack of the videos and then map each of the 
videos with its index with box element that has a video card */
/* we either show profile or video by channel */
/* No props passed to ChannelCard */


const Videos = ({videos, direction}) => {
  console.log(videos);
  if(!videos?.length) return 'Loading...';

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item}/>}
          {item.id.channelId && <ChannelCard channelDetail={item}/>} 
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;