import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PastriesTable from '../components/Tables/PastriesTable';
export default function Pasteries() {
    // const [isLoading, setLoading] = useState(true);
    // const [pastries, getPasteries] = useState('');
    // const url = 'http://localhost:5001/api/Pasteries';
        
    // useEffect (() => {
    //     getAllPasteries();
    // }, []);

    // const getAllPasteries = () => {
    //     axios.get(url)
    //         .then((response) => 
    //         {
    //             const allPasteries = response.data;
    //             getPasteries(allPasteries);
    //             setLoading(false);
    //         })
    //         .catch(error => console.error(`Error : ${error}`));
    //         console.log('axios request')
    //      }
    
    return (<PastriesTable/>)
}

