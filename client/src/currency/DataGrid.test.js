import {render, screen} from "@testing-library/react";
import {CurrencyDataGrid} from "./DataGrid";

const currencyData = [
  { "currency": "AED", "rate": 3.672896, "diff": 0 },
  { "currency": "AFN", "rate": 66.9585,  "diff": 0 },
  { "currency": "ALL", "rate": 128.298385, "diff": 0 }
]

describe('DataGrid tests', () => {
  test("loading", async () => {
    render(<CurrencyDataGrid loading={true} />);

    const loading = await screen.findByText(/Loading currencies.../);
    expect(loading).toBeInTheDocument();
  });

  test("loaded no data", async () => {
    render(<CurrencyDataGrid loading={false} data={[]} />);

    const loading = await screen.findByText(/No data found for this day/);
    expect(loading).toBeInTheDocument();
  });

  test("loaded with data", async () => {
    render(<CurrencyDataGrid loading={false} data={currencyData} />);

    let element = await screen.findAllByText(/AED|AFN|ALL/);
    expect(element).toHaveLength(3);
  });

})