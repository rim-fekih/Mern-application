import React, { useEffect, useState ,Component } from 'react';
import '../../style/Home.css'
import "antd/lib/avatar/style/index.css";
import "antd/lib/row/style/index.js";
import "antd/lib/col/style/index.js";
import "antd/es/grid/style/css";
import Typography from '@material-ui/core/Typography';
import "antd/lib/card/style/index.css";
import { ThemeProvider } from '@material-ui/styles';
import {Row, Col, Card, Avatar} from 'antd';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
//import { Checkbox } from 'antd';
import * as GiIcons from "react-icons/gi";
import * as CgIcons from "react-icons/cg";
import faker from 'faker';
import ImageCard from './ImageCard';
import defaultImg from '../../icons/defaultOffer.jpg';
import InputBase from '@material-ui/core/InputBase';
import image8 from '../../assets/Images/offer8.jpeg';
import MessageBox from './Message';
import { createTheme } from '@material-ui/core/styles';
import api from '../../api/users';
import ClearIcon from '@material-ui/icons/Clear';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {prices} from '../Filter/PriceFilter';
import Radio from '@material-ui/core/Radio';
import {TextField} from '@material-ui/core';
import MakeOrderForm from '../Form/MakeOrderForm';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import  SearchIcon from '@material-ui/icons/SearchOutlined';

const theme = createTheme({
    palette: {
      primary: {
        //this yellow
        main: '#ffb703',
      },
      secondary: {
        // This is bleu.
        main: '#00509d',
      },
      price : {
          main : '#FF5733'
      }
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    _search : {
        marginTop : '10px',
        marginBottom: '10px',
        marginLeft : '10px',
        fontSize : '20px',
        paddingLeft : '5px',
        width : '90%'
      },
      searchBar : {
        width : '90%',
      },
      searchIcon : {
        marginTop : '30px',
        marginBottom: '10px',
        marginLeft : '30px',
        fontSize : '30px',
        color : 'grey'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha('#00509d', 0.15),
        '&:hover': {
          backgroundColor: alpha('#00509d', 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
  }));


export default function Body() {
    const [offers, setOffers] = useState([]);
    const [offer, setOffer] = React.useState();
    const [pastries, setPastries] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkedPrice, setCheckedPrice] = useState('0');
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmDialog, setConfirmDialog] = React.useState({isOpen:false, title:'', subTitle:''});

const makeOrder = (id) => 
{
    setConfirmDialog({
        ...confirmDialog,
        isOpen:false
      })
}

//rendering the flitered elements by prices ranges with checkbox
const handleTogglePrices = (event) => {
    setCheckedPrice(event.target.value);
}

//rendering the flitered elements by pastry name with checkbox
const handleToggle = (element) => {


    const currentIndex = checked.indexOf(element);
    const newChecked = [...checked];

    if (currentIndex === -1)
    {
        newChecked.push(element)
    }
    else
    {
        newChecked.splice(currentIndex,1)
    }

    setChecked(newChecked)

}


//checking every quarter of a minute the deadline of the offers 
setInterval( ()=>{
if (offers.length>0)
{
    //updating the current instance day time 
    const today = new Date();
    let prefixHour = ""
    let prefixMinute = ""
    if (today.getMinutes() < 10)
        prefixMinute = "0"
    else
        prefixMinute = ""
    if (today.getHours() < 10)
        prefixHour = "0"
    else
        prefixHour = ""

const PostTime =  prefixHour + today.getHours() + " : " + prefixMinute +today.getMinutes();
    offers.map((offer) => {
        if (offer.timeEnds <= PostTime)
            {
                suspendOffer(offer)
            }
        });
}
}, 24000)
const suspendOffer = async (o) => {
    console.log('i got in suspend offer ...')
    if (o)
    {
        o.state = "prêt";
        const response = await api.put(`/offers/${o.ID}`, o);
        console.log(response.data);
    }
    window.location.reload(false);
}

//getting offers from the api
const getOffers = async () => {
    const response = await api.get("/offers/published");
    return response.data;
  };


const getOffer = async(id) => 
{
    const response = await api.get(`/offers/${id}`);
    let offer = response.data;
    if (offer) setOffer(offer); 
}

useEffect(() => {
    const getAllOffers = async () => {
      const allOffers = await getOffers()
      if (allOffers) 
      {
          setOffers(allOffers);
      }
    };
  
    getAllOffers();
  }, [])
  
    const {Meta} = Card;

    // function createData(title,description,price ) {
    //     return { title, description, price};
    //   }
    
    // const toffers = [
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "19.5DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "20DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "30DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "7.5DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "12DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "8.5DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "5.4DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //     createData(faker.name.findName(),faker.name.jobDescriptor(), "0DT"),
    //   ];

    //post image
      const renderImg = (img) => {
        if (img == "default")
        {
          return defaultImg
        }
        else
        {
            const _img = require(`../../icons/${img}`).default;
            return _img
        }
      };

    //pastry icon
      const renderIcon = (icon,username) => {
        if (icon)
        {
          const _icon = require(`../../icons/${icon}`).default;
          return <Avatar src = {_icon} size='large'/>
        }
        else{
            const a = username[0];
            return(
            <Avatar style={{ backgroundColor: '#7265e6' }}  size='large' gap='5' icon={a}/>)
        }
 
      };

//rendering offers posts in the shape of cards.
var id = 0;

const renderCards = offers.filter((offer)=> {
    if (searchTerm == "") {return offers}
      else if (offer.pastryName.toLowerCase().includes(searchTerm.toLowerCase()) 
               || offer.postTitle.toLowerCase().includes(searchTerm.toLowerCase()))
               { 
                 return offer; }})
        .map((offer, index) => {
        if (!pastries.includes(offer.pastryName))
        {
            pastries[id] = offer.pastryName;
            id += 1;
        }
        if (checked.length === 0)
        {
            if (checkedPrice != 0)
                {
                    if(prices[parseInt(checkedPrice)].range.includes(offer.offerPrice))
                    {
                        console.log(prices[parseInt(checkedPrice)].range);
                    return(
                    <Col lg={6} md={8} xs={24}>
                    <Card
                    title= { <Typography style={{ color: '#00509d' }}>{offer.postTitle} </Typography> }
                    bordered={false}
                    style={{backgroundColor: '#EFEEF3' }}
                        hoverable={true}
                        cover = {<img alt="example" src={renderImg(offer.img)} style = {{height:'200px'}}/>}>
                        <Meta
                            avatar={
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            renderIcon(offer.pastryIcon, offer.pastryName)
                            }
                            title = { <Typography>{offer.pastryName}</Typography>}
                            description = { 
                            <Typography>
                                <h5>
                                {offer.postDescription}
                                </h5>
                          
                            {/* {offer.price} / <div style={{backgroundColor: '#FF5733' }}>{offer.price}</div> */}
                            <Typography disabled> <strike style = {{color : '#FF8503'}} >{offer.oldPrice} DT </strike> </Typography><Typography disabled variant='h6' style = {{color : '#034BFF'}}>{offer.offerPrice} DT </Typography>
                            <Typography><MakeOrderForm onClick={() => getOffer(offer.ID)} data = {offer}/> </Typography>
                            </Typography>
                            }
                        />
                    </Card>
                    </Col>
                    )
                    }
                }
            else
            {
            return(
            <Col lg={6} md={8} xs={24}>
            <Card
            title= { <Typography style={{ color: '#00509d' }}>{offer.postTitle} </Typography> }
            bordered={false}
            style={{backgroundColor: '#EFEEF3' }}
                hoverable={true}
                cover = {<img alt="example" src={renderImg(offer.img)} style = {{height:'200px'}}/>}>
                <Meta
                    avatar={
                    // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    renderIcon(offer.pastryIcon, offer.pastryName)
                    }
                    title = { <Typography>{offer.pastryName}</Typography>}
                    description = { 
                    <Typography>
                        <h5>
                        {offer.postDescription}
                        </h5>
                  
                    {/* {offer.price} / <div style={{backgroundColor: '#FF5733' }}>{offer.price}</div> */}
                    <Typography disabled> <strike style = {{color : '#FF8503'}} >{offer.oldPrice} DT </strike> </Typography><Typography disabled variant='h6' style = {{color : '#034BFF'}}>{offer.offerPrice} DT </Typography>
                    <Typography><MakeOrderForm onClick={() => getOffer(offer.ID)} data = {offer}/> </Typography>
                    </Typography>
                    }
                />
            </Card>
            </Col>
            )
            }
            
        }
        else
        {
            if (checked.includes(offer.pastryName))
            {
                if (checkedPrice != 0)
                {
                    if(prices[parseInt(checkedPrice)].range.includes(offer.offerPrice))
                    {
                    return(
                    
                    <Col lg={6} md={8} xs={24}>
                    <Card
                    title= { <Typography style={{ color: '#00509d' }}>{offer.postTitle} </Typography> }
                    bordered={false}
                    style={{backgroundColor: '#EFEEF3' }}
                        hoverable={true}
                        cover = {<img alt="example" src={renderImg(offer.img)} style = {{height:'200px'}}/>}>
                        <Meta
                            avatar={
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            renderIcon(offer.pastryIcon, offer.pastryName)
                            }
                            title = { <Typography>{offer.pastryName}</Typography>}
                            description = { 
                            <Typography>
                                <h5>
                                {offer.postDescription}
                                </h5>
                          
                            {/* {offer.price} / <div style={{backgroundColor: '#FF5733' }}>{offer.price}</div> */}
                            <Typography disabled> <strike style = {{color : '#FF8503'}} >{offer.oldPrice} DT </strike> </Typography><Typography disabled variant='h6' style = {{color : '#034BFF'}}>{offer.offerPrice} DT </Typography>
                            <Typography><MakeOrderForm onClick={() => getOffer(offer.ID)} data = {offer}/> </Typography>
                            </Typography>
                            }
                        />
                        <MakeOrderForm/>
                    </Card>
                    </Col>
                    ) 
                    }
                }
          
            else
            {
                   return <Col lg={6} md={8} xs={24}>
                    <Card
                    title= { <Typography style={{ color: '#00509d' }}>{offer.postTitle} </Typography> }
                    bordered={false}
                    style={{backgroundColor: '#EFEEF3' }}
                        hoverable={true}
                        cover = {<img alt="example" src={renderImg(offer.img)} style = {{height:'200px'}}/>}>
                        <Meta
                            avatar={
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            renderIcon(offer.pastryIcon, offer.pastryName)
                            }
                            title = { <Typography>{offer.pastryName}</Typography>}
                            description = { 
                            <Typography>
                                <h5>
                                {offer.postDescription}
                                </h5>
                          
                            {/* {offer.price} / <div style={{backgroundColor: '#FF5733' }}>{offer.price}</div> */}
                            <Typography disabled> <strike style = {{color : '#FF8503'}} >{offer.oldPrice} DT </strike> </Typography><Typography disabled variant='h6' style = {{color : '#034BFF'}}>{offer.offerPrice} DT </Typography>
                            <Typography><MakeOrderForm onClick={() => getOffer(offer.ID)} data = {offer}/> </Typography>
                            </Typography>
                            }
                        />
                    </Card>
                    </Col>
            }
            }
            
        }
     
    })




const classes = useStyles();

return (
        <div style={{ width : '75%', margin : '3rem auto'}} >
                <div style = {{ textAlign:'center'}}>
                    <h2> <GiIcons.GiCakeSlice color = '#00509d'/>  Plus de Goût pour les Gourmets ! </h2>
                </div>
                <br />
        <div className={classes.root}>
        <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Filtre sur les noms des pâtisserie : </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            {pastries.map((value, index) => {
                return(
                    <React.Fragment key = {index}>

                    <ThemeProvider theme={theme}>
                    <Checkbox
                    color = 'secondary'
                    onChange = {() => handleToggle(value)}
                    checked = {checked.indexOf(value)=== -1 ? false : true}
                    />
                    </ThemeProvider>
                    {value}

                    </React.Fragment>
                )
            })} 
        </Typography>
        </AccordionDetails>
        </Accordion>
            </Col>
            <Col lg={12} xs={24}>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Filtre sur les prix : </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
        <FormLabel component="legend">Prix en DT : </FormLabel>
            {prices.map((value, index) => {
                return(
                    <ThemeProvider theme={theme}>
                    <FormControl component="fieldset">
                    <RadioGroup row onChange={handleTogglePrices} value={checkedPrice} >
                        <FormControlLabel control={<Radio color="secondary" key={value._id} value={`${value._id}`}/>} label={value.label} />
                    </RadioGroup>
                    </FormControl>
                    </ThemeProvider>
                )
            })} 
        </Typography>
        </AccordionDetails>
        </Accordion>
            </Col>
        </Row>
        </div>
        <br />       

            {/* Search */}
                {/* <div>
                     <SearchIcon className= {classes.searchIcon} />
                    <TextField placeholder="vous pouvez faire vos recherche selon les critères suivants: nom du client, nom du pâtisserie et status." label="Recherche ..."  onChange={(event) => setSearchTerm(event.target.value)}  className={classes.search}>
                    <SearchIcon className= {classes.searchIcon} />
                    </TextField> 

                </div> */}
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(event) => setSearchTerm(event.target.value)} 
              placeholder="Recherche..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>
            <br />   

            <div  style= {{display:'flex', position:'fixed',
                            bottom:'0',
                            right:'0',
                            paddingLeft:    '10px',
                            paddingRight:   '10px',
                            paddingBottom:  '10px'}}>
             <ThemeProvider theme={theme}>
             <MessageBox/>
             </ThemeProvider>
            
            </div>
            {offers.length === 0 ?
            <div style ={{display:'flex', height:'300px', justifyContent:'center', alignItems:'center'}}>
                <h2>Chargement du publications ...</h2>
            </div> : 
            <div className="home-font">
                <Row gutter={[16, 16]}>
                {renderCards}
                    {/*<ImageCard/>*/}
                </Row>
            </div>
            }
            <br /><br />
            {/* <div style= {{display:'flex', justifyContent:'center'}}>
            <IconButton>
             Plus
            <CgIcons.CgMore/>
            </IconButton>
            </div> */}

        </div>
    )
}