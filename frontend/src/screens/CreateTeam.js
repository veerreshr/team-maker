import React,{useState} from 'react'
import { createTeamAction } from '../actions/teamActions';
import { useDispatch } from 'react-redux';

function CreateTeam({history}) {
  const dispatch = useDispatch();
  const [eventName,setEventName]=useState("")
  const [teamName,setTeamName]=useState("")
  const [teamDesc,setTeamDesc]=useState("")
  const [languages,setLanguages]=useState("")
  const [skills,setSkills]=useState("")
    const createTeamHandler=(e)=>{
      e.preventDefault();
      dispatch(createTeamAction(eventName, teamName,teamDesc,languages,skills,history));
      // history.push('/teamview/124567899')
      history.push('/myteams')
    }
    return (
        <div className="container mt-5">
        <form>
          <div className="my-1">
            <label className="form-label">Enter Event Name</label
            ><input className="form-control p-3" type="text"  placeholder="enter event name"  
            value={eventName}
            onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div className="my-1">
            <label className="form-label">Team Name</label
            ><input className="form-control p-3" type="text" value={teamName}
            onChange={(e) => setTeamName(e.target.value)} />
          </div>
          <div className="my-1">
            <label className="form-label">Team Description</label
            ><input className="form-control p-3" type="text"value={teamDesc}
            onChange={(e) => setTeamDesc(e.target.value)} />
          </div>
          <div className="my-1">
            <label className="form-label"
              >Language Prefernces -
              <em>Enter space separated languages</em></label
            ><input className="form-control p-3" type="text" value={languages}
            onChange={(e) => setLanguages(e.target.value)} />
          </div>
          <div className="my-1">
            <label className="form-label"
              >Skill Preferences - Enter space separated skills</label
            ><input className="form-control p-3" type="text" value={skills}
            onChange={(e) => setSkills(e.target.value)} />
          </div>
          <div className="my-1">
            <button className="btn btn-primary mt-4 w-100" type="button" onClick={createTeamHandler}>
              Create Team
            </button>
          </div>
        </form>
      </div>
    )
}

export default CreateTeam
