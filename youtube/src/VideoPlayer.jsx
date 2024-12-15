import React,{useEffect,useState,useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const VideoPlayer=()=>{
    const {state}=useLocation();
    const {video}=state;
    const [userDetails,setUserDetails]=useState({});
    const [comments,setComments]=useState([]);
    const API_KEY='AIzaSyC3YuKqIY0TOp64j9XReNTY_8-3GYLYhJ4';
    const fetchDetail=useCallback(async()=>{
        try{
        const response=await axios.get('https://www.googleapis.com/youtube/v3/videos',{
            params:{
                part:'snippet,statistics',
                id:video.id.videoId,
                key:API_KEY,
            },
        }
    );
    
        setUserDetails(response.data.items[0]);

    }
    catch(error){
        console.error("error fetching data",error);
    }
},[video.id.videoId,API_KEY]);
const fetchComments =useCallback(async () => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
            params: {
                part: 'snippet',
                videoId: video.id.videoId,
                key: API_KEY,
                maxResults: 10,
            },
        });
        setComments(response.data.items);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
},[video.id.videoId]);
    useEffect(()=>{
        fetchDetail();
        fetchComments();

    },[fetchDetail,fetchComments]);

    return (
        <div className="p-4">
            <iframe
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder={0}
                allowFullScreen
                title={video.snippet.title}
            ></iframe>
            <h2 className="text-white">{userDetails.snippet?.title}</h2>
            <p className="text-gray-400">{userDetails.snippet?.description}</p>
            <p className="text-gray-400">{userDetails.statistics?.viewCount} views</p>
            <h3 className="text-white">Comments</h3>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id} className="mb-4">
                        <p className="text-gray-300"><strong>{comment.snippet.topLevelComment.snippet.authorDisplayName}:</strong></p>
                        <p className="text-gray-400">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default VideoPlayer;