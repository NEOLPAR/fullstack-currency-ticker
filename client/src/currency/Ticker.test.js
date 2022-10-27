import {render, screen} from "@testing-library/react";
import {CurrencyTicker} from "./Ticker";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {shortDate} from "../helpers";

const CURRENCY_API = `http://localhost:3001/api/currency/${shortDate(Date.now())}`
const CURRENCY_RESPONSE_SUCCESS = [
  { "currency": "AED", "rate": 3.672896, "diff": 0 },
  { "currency": "AFN", "rate": 66.9585,  "diff": 0 },
  { "currency": "ALL", "rate": 128.298385, "diff": 0 }
]
const AVAILABLE_CURRENCY_API = 'http://localhost:3001/api/currency/available'
const AVAILABLE_CURRENCY_RESPONSE_SUCCESS = ['2017-11-01', '2017-11-02']

const server = setupServer(
  rest.get(`${CURRENCY_API}`, (req, res, ctx) => {
    return res(ctx.json(CURRENCY_RESPONSE_SUCCESS))
  }),
  rest.get(`${AVAILABLE_CURRENCY_API}`, (req, res, ctx) => {
    return res(ctx.json(AVAILABLE_CURRENCY_RESPONSE_SUCCESS))
  }),
)

describe('Currency Ticker module tests', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test("renders currency ticker", async () => {
    render(<CurrencyTicker />);
  });

  test("datepicker integrated", async () => {
    render(<CurrencyTicker />);

    const datepickerLabel = screen.getByLabelText(/Date mobile/i);
    expect(datepickerLabel).toBeInTheDocument();

    const datepickerElement = screen.getByRole('textbox');
    expect(datepickerElement).toBeInTheDocument();
  });

  test("currency table integrated", async () => {
    render(<CurrencyTicker />);

    const loading = await screen.findByText(/Loading currencies.../);
    expect(loading).toBeInTheDocument();

    let element = await screen.findAllByText(/AED|AFN|ALL/);
    expect(element).toHaveLength(3);
  });

})
