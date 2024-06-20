import { useState } from "react";
import "./gituser.css";
import { useEffect } from "react";
const Gitusers = () => {
    const [user , setUser] = useState("CodeWithHarry");
    const [data , setData] = useState({})
    const [loading , setLoading] = useState(false);

    const fetchgithub = async()=>{
        try{
            setLoading(true)
            const res = await fetch(`https://api.github.com/users/${user}`);
            const result = await res.json()
            if(result){
                setData(result);
                setLoading(false)
            }
            
        }
        catch(e){
                console.error(`got some error`)
                setLoading(false);
        }
        
    }
    
    useEffect(()=>{
       let fetchtimeout =  setTimeout(()=>{
            fetchgithub()
        },1000)
        return ()=> clearTimeout(fetchtimeout);
    },[user])
    
   if(loading){
    return <p className="loading"> Please wait Data Loading...</p>
   }
    // console.log(user);
    console.log(data);
   
  return (
    <div className='git-container'>
      <div className="search-content">
            <input className="search-git" type="text" name="" id="" placeholder='Search github user'onChange={ (e)=> setUser(e.target.value)} />
      </div>
      <div className="profile-content">
              
                <div className="content-wrapper" >
                    <img src={data.avatar_url} alt="profile image"/>
                   <p><a href={data.url}>{data.login}</a></p>
                   <p>User join on - {data.created_at}</p>
                   <p>`Public repo - {data.public_repos}</p>
                   <p>Fellowers - {data.followers} </p>
                   <p>Following - {data.following}</p>
                </div>
              
      </div>
    </div>
  )
}

export default Gitusers
