import React, { useEffect } from "react";
import { getUserDetails } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../components/Loader";
import { Link } from "react-router-dom";

function AboutUser({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.userDetails);
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div class="container mt-4">
          <h1 class="bg-info rounded-3 text-white p-2">{user.name}</h1>
          <div class="px-2">
            <h4 class="mt-4">About</h4>
            <p>{user.about}</p>
            <div>
              <h4 class="my-2">Preferences</h4>
              <div class="px-2">
                <h5>Languages</h5>
                <p>{user && user.languages}&nbsp;</p>
              </div>
              <div class="px-2">
                <h5 class="mt-1">Skills</h5>
                <p>{user && user.skills}&nbsp;</p>
              </div>
            </div>
            <h4>Email :</h4>
            <a href={"mailto:" + user.email}>{user.email}</a>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutUser;
