import React from 'react'

function Filter({history,isModal}) {
    const filter=()=>{
history.push('/filteredteamlist?filters=something') //need to create a get request
    }
    return (
         <div class="container">
      <div><h2>Filters</h2></div>
      <form>
        <div className="my-2">
          <label class="form-label">Enter Event Name</label
          ><input class="form-control" type="text" />
        </div>
        <div className="my-2">
          <label class="form-label">Language Preferences</label
          ><input class="form-control" type="text" />
        </div>
        <div className="my-2">
          <label class="form-label">Skill Preferences</label
          ><input class="form-control" type="text" />
        </div>
        <div class="mt-4">
          <button class="btn btn-primary w-100" type="button" onClick={filter}>
            Search Teams
          </button>
        </div>
      </form>
    </div>
    )
}

export default Filter
