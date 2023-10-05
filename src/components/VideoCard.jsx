import {Link} from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';
/* Look and feel of how are feed with how multiple videocards in the feed */
/* CardMedia for the great thumbnail */
/* Demos are used for some of the proper data we cant fetch but mask the fact we will use other data */
/* Some titles are long, if title does not exist we can present the demo title */
/* Gray color to channel making it more pronounced with subtitle2 named to make channelID heading smaller */
/* CheckCircle gives an icon */
/* Card seems to expand a bit more than it should so we apply className to it */
/* Space in between VideoCard due to presence of ChannelCard */

const VideoCard = ({video : {id : {videoId}, snippet}}) => (
  <Card sx={{width:{xs:'100%', sm:'358px', md:'320px'}, boxShadow:'none',borderRadius:0}} >
    <Link to={videoId? `/video/${videoId}` : demoVideoUrl}>
      <CardMedia 
        image={snippet?.thumbnails?.high?.url} 
        alt={snippet?.title} 
        sx={{width:{xs:'100%', sm:'358px', md:'320px'},height:180, display:'flex',margin: 'auto'}}
      />
    </Link>
    <CardContent sx={{backgroundColor: '#1e1e1e', height: '106px'}}>
      <Link to={videoId? `/video/${videoId}` : demoVideoUrl}>
        <Typography variant='subtitle1' fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0,120) || demoVideoTitle.slice(0,120)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
        <Typography variant='subtitle2' fontWeight="bold" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircle sx={{fontSize:12, color: 'gray', ml: '5px'}}/>
        </Typography>
      </Link>
    </CardContent>
  </Card>
)

export default VideoCard