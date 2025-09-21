import {Link} from "react-router-dom"

function FriendCard({person}) {
  return (
    <div className="card sm:w-full md:w-96 bg-base-100 card-md shadow-sm hover:shadow-primary/30 hover:shadow-md">
                                    <div className="card-body">
                                      <div className="flex gap-2 p-2">
                                        <img src={person.profilePic} className="w-10 h-10 rounded-full object-contain"/>
                                        <div className="flex flex-col gap-1">
                                         <h1 className="text-xl font-semibold text-base-content">{person.name}</h1>
                                         <h2 className="text-sm font-light">{person.email}</h2>
                                        </div>
                                        
                                      </div>
                                        <div className="justify-center w-full card-actions">
                                            <Link to={`/chat/${person._id}`} className="btn btn-outline w-full rounded-3xl hover:bg-primary/30 hover:text-primary">Chat</Link>
                                        </div>
                                    </div>
                                </div>
  )
}

export default FriendCard
