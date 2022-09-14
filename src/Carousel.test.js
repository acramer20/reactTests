import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('should render without blowing up', function() {
  render(<Carousel/>);
});

it('should match the snapshot', function() {
  const { asFragment } = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("hides the left and right arrows at appropriate times", function() {
const { getByTestId, queryByAltText } = render(<Carousel/>);
const leftArrow = getByTestId("left-arrow");
const rightArrow = getByTestId("right-arrow");

// left arrow hidden when on first image and right visible
expect(leftArrow).toHaveClass("hidden");
expect(rightArrow).not.toHaveClass("hidden");

// both arrows should be seen on the second image
fireEvent.click(getByTestId("right-arrow"));
expect(leftArrow).not.toHaveClass("hidden");
expect(rightArrow).not.toHaveClass("hidden");

// right arrow should be hidden on third image and left visible
fireEvent.click(getByTestId("right-arrow"));
expect(leftArrow).not.toHaveClass("hidden");
expect(rightArrow).toHaveClass("hidden");


})

it("works when you click on the left arrow", function() {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // move to the photo on the right
  fireEvent.click(rightArrow);

  // move back to the left, expect the first image to show
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});





