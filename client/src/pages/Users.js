import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import UsersTable from '../components/Tables/UsersTable';
/*
export default function Users()
{
    const [isLoading, setLoading] = useState(true);
    const [users, getUsers] = useState('');
    const url = 'http://localhost:5001/api/Users';
        
    useEffect (() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        axios.get(url)
            .then((response) => 
            {
                const allUsers = response.data;
                getUsers(allUsers);
                setLoading(false);
            })
            .catch(error => console.error(`Error : ${error}`));
            console.log('axios request')
         }
    
    return (
        <UsersTable users={users} isLoading={isLoading}/>
    )
        }
*/

export default function Users()
{
    return (<UsersTable/>)
}
