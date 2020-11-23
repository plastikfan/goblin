import { fireEvent } from "@testing-library/react"
import React from "react"
import { Header } from "./Header"

jest.mock("./CartWidget", () => ({
  CartWidget: () => <div>Cart widget</div>
}))

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = renderWithRouter(() => <Header />)
    expect(container.innerHTML).toMatch("Goblin Store")
    expect(container.innerHTML).toMatch("Cart widget")
  })

  it("navigates to / on header title click", () => {
    // getByText is defined in @testing-library/react, but it's not
    // explicitly imported. I assume its a bit like how renderWithRouter
    // is defined on global, which means it can be used without being imported.
    //
    const { getByText, history } = renderWithRouter(() => <Header />)
    fireEvent.click(getByText("Goblin Store"))

    // We expect that we end up on root url (pg144)
    expect(history.location.pathname).toEqual("/")
  })
})