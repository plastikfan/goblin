import React from "react"
import { App } from "./App"
import { createMemoryHistory } from 'history'
import { render } from "@testing-library/react"
import { Router } from "react-router-dom"

jest.mock("./Home", () => ({ Home: () => <div>Home</div> }))
jest.mock("./Cart", () => ({ Cart: () => <div>Cart</div> }))
jest.mock("./Checkout", () => ({ Checkout: () => <div>Checkout</div> }))
jest.mock("./OrderSummary", () => ({ OrderSummary: () => <div>Order summary</div> }))

describe("App", () => {
  it("renders successfully", () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch('Goblin Store')
  })

  it("renders Home component on root route", () => {
    const history = createMemoryHistory()
    history.push("/")
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch("Home")
  })
})

describe("routing", () => {
it("renders home page on '/'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/"
    )
    expect(container.innerHTML).toMatch("Home")
  })

 it("renders checkout page on '/checkout'", () => {
    // Error: Element type is invalid: expected a string (for built-in components) or a
    // class/function (for composite components) but got: undefined. You likely forgot
    // to export your component from the file it's defined in, or you might have mixed up
    // default and named imports.
    //
    // this was because of a cut & paste error on the mocks at the top of this file:
    // jest.mock("./Checkout", () => ({ Cart: () => <div>Checkout</div> }))
    //                                  ^^^^^
    //                                  forgot to update this to Checkout
    //
    // Check the render method of`App`.
    //
    const { container } = renderWithRouter(
      () => <App />,
      "/checkout"
    )
    expect(container.innerHTML).toMatch("Checkout")
  })

  it("renders checkout page on '/cart'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/cart"
    )
    expect(container.innerHTML).toMatch("Cart")
  })

it("renders order summary page on '/order'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/order"
    )
    expect(container.innerHTML).toMatch("Order summary")
  })

  it("renders checkout page on './cart'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/cart"
    )
    expect(container.innerHTML).toMatch("Cart")
  })
})
