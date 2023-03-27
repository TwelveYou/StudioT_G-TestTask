import React from "react";
import CharacterCard from "../components/CharacterCard";
import FullCard from "../components/FullCard";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";

let chars = [
    {
        name: "Luke Skywalker", 
        height: "172", 
        mass: "77", 
        hair_color: "blond", 
        skin_color: "fair", 
        eye_color: "blue", 
        birth_year: "19BBY", 
        gender: "male", 
        created: "2014-12-09T13:50:51.644000Z", 
        edited: "2014-12-20T21:17:56.891000Z", 
        url: "https://swapi.dev/api/people/1/"
    },
    {
        name: "C-3PO", 
        height: "167", 
        mass: "75", 
        hair_color: "n/a", 
        skin_color: "gold", 
        eye_color: "yellow", 
        birth_year: "112BBY", 
        gender: "n/a", 
        url: "https://swapi.dev/api/people/2/"
    }
];

const startingState = {
    characters : chars,
    chosenCharacter: null,
};

function reducer(state = startingState, action){
    switch(action.type){
        case "SET_CHOSEN_CHARACTER": 
            return {...state, chosenCharacter: action.payloader};
        default:
            return state;
    }
}

function renderWithRedux (
    component,
    { initialState, store = createStore(reducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{component} </Provider>)
    };
};


describe("CharacterCard", () => {
    it("render empty CharacterCard component without promises", ()=>{
        renderWithRedux(<CharacterCard/>);
        screen.queryAllByText(/.+/i).map((elem)=>(
            expect(elem).not.toBeInTheDocument()
        ));
    });
    it("existence character's name in CharacterCard", ()=>{
        renderWithRedux(<CharacterCard card={chars[0]} id='0'/>);
        expect(screen.getByText(chars[0].name)).toBeInTheDocument();
    })
    it("right color of plate gender", ()=>{
        renderWithRedux( <CharacterCard card={chars[0]} id='0'/>);
        expect(
            (screen.queryByText(chars[0].birth_year) === null ) ||  // eslint-disable-line testing-library/prefer-presence-queries
            (screen.getByText(chars[0].birth_year).style.backgroundColor === 'rgb(7, 215, 242)')
        ).toBeTruthy();  
        expect(
            (screen.queryByText('male') === null ) ||  // eslint-disable-line testing-library/prefer-presence-queries
            (screen.getByText('male').style.backgroundColor === 'rgb(115, 214, 119)')
        ).toBeTruthy();        
        expect(
            (screen.queryByText('female') === null ) ||  // eslint-disable-line testing-library/prefer-presence-queries
            (screen.getByText('female').style.backgroundColor === 'rgb(201, 86, 255)')
        ).toBeTruthy();
        expect(
            (screen.queryByText('hermaphrodite') === null ) ||  // eslint-disable-line testing-library/prefer-presence-queries
            (screen.getByText('hermaphrodite').style.backgroundColor === 'rgb(245, 219, 19)')
        ).toBeTruthy();
    })
    it("absent empty parameters in CharacterCard", ()=>{
        renderWithRedux(<CharacterCard card={chars[0]} id='0'/>);
        expect(screen.queryByText('n/a')).not.toBeInTheDocument();
        expect(screen.queryByText('none')).not.toBeInTheDocument();
        expect(screen.queryByText('unknown')).not.toBeInTheDocument();
    })
    it("click on card should open full card", async ()=>{
        renderWithRedux(
            <div>
                <FullCard/>
                <CharacterCard card={chars[0]} id='0'/>
            </div>
        );

        expect(screen.queryByText(/color eye:/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/hair:/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/skin:/i)).not.toBeInTheDocument();
        expect(screen.queryByAltText(/icon gender/i)).not.toBeInTheDocument();

        expect(screen.getByText(chars[0].name)).toBeInTheDocument();
        await userEvent.click(screen.getByText(chars[0].name));

        expect(screen.getByText(/color eye:/i)).toBeInTheDocument();
        expect(screen.getByText(/hair:/i)).toBeInTheDocument();
        expect(screen.getByText(/skin:/i)).toBeInTheDocument();
        expect(screen.getByAltText(/icon gender/i)).toBeInTheDocument();
    })
});