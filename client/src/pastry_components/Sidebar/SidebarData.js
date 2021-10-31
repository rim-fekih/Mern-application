import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SideBarData = [
  {
    title: "Profil",
    path: "/profil",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Produits",
    path: "/pastry/produits",
    icon: <IoIcons.IoIosContacts />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/pastry/categorie",
    icon: <IoIcons.IoIosContact />,
    cName: "nav-text",
  },

  {
    title: "Offer",
    path: "/pastry/offer",
    icon: <IoIcons.IoMdImages />,
    cName: "nav-text",
  },
  {
    title: "Commandes",
    path: "/pastry/commande",
    icon: <IoIcons.IoMdClipboard />,
    cName: "nav-text",
  },

  /*  {
    title: "Notifications",
    path: "/notifications",
    icon: <IoIcons.IoMdClipboard />,
    cName: "nav-text",
  },
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
];
