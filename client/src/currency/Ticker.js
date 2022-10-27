import { CurrencyDatepicker } from "./Datepicker";
import { useFetch } from "./useFetch";
import {useState} from "react";
import {shortDate} from "../helpers";
import {CurrencyDataGrid} from "./DataGrid";

export const CurrencyTicker = () => {
  const [ selectedDate, setSelectedDate ] = useState(shortDate())
  const { loading, data, error } = useFetch(`/currency/${selectedDate}`);

  if ( error )
    return <p>Unfortunately, there was an error loading the currencies: {JSON.stringify(error, null, 2)}</p>
  else
    return (
      <div>
        <p>Hello world</p>
        <CurrencyDatepicker
          onChange={setSelectedDate} />
        <CurrencyDataGrid loading={loading} data={data} />
      </div>
    );

}
