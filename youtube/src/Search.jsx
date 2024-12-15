import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Search=()=>{
    const [searchTerm,setSearchTerm]=useState('');
    const [videos,setVideos]=useState([]);
    const API_KEY='Your_Api_key';
    const MAX_Video=10;
    const handleSearch= async()=>{
    try{
        const response=await axios.get('https://www.googleapis.com/youtube/v3/search',{
            params:{
                part:'snippet',
                maxResults:15,
                q:searchTerm,
                key:API_KEY,
                type:'video',


            },});
            console.log(response.data);
        const videoIds=response.data.items.map((item)=>(item.id.videoId)).join(',');
        const statsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
              part: 'statistics',
              id: videoIds,
              key: API_KEY,
            },
          });
          console.log(response.data);

      const videosWithStats = response.data.items.map((video, index) => ({
        ...video,
        views: statsResponse.data.items[index]?.statistics.viewCount || 'N/A',
      }));

      setVideos(videosWithStats);



    }catch(error){
        console.error("error fetching data,error");

    }
};
const navigate=useNavigate();

const handleVideoClick=(video)=>{
    navigate(`/video/${video.id.videoId}`,{state: {video}});
}
const handleKeyPress=(event)=>{
  if(event.key==='Enter'){
    handleSearch();
  }
}
return (
    <div className="p-4">
      <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search for videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="p-2 rounded-l bg-gray-800 text-slate-100 w-96 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:shadow-md "
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-r active:bg-blue-700"
      >
        Search
      </button>
      </div>

      <div className="mt-4 grid md:grid-cols-3 sm:grid-cols-2 gap-6 ml-8">
      {console.log(videos)}
        {videos.map((video) => (
          <div key={video.id.videoId} className="mb-4 cursor-pointer"  onClick={()=>handleVideoClick(video)}>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className="w-72"
            />
            <div className="text-white">
              <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
              <p>{video.snippet.channelTitle}</p>
              <p>{`${video.views} views`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
