import {render, screen} from "@testing-library/react";
import {CurrencyDatepicker} from "./Datepicker";
import {setupServer} from "msw/node";
import {rest} from "msw";

const AVAILABLE_CURRENCY_API = 'http://localhost:3001/api/currency/available'
const RESPONSE_SUCCESS = ['2017-11-01', '2017-11-02']

const server = setupServer(
  rest.get(`${AVAILABLE_CURRENCY_API}`, (req, res, ctx) => {
    return res(ctx.json(RESPONSE_SUCCESS))
  }),
)

describe('Testing available currency API', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('available currency success with data', async () => {
    render(<CurrencyDatepicker />);
  })
})