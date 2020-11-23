import React from "react"
import { CartWidget } from './CartWidget'
import { fireEvent } from "@testing-library/react"

describe("CartWidget", () => {
  // pg145
  //
  it.todo("shows the amount of products in the cart")

  // pg146
  it("navigates to cart summary page on click", () => {

    // getByRole is a selector (what-ever that means, css selector?
    // see https://www.w3schools.com/cssref/css_selectors.asp)
    // aria role: https://html.spec.whatwg.org/multipage/dom.html#wai-aria
    // aria "link" role: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
    //
    const { getByRole, history } = renderWithRouter(() => (
      <CartWidget />
    ))

    // so does this mean that the Cart Widget may contain mutipl elements
    // but there is only a single item which contains the "link" role?
    // Isnt this a very weak way to select an item; the "link" role is quite
    // generic and common, so we could be selecting anything here.
    //
    fireEvent.click(getByRole("link"))
    expect(history.location.pathname).toEqual("/cart")
  })
})
