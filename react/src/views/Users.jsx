import React from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useState , useEffect} from 'react'
import { useStateContext } from '../components/contexts/ContextProvider';

export default function Users() {
  
  const [users,setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [firstPageUrl, setFirstPageUrl] = useState(null);
  const [lastPageUrl, setLastPageUrl] = useState(null);

  useEffect(() =>{
    document.title = "UMS - Users List";
    getUsers();
  },[])
  
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

  const getUsers = (url) =>{
    setLoading(true)
    axiosClient.get(url||'/users')     //
    .then(({data}) =>{
      setLoading(false);
      setUsers(data.data);
      setNextPageUrl(data.links.next); //
      setPrevPageUrl(data.links.prev);
      setFirstPageUrl(data.links.first);
      setLastPageUrl(data.links.last);
      
      // console.log(data); // Log the data object received from the backend
      //setTotalPages(data.last_page); // Set total pages for pagination
      })
    .catch(() =>{
      setLoading(false)
      console.error('Error fetching users:', error);   //
      setNotification('Error fetching users');       //

    })
  }

  const fetchNextPage = () => {
    getUsers(nextPageUrl);
  };

  const fetchPrevPage = () => {
    getUsers(prevPageUrl);
  };

  const fetchFirstPage = () => {
    getUsers(firstPageUrl);
  };

  const fetchLastPage = () => {
    getUsers(lastPageUrl);
  };
  
  return (
     <div>
         <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Authorised User's List</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))} 
            </tbody>
          }
        </table>
        {/* Pagination controls */}
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {[...Array(totalPages).keys()].map(pageNumber => (
            <button key={pageNumber} onClick={() => handlePageChange(pageNumber + 1)}>
              {pageNumber + 1}
            </button>
          ))}
        </div> */}
        <div className='pagination'> 
        <button className="pagination-button" onClick={fetchFirstPage} disabled={!firstPageUrl}>First</button>
        <button className="pagination-button" onClick={fetchPrevPage} disabled={!prevPageUrl}>Previous</button>
        <button className="pagination-button" onClick={fetchNextPage} disabled={!nextPageUrl}>Next</button>
        <button className="pagination-button" onClick={fetchLastPage} disabled={!lastPageUrl}>Last</button>
        </div>
      </div>
     </div>
  )
}
