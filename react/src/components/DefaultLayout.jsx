import { Link,Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout(){ 
    const {user,token, setUser,setToken, notification} = useStateContext();

     if (!token) {
            return <Navigate to="/login"/>
        }

     const onLogout   = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
         .then(() => { 
            setUser({})
            setToken(null)
         })
     }

     useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)

        })
     }, [])

    return (
        <>
        <div id="defaultLayout">
            <aside>
                <Link  to="/dashboard" >Dashboard</Link>
                <Link  to="/users" >Users List</Link>
            </aside>
            <div className="content">
                <header>
                    <div style={{ display:"flex", alignItems:"center" }}>
                        <img src="/favicon.ico" alt="UMS Logo" style={{ marginRight:'10px' }} />&nbsp;&nbsp;
                        <strong>User Management System (UMS)</strong>
                    </div>
                    <div style={{ display:"flex", alignItems:"center" , marginLeft: '10px' }}>
                        <strong style={{ color:"forestgreen" }}>{user.name}</strong> &nbsp; &nbsp;
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main><Outlet /></main>
                {notification &&
                  <div className="notification">
                    {notification}
                  </div>
                }
            </div>
        </div> 
         
        </>
    )
  
}
