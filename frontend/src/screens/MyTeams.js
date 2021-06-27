import React from 'react'
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { axios } from 'axios';
import { myTeams } from '../actions/teamActions';
import { useDispatch ,useSelector} from "react-redux";

function MyTeams({history}) {
  const dispatch = useDispatch();
  const myteams= useSelector((state) => state.myteams.teams);
  useEffect(()=>{
    dispatch(myTeams());
  },[myteams])
    return (
        <div class="container">
        <h2>My Teams</h2>
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
