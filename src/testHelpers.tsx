import React from "react"
import { createMemoryHistory, MemoryHistory } from "history"
import {
  render,
  RenderResult
} from "@testing-library/react"
import { Router } from "react-router-dom"

// NB: RenderResult & { history: MemoryHistory }
// This is an example of how to merge property into an object. In this case,
// we're saying add the property 'history' to the 'RenderResult' object returned
// by the function that is bound to RenderWithRouter. However, remember we're
// talking about types here so RenderResult & { history: MemoryHistory } is
// just creating a type declaration, its not manipulating real objects. 
//
type RenderWithRouter = (
  renderComponent: () => React.ReactNode,
  route?: string
) => RenderResult & { history: MemoryHistory }

declare global {
  // this enables us to invoke renderWithRouter function without prefixing with
  // "global"
  //
  namespace globalThis {
    const renderWithRouter: RenderWithRouter
  }

  namespace NodeJS {
    interface Global { // augment global NodeJS namespace with this interface (pg 139)
      renderWithRouter: RenderWithRouter
    }
  }
}


global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory()

  if (route) {
    history.push(route)
  }
  return {
    // spread op here means this:
    //
    // the returned object is being populated with all the properties returned from
    // render spread out to be direct members. (This of course is being followed by
    // 'history' below)
    //
    ...render(
    <Router history={history}>{renderComponent()}</Router>
    ),

    // Initially, I forgot the 'history' property, and the error I got was:

    // Type '(renderComponent: () => ReactNode, route: string | undefined) => { container: HTMLElement; baseElement: HTMLElement; debug: (baseElement?: HTMLElement | DocumentFragment | (HTMLElement | DocumentFragment)[] | undefined, maxLength?: number | undefined, options?: OptionsReceived | undefined) => void; ... 50 more ...; ...' is not assignable to type 'RenderWithRouter'.
    //       Type '{ container: HTMLElement; baseElement: HTMLElement; debug: (baseElement?: HTMLElement | DocumentFragment | (HTMLElement | DocumentFragment)[] | undefined, maxLength?: number | undefined, options?: OptionsReceived | undefined) => void; ... 50 more ...; findAllByTestId: (text: Matcher, options?: MatcherOptions | undef...' is not assignable to type '{ container: HTMLElement; baseElement: HTMLElement; debug: (baseElement?: HTMLElement | DocumentFragment | (HTMLElement | DocumentFragment)[] | undefined, maxLength?: number | undefined, options?: OptionsReceived | undefined) => void; rerender: (ui: ReactElement<...>) => void; unmount: () => boolean; asFragment: () ...'.
    //         Property 'history' is missing in type '{ container: HTMLElement; baseElement: HTMLElement; debug: (baseElement?: HTMLElement | DocumentFragment | (HTMLElement | DocumentFragment)[] | undefined, maxLength?: number | undefined, options?: OptionsReceived | undefined) => void; ... 50 more ...; findAllByTestId: (text: Matcher, options?: MatcherOptions | undef...' but required in type '{ history: MemoryHistory<PoorMansUnknown>; }'.

    // I suspect that this made the returned object not compatible with the type RenderWithRouter
    // since it is defined with the history member. As you can see from the above error, typescript
    // errors can be terse and verbose => this error should effectively be
    //  "returned object is missing the 'history' property"
    // and actually after further inspection, we can see this at the end:
    //  "Property 'history' is missing in type ..."
    // This teaches us, ALWAYS read error messages in full
    //
    history
  }
}
