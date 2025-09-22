import { UsersRound,Search, MoveLeftIcon } from "lucide-react"
import { getFriends,getRecommendations,searchByUserInfo } from "../api/user"
import { useEffect,useState } from "react"
import GetRecommendationCard from "../common_comps/GetRecommendationCard"

import FriendCard from "../common_comps/FriendCard"
import toast from "react-hot-toast"
function Home() {
    const [friends, setFriends] = useState([])
    const [recommendations,setRecommendations]=useState([])
    const [search,setSearch]=useState("")
    const [searchedUser,setSearchedUser]=useState(null)
    const [disableSearch,setDisableSearch]=useState(false)

    const searchUser=async()=>{
        try {
            setDisableSearch(true)
            if(search.trim()==="")
            {
                toast.warning("Search cannot be empty")
                return
            }
            setSearchedUser(await searchByUserInfo(search))
        } catch (error) {
            toast.error("Unable to search at the moment")
            
        }finally{
            setDisableSearch(false)
        }
    }
    useEffect(() => {
        (async ()=>{
        setFriends( await getFriends())
        setRecommendations(await getRecommendations())
        })()
    },[])
    return (
        <div className='mt-10 flex flex-col gap-5  w-full'>
            <div className='w-full flex justify-between flex-wrap items-center p-2'>
                <h3 className='text-base-content font-bold text-3xl'>Your Friends</h3>
                <button className=' btn btn-xs btn-outline text--base-content space-x-1.5 p-2'><UsersRound size={15} /> Friend request</button>
            </div>

            {/*Friends*/}

            {
                friends.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center sm:gap-1 gap-3  p-2">
                        {
                            friends.map((friend) =>
                                <FriendCard person={friend} key={friend._id}/>
                            )
                        }


                    </div>
                ) : (

                    <div className="flex flex-col items-center gap-3 ">
                        <h1 className="font-semibold text-xl text-base-content">You have currently no friends</h1>
                        <p className="font-light">Connect with friends to have fun</p>
                    </div>

            )
            }

            {/*Recommendations*/}

                <div className="flex flex-wrap justify-between w-full p-2 ">
                 <h3 className='text-base-content p-2  font-bold text-3xl'>Your Recommended Friends</h3>
                 <div className="flex space-x-2 items-center">
                    <button className="cursor-pointer hover:shadow-md hover:shadow-primary/30 p-2 rounded-xl" onClick={()=>searchUser()} disabled={disableSearch}>
                       <Search />
                    </button>
                   
                 <input placeholder="Search by name/email" value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full p-2 rounded-xl  focus:ring-2 focus:ring-primary  hover:shadow-primary/30 hover:shadow-md"></input>
                 </div>
                 
                </div>
                

                { 

                 searchedUser?(<div className="flex flex-col gap-3 items-start p-2">
                    <button className="btn  hover:shadow-md hover:shadow-primary/30" onClick={()=>setSearchedUser(null)}><MoveLeftIcon/>Back to Recommendations</button>
                    
                       <GetRecommendationCard person={searchedUser} />



                 </div>):(
                    recommendations?.length>0?(
                         <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center sm:gap-1 gap-3  p-2">
                        {
                            recommendations.map((recommendation) =>
                                <GetRecommendationCard person={recommendation} key={recommendation._id}/>
                            )
                        }


                    </div>

                    ):(
                        <div className="flex flex-col items-center gap-3 ">
                        <h1 className="font-semibold text-xl text-base-content">You have currently no recommendation of friends</h1>
                        <p className="font-light">Build your network to connect with others</p>
                    </div>
                    )

                )
                }
    






        </div>
    )
}

export default Home
