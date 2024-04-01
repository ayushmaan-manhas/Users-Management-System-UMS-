import {useState ,useEffect} from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';


  function Dashboard() {

    const [user,setUser] = useState([]);

    useEffect(() => {
      axiosClient.get('/user')
      .then(({data}) => {
          setUser(data)

      })
   }, [])

   const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
    }

    // Function to format the date string
    const formatCreatedAt = (createdAt) => {
     const date = new Date(createdAt);
     const options = {
      day: '2-digit',
      month: 'long',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options); // Adjust this format as needed
  };
   
    document.title = "UMS - Dashboard";
  return (
    <div>
    <div>
      <h2>Personal Information</h2>
      <table>
          
            <tbody className='col-9'>
            <tr>
                <td>User Id: </td>    
                <td>{user.id}</td>
              </tr>
              <tr>
                <td>Name: </td>
                <td>{user.name}</td>
              </tr>
              <tr> 
                <td>Email: </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>User Created at: </td>   
                <td>{formatCreatedAt(user.created_at)}</td>
              </tr>  
              <tr>
                <td>Password: </td>    
                <td>{user.password}</td>
              </tr>
              <tr>
                <td>
                  {/* <Link className="btn-edit" to={'/users/' + user.id}>Edit</Link> */}
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(user)}>Delete</button>
                </td>
              </tr> 
            </tbody>
      </table>
    </div>
    </div>
  )
  }

export default Dashboard