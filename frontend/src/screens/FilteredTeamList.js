import React from 'react'
import { Link } from "react-router-dom";

function FilteredTeamList({history}) {
    const openFilterModal=()=>{
        history.push('/joinTeam')
    }
    return (
        <div class="container mt-3">
        <div><h1>Search Teams</h1></div>
        <div>
          <button class="btn btn-primary w-100" type="button" onClick={openFilterModal}>
            Edit Filter&nbsp;&nbsp;<i class="icon ion-edit"></i>&nbsp;
          </button>
        </div>
        <div>
          <div class="card my-3">
            <div class="card-body">
              <h4 class="card-title">Title</h4>
              <h6 class="text-muted card-subtitle mb-2">
                Event Name: Some Hackathon
              </h6>
              <h6 class="text-muted card-subtitle mb-2">Skills : html , css</h6>
              <h6 class="text-muted card-subtitle mb-2">
                Languages: English, Hindi
              </h6>
              <p class="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                non mi porta gravida at eget metus.
              </p>
              <Link class="card-link" href="#"></Link
              ><Link class="card-link" href="#"
                >Send Request&nbsp;<i class="fas fa-arrow-right"></i></Link
              ><Link class="card-link" href="#">Know More</Link>
            </div>
          </div>
          <div class="card my-3">
            <div class="card-body">
              <h4 class="card-title">Title</h4>
              <h6 class="text-muted card-subtitle mb-2">
                Event Name: Some Hackathon
              </h6>
              <h6 class="text-muted card-subtitle mb-2">Skills : html , css</h6>
              <h6 class="text-muted card-subtitle mb-2">
                Languages: English, Hindi
              </h6>
              <p class="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                non mi porta gravida at eget metus.
              </p>
              <Link class="card-link" href="#"></Link
              ><Link class="card-link" href="#"
                >Send Request&nbsp;<i class="fas fa-arrow-right"></i></Link
              ><Link class="card-link" href="#">Know More</Link>
            </div>
          </div>
          <div class="card my-3">
            <div class="card-body">
              <h4 class="card-title">Title</h4>
              <h6 class="text-muted card-subtitle mb-2">
                Event Name: Some Hackathon
              </h6>
              <h6 class="text-muted card-subtitle mb-2">Skills : html , css</h6>
              <h6 class="text-muted card-subtitle mb-2">
                Languages: English, Hindi
              </h6>
              <p class="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                non mi porta gravida at eget metus.
              </p>
              <Link class="card-link" href="#"></Link
              ><Link class="card-link" href="#"
                >Send Request&nbsp;<i class="fas fa-arrow-right"></i></Link
              ><Link class="card-link" href="#">Know More</Link>
            </div>
          </div>
          <div class="card my-3">
            <div class="card-body">
              <h4 class="card-title">Title</h4>
              <h6 class="text-muted card-subtitle mb-2">
                Event Name: Some Hackathon
              </h6>
              <h6 class="text-muted card-subtitle mb-2">Skills : html , css</h6>
              <h6 class="text-muted card-subtitle mb-2">
                Languages: English, Hindi
              </h6>
              <p class="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                non mi porta gravida at eget metus.
              </p>
              <Link class="card-link" href="#"></Link
              ><Link class="card-link" href="#"
                >Send Request&nbsp;<i class="fas fa-arrow-right"></i></Link
              ><Link class="card-link" to="/aboutteam/123456789">Know More</Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FilteredTeamList
