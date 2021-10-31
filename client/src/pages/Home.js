import React , { useEffect } from 'react';
import '../style/Home.css'
import Header from '../components/Header/header';
import HomeBody from '../components/Display/HomeBody';
import {Card, Col, Row} from 'antd';
import { alpha, makeStyles } from '@material-ui/core/styles';
import * as GiIcons from "react-icons/gi";
import faker from 'faker';
const {Meta} = Card;
//import ImageCard from './ImageCard';
//import image9 from '../../assets/Images/offer9.jpg';

function Home() {

    return (

        <div className="home-font">
             <Header/>
             <HomeBody/>
        </div>
    )
}

export default Home
