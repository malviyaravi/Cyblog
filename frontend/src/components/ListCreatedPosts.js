import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import { api } from "../api";

export default function ListCreatedPosts({profile_id} ){
    const [blogs,setBlogs] = useState([]);
    // console.log(profile_id);
    
    useEffect(() => {
     let isSubscribed = true;
     const fetchData = async () => {
        if(!profile_id) return ;
        const params={
            username:profile_id
        }
       const data = await api.getUserBlog(params);
    //    console.log(data.data);
       if (isSubscribed) {
         setBlogs(data.data);
       }
    //    console.log(blogs);
     };
     
     fetchData().catch(console.error);
     
 
     return () => (isSubscribed = false);
   }, [profile_id]);
   console.log(blogs);

  
    return(
        <div className = "mt-5">
            <div className = "border-0">
                <div  className = "mt-4 text-semibold text-xl" >
                    Created Posts
                </div>
              
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-2 content-center md:grid-cols-3 lg:grid-cols-3 gap-4">
                {blogs.length>0 && blogs.map((blog,key_indx) => (
              
              <div  key={key_indx} className='mt-2 content-center text-center h-32' >

                <div className = "min-h-full bg-[#DDE8F0] p-2 flex flex-col justify-center items-center"> 
                <Link to = "/viewblog" state= {{blog: blog }}
                    
                    className ="no-underline text-xl text-[#004581] text-bold">
                       {blog.title}</Link>

                        <div style = {{color: "#004581",fontWeight: "500"}}>
                            {blog.upvotes} upvotes
                        </div>

                </div>
            </div>
            ))}
        </div>
            </div>
        </div>
    )
}

