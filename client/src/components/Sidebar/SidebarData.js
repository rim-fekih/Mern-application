import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SideBarData = [
    // {
    //     title : 'Home',
    //     path : '/',
    //     icon : <AiIcons.AiFillHome/>,
    //     cName : 'nav-text'
    // },
    {
        title : 'Utilisateurs',
        path : '/admin/users',
        icon : <IoIcons.IoIosContacts/>,
        cName : 'nav-text'
    },
    {
        title : 'Pâtisserie',
        path : '/admin/pasteries',
        icon : <IoIcons.IoIosContact/>,
        cName : 'nav-text'
    },
    {
        title : 'Categorie',
        path : '/admin/categories',
        icon : <IoIcons.IoIosClipboard/>,
        cName : 'nav-text'
    },
    {
        title : 'Commandes',
        path : '/admin/orders',
        icon : <IoIcons.IoMdBasket/>,
        cName : 'nav-text'
    },
    {
        title : 'Publications',
        path : '/admin/posts',
        icon : <IoIcons.IoMdImages/>,
        cName : 'nav-text'
    },
    {
        title : 'Messages',
        path : '/admin/notifications',
        icon : <IoIcons.IoMdClipboard/>,
        cName : 'nav-text'
    },
    /*
    {
        title : 'Tables',
        path : '/tables',
        icon : <IoIcons.IoIosSquare/>,
        cName : 'nav-text'
    },
    {
        title : 'CheckBoxTable',
        path : '/checkBoxTables',
        icon : <IoIcons.IoIosSquare/>,
        cName : 'nav-text'
    },

    {
        title : 'Form',
        path : '/form',
        icon : <IoIcons.IoIosFiling/>,
        cName : 'nav-text'
    }
    */
    
]