import React, { useContext } from "react";
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import Pasteries from './pages/Pastries';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import Users from './pages/Users';
import Form from './components/Form/AddUserForm';
import eForm from './components/Form/EditUserForm';
import PastrySidebar from "./pastry_components/Sidebar/Sidebar";
import Produits from "./pastry_pages/Produits";
import PastryOrders from "./pastry_pages/Orders";
import PastryCategorie from "./pastry_pages/PastryCategorie";
import PastryOffer from "./pastry_pages/PastryOffer";
import OfferFormTest from "./pastry_pages/OfferFormTest";
import Profile from "./pastry_pages/Profile";


function App() {
  if (window.location.pathname == '/' || window.location.pathname == '/home')
    return ( <Home/>);
  return (
    <>
    <Router>
      {(window.location.pathname=='/' || window.location.pathname== '/home')&&<div>
      <Route path = '/' exact component={Home} />
       </div>}
      {(window.location.pathname!=='/' || window.location.pathname!== '/home')&&<div>
      <Switch>
        <Route path = '/' exact component={Home} Redirect to="/"/>
        <Route path = '/admin/notifications'> <Sidebar/> <Notifications/>   </Route>
        <Route path = '/admin/orders'>        <Sidebar/> <Orders/>          </Route>
        <Route path = '/admin/pasteries'>     <Sidebar/> <Pasteries/>       </Route>
        <Route path = '/admin/categories'>    <Sidebar/> <Categories/>      </Route>
        <Route path = '/admin/posts'>         <Sidebar/> <Posts/>           </Route>
        <Route path = '/admin/users'>         <Sidebar/> <Users/>           </Route>
        <Route path = '/admin/form'>          <Sidebar/> <Form/>            </Route>
        <Route path = '/admin/eform'>         <Sidebar/> <eForm/>           </Route>
        <Route path="/pastry/commande"> <PastrySidebar/> <PastryOrders/>    </Route> 
        <Route path="/pastry/produits"> <PastrySidebar/> <Produits/>        </Route> 
        <Route path="/pastry/categorie"><PastrySidebar/> <PastryCategorie/> </Route>
        <Route path="/pastry/offer">    <PastrySidebar/> <PastryOffer/>     </Route>
        <Route path="/pastry/offerForm"><PastrySidebar/> <OfferFormTest/>     </Route>
        <Route path="/profil">          <PastrySidebar/> <Profile/>         </Route>
      </Switch>
      </div>}
    </Router>
    </>
    
  );
}

export default App;
