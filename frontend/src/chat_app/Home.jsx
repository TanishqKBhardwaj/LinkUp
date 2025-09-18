import { UsersRound } from "lucide-react"
import { getFriends } from "../api/user"
import { useEffect,useState } from "react"
import {Link} from "react-router-dom"
function Home() {
    const [friends, setFriends] = useState([])
    useEffect(() => {
        (async ()=>{
        setFriends( await getFriends())
        console.log(friends.length)})()
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
                                <div className="card sm:w-full md:w-96 bg-base-100 card-md shadow-sm hover:shadow-primary/30 hover:shadow-md">
                                    <div className="card-body">
                                      <div className="flex gap-2 p-2">
                                        <img src={friend.profilePic} className="w-10 h-10 rounded-full object-contain"/>
                                        <div className="flex flex-col gap-1">
                                         <h1 className="text-xl font-semibold text-base-content">{friend.name}</h1>
                                         <h2 className="text-sm font-light">{friend.email}</h2>
                                        </div>
                                        
                                      </div>
                                        <div className="justify-center w-full card-actions">
                                            <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full rounded-3xl hover:bg-primary/30 hover:text-primary">Chat</Link>
                                        </div>
                                    </div>
                                </div>
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




        </div>
    )
}

export default Home
