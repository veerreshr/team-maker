import React from 'react'
import { Link } from "react-router-dom";

function MyTeams() {
    return (
        <div class="container">
        <h2>My Teams</h2>
        <div class="card my-3">
          <div class="card-body">
            <Link to="/teamview"><h4 class="card-title">Title</h4></Link>
            <p class="card-text">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
              mi porta gravida at eget metus.
            </p>
          </div>
        </div>
        <div class="card my-3">
          <div class="card-body">
            <Link><h4 class="card-title">Title</h4></Link>
            <p class="card-text">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
              mi porta gravida at eget metus.
            </p>
          </div>
        </div>
        <div class="card my-3">
          <div class="card-body">
            <Link><h4 class="card-title">Title</h4></Link>
            <p class="card-text">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
              mi porta gravida at eget metus.
            </p>
          </div>
        </div>
        <div class="card my-3">
          <div class="card-body">
            <Link><h4 class="card-title">Title</h4></Link>
            <p class="card-text">
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
              mi porta gravida at eget metus.
            </p>
          </div>
        </div>
      </div>
    )
}

export default MyTeams
