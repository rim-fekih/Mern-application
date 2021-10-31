import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const prices = [
    {
        _id : 0,
        label : "Tous les offres",
        range : []
    },
    {
           _id : 1,
        label : "De 1DT à 5DT",
        range :  Array.from({length: 5}, (_, index) => index + 1) 
    },
    {
           _id : 2,
        label : "De 6DT à 10DT",
        range :  Array.from({length: 5}, (_, index) => index + 6)
    },
    {
           _id : 3,
        label : "De 11DT à 15DT",
        range :  Array.from({length: 5}, (_, index) => index + 11)
    },
    {
        _id : 4,
        label : "De 16DT à 20DT",
        range :  Array.from({length: 5}, (_, index) => index + 16)

    },
    {
        _id : 5,
        label : "De 21DT à 25DT",
        range :  Array.from({length: 5}, (_, index) => index + 21)
    },
    {
        _id : 6,
        label : "Plus de 25 DT",
        range : Array.from({length: 999}, (_, index) => index + 26)
    }
]
