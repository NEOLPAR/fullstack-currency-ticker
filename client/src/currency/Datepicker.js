import {useCallback, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Stack} from "@mui/material";
import {shortDate} from '../helpers'
import {useFetch} from "./useFetch";

export const CurrencyDatepicker = ({onChange}) => {
  const [value, setValue] = useState();
  const [selectableDateList, setSelectableDateList] = useState([])
  const { data } = useFetch(`/currency/available`);

  const onDateChange = useCallback((date) => {
    onChange(shortDate(date))
    setValue(date)
  }, [onChange])

  useEffect(() => {
    setSelectableDateList(data)
  }, [data])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="Date mobile"
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={() => null}
            onAccept={onDateChange}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableDate={(date) => !selectableDateList?.includes(shortDate(date)) }
            closeOnSelect={true}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}