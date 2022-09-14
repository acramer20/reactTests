import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it('should render without blowing up', function() {
    render(<Card/>);
});

it('matches the snapshot', function() {
   const { asFragment } = render(<Card/>);
   expect(asFragment()).toMatchSnapshot();
});





