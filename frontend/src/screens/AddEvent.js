import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEventAction } from "./../actions/eventActions";

function AddEvent() {
  const dispatch = useDispatch();
  // const addEventHandler=()=>{
  //   dispatch(addEventAction(eventName, eventDesc,startDate))
  // }

  //   const [eventName,setEventName]=useState("")
  //   const [eventDesc,setEventDesc]=useState("")
  //   const [startDate,setStartDate]=useState("")
  //     return (
  //         <div class="container mt-3">
  //         <h1 class="bg-secondary rounded-3 p-2 text-white text-uppercase">
  //           Add Events
  //         </h1>
  //         <form>
  //           <div>
  //             <label class="form-label">Event Name</label
  //             ><input
  //               class="form-control"
  //               type="text"
  //               placeholder="SIH - Smart India Hackathon"
  //               value={eventName}
  //               onChange={(e) => setEventName(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <label class="form-label">About</label
  //             ><textarea
  //               class="form-control"
  //               placeholder="Information abut the hackathon"
  //               value={eventDesc}
  //               onChange={(e) => setEventDesc(e.target.value)}
  //             ></textarea>
  //           </div>
  //           <div>
  //             <label class="form-label">Start Time</label
  //             ><input
  //               class="form-control"
  //               type="text"
  //               placeholder="format : dd/mm/yyyy"
  //               value={startDate}
  //               onChange={(e) => setStartDate(e.target.value)}
  //             />
  //           </div>
  //           <button class="btn btn-primary mt-3 w-100 text-uppercase" type="button" onClick={addEventHandler}>
  //             Add Event
  //           </button>
  //         </form>
  //       </div>
  //     )
}

export default AddEvent;
