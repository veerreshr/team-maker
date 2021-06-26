import React from 'react'

function AddEvent() {
    return (
        <div class="container mt-3">
        <h1 class="bg-secondary rounded-3 p-2 text-white text-uppercase">
          Add Events
        </h1>
        <form>
          <div>
            <label class="form-label">Event Name</label
            ><input
              class="form-control"
              type="text"
              placeholder="SIH - Smart India Hackathon"
            />
          </div>
          <div>
            <label class="form-label">About</label
            ><textarea
              class="form-control"
              placeholder="Information abut the hackathon"
            ></textarea>
          </div>
          <div>
            <label class="form-label">Start Time</label
            ><input
              class="form-control"
              type="text"
              placeholder="format : dd/mm/yyyy"
            />
          </div>
          <button class="btn btn-primary mt-3 w-100 text-uppercase" type="button">
            Add Event
          </button>
        </form>
      </div>
    )
}

export default AddEvent
