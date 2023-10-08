/* eslint-disable */
import React, { useEffect,useState } from "react";
import ListCreatedPosts from "../components/ListCreatedPosts";
import maleUser from "../img/profuser.svg";
import {BsPersonPlusFill} from "react-icons/bs";
import {SiGithub, SiIeee,SiGmail} from "react-icons/si";
import { api } from "../api";
import { useCookies } from "react-cookie";
import {Link,useLocation} from "react-router-dom";

export default function Profile({user}){    
    const [account,setAccount] = useState([]);
    const location = useLocation()
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [checkProfile,setCheckProfile] = useState(false);
     
    
    
     
    useEffect(() => {
        let isSubscribed = true;

        const fetchData = async () => {
          const params = {
            username:cookies["UserId"],
            requested_id: cookies["UserId"],
          };
        //   console.log(params);
          if (!params.username) {
            return;
          }
          
          const data = await api.getSelf(params);

          if (isSubscribed) {
            setAccount(data.data);
          }
        };
        fetchData().catch(console.error);
    
        return () => (isSubscribed = false);
      }, [cookies["UserId"]]);

    return(
        <div className="flex mt-32 ml-auto mb-20 mr-auto max-w-[720px] w-[560px] md:w-[500px] lg:w-[640px]">
            <div className = "justify-center">
            <div className="border-0">
            <div style={{ alignItems: "center", display: "flex"}} >
          
              <img className="float-left mr-2 rounded-full border border-gray-100 shadow-sm h-26 w-[25%] " floated="left"  src={account.img_url ? account.img_url : maleUser} alt="user image" />
            
                
                <div className = "ms-3">

                
                <div className = "text-[#018ABD] text-3xl text-bold">{account.name}</div>
                
                <div className = "text-[#004581] mt-2 text-semibold text-base">{account.professional_title}</div>

                <div className = "mt-4 flex flex-row text-base">
                    <div className = " me-4 mr-2">45 Followers</div>
                    <div >43 Following</div>
                </div>
                </div>
            </div>  
            <div className = "mt-4 text-semibold text-xl" >
                {account.about}
            </div>
            </div>

            <div className = "mt-4 text-semibold text-xl" >
                Areas of expertise
            </div>
            <div className = "mt-3 flex align-center">
                <div className = "align-center me-2"><span className = "bg-[#97CBDC] p-2 font-semibold rounded-xl"> Lorem ipsum </span></div>
            </div>
{/* 
            <div className = "mt-5 text-semibold text-xl" >
                Published Papers
            </div> */}

            <div className = "mt-3 align-center space-y-4 divide-[#97CBDC] divide-y-2 ">
                <div className = "my-3" ></div>
                
            </div>

            <div className = "mt-5 text-semibold text-xl" >
                Personal Links
            </div>
            <div className="mt-4">
                <ul>
                {account.show_email  && ( <li className = "m-2 no-underline inline-flex text-black font-semibold"><SiGmail size="1.8rem"  /><span className="ml-2">Email: {account.email}</span></li> )}
                {account.github_username && (<li><a href= 'https://github.com`/${account.github_username}`' className = "m-2 inline-flex no-underline text-black  font-semibold"><SiGithub size="2.0rem"  /> <span className="ml-2">Github profile: {account.github_username}</span> </a></li>)}
                {account.ieee_id && (<li><a href = "" className = "m-2 inline-flex no-underline text-black font-semibold"><SiIeee size="2.8rem"  /><span className="ms-2 mt-2 mr-2"><span className = "ml-2 mr-2">IEE ID: </span>{account.ieee_id}</span></a></li>)}
                </ul>
            </div>

            <ListCreatedPosts profile_id={account.username}/>

            <div className="mt-10 col-md-12 text-center">
            <Link to = '/createpost'> <button className = "bg-[#97CBDC] pt-2 pb-2 lg:pl-4 lg:pr-4 pl-3 pr-3 text-black lg:text-lg rounded-xl lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#97CBDC]">+ New Post</button></Link>
            
            </div>
            
            
            </div>
            
        </div>
    )
}