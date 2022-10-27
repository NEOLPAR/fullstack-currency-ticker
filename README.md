# Currency Ticker

Your task is to create a web app to display and sort data showing currency rates for a selected date. The data is provided for you in a static [currencies.json](server/data/currencies.json) file, and we would like you to create a server to serve this data as well as a front-end web app to interact with it.

## Requirements

- The page should display each currency and exchange rate for the selected day, as well as the percentage change of the exchange rate relative to the previous day.
- The user should be able to sort by each of these.
- The currencies with the largest positive and negative rate changes since the previous day should be visually distinguished.

## Setting up

We've provided a skeleton structure which uses [Express](https://expressjs.com) and [React](https://reactjs.org/) (via [create-react-app](https://github.com/facebook/create-react-app)) to get you started. Please feel free to modify, adapt or discard this skeleton entirely.

The solution should be written in modern Javascript (ES6 onwards) or TypeScript - use whatever you're most comfortable with. Feel free to use any third-party libraries or frameworks you think are appropriate (we use [Material UI](https://mui.com/getting-started/installation/) ourselves).

## What we're looking for

To give a bit more insight, what we're looking for with this task is:

- Has the task brief been fulfilled? Are all the requirements that were asked for included in the solution?

- A well-structured codebase that's easy to read. Could someone else pick up and work with it? We value readability and maintainability over clever or terse yet obtuse solutions.

- Evidence that you're comfortable working with the technology you've used. If you've not used the same libraries/frameworks as us that's not a problem - we're looking for aptitude.

- Tests which prove that your solution works and meets the requirements above. We're not looking for 100% test coverage; tests that prove the app works as intended from a user's perspective are fine.

# Developing

## Installing & running

The provided skeleton is set up with separate `server` and `client` directories, each with `start` and `test` scripts.

## Where things are

By default, the client is ran on http://localhost:3000, the server is ran on http://localhost:3001.

We've set up a `proxy` command in the client so any fetch calls will be routed to the server. (See [create-react-app's documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/))
