import React,{ useState ,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

function HOC({comp}) {
    const history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [loggedIn,setLoggedIn]=useState(false)
    useEffect(()=>{
        if(userInfo)setLoggedIn(true)
        else useHistory.push('/login')
    },[userLogin,history,userInfo]);
    return loggedIn ? (<>{comp}</>):<Redirect to={{pathname:'/'}} />
        
}

export default HOC
