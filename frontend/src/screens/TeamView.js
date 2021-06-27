import React from 'react'
import { Link } from 'react-router-dom';

function TeamView() {
    return (
        <div class="container">
        <div class="my-2 border-primary bg-primary text-white rounded-3 p-3">
          <h3>&nbsp;&nbsp;Team Name</h3>
        </div>
        <div class="my-3">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                role="tab"
                data-bs-toggle="tab"
                href="#tab-1"
                >Home</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-2"
                >Chat</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-3"
                >White Board</a
              >
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" role="tabpanel" id="tab-1">
              <div className="mt-3">
                <h4 class="bg-info text-white p-2">Team Members</h4>
                <div class="my-3">
                  <div class="card">
                    <div class="card-body">
                    <Link to="/aboutuser/123456789"><h4 class="card-title">Team Member</h4></Link>
                      <h6 class="text-muted card-subtitle">
                        <strong>Status </strong>: Leader
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="my-3">
                  <div class="card">
                    <div class="card-body">
                      <Link to="/aboutuser/123456789"><h4 class="card-title">Team Member</h4></Link>
                      <h6 class="text-muted card-subtitle">
                        <strong>Status </strong>: Member
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="my-3">
                  <div class="card">
                    <div class="card-body">
                    <Link to="/aboutuser/123456789"><h4 class="card-title">Team Member</h4></Link>
                      <h6 class="text-muted card-subtitle">
                        <strong>Status </strong>: Member
                      </h6>
                    </div>
                  </div>
                </div>
                <hr />
                <h4 class="bg-info text-white p-2 rounded-3">
                  Team Joining Requests
                </h4>
                <div class="my-3">
                  <div class="card">
                    <div class="card-body row">
                    <Link className="col-sm-7"><h4 class="card-title">Team Member</h4></Link>
                      <div class="btn-group col-sm-5" role="group">
                        <button class="btn btn-primary" type="button">
                          Accept&nbsp;&nbsp;<i class="fa fa-check"></i></button
                        ><button class="btn btn-primary" type="button">
                          Reject&nbsp;&nbsp;<i class="fas fa-times"></i></button
                        ><button class="btn btn-primary" type="button">
                          Know More&nbsp;&nbsp;<i class="fa fa-info"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="my-3">
                  <div class="card">
                    <div class="card-body row">
                    <Link className="col-sm-7"><h4 class="card-title">Team Member</h4></Link>
                      <div class="btn-group col-sm-5" role="group">
                        <button class="btn btn-primary" type="button">
                          Accept&nbsp;&nbsp;<i class="fa fa-check"></i></button
                        ><button class="btn btn-primary" type="button">
                          Reject&nbsp;&nbsp;<i class="fas fa-times"></i></button
                        ><button class="btn btn-primary" type="button">
                          Know More&nbsp;&nbsp;<i class="fa fa-info"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" role="tabpanel" id="tab-2">
              <p>Content for tab 2.</p>
            </div>
            <div class="tab-pane" role="tabpanel" id="tab-3">
              <p>Content for tab 3.</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TeamView
