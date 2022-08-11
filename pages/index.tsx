import axios from 'axios';
import NoResult from '../components/NoResult';
import VideoCard from '../components/VideoCard';
import {Video} from '../types';
import { BASE_URL } from '../utils';

interface IProp {
  videos: Video[]
}
const Home = ({videos} : IProp) => {
  console.log(videos);
  return (
    <div className="felx flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video)=>(
          <VideoCard post={video} key={video._id} />
        ))
      ): (
        <NoResult text={"No Video"}/>
      )
      }
    </div>
  )
}
// This gets called on every request
export const getServerSideProps = async ({query: {topic}} : {query: {topic: string}}) => {
  // Fetch data from external API
  let response = null;
  if(topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  

  // Pass data to the page via props
  return {
    props:{
      videos: response.data
    }
  }
}

export default Home
