import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import { darken, lighten } from '@mui/material/styles';
import { currencyFormatter, getCurrencyName } from "../helpers";

const columns = [
  {
    field: 'name',
    headerName: 'Currency name',
    width: 300,
    sortable: true,
    valueGetter: getCurrencyName,
  },
  {
    field: 'currency',
    headerName: 'Currency Code',
    sortable: true
  },
  {
    field: 'rate',
    headerName: 'Current Rate',
    sortable: true,
    valueFormatter: currencyFormatter,
    align: "right"
  },
  {
    field: 'diff',
    headerName: 'Rate Diff',
    sortable: true,
    valueFormatter: currencyFormatter,
    align: "right"
  },
];

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const sx = {
  height: 400,
  width: '100%',
  '& .currency-data-grid--best': {
    bgcolor: (theme) =>
      getBackgroundColor(theme.palette.success.main, theme.palette.mode),
    '&:hover': {
      bgcolor: (theme) =>
        getHoverBackgroundColor(theme.palette.success.main, theme.palette.mode),
    },
  },
  '& .currency-data-grid--worst': {
    bgcolor: (theme) =>
      getBackgroundColor(theme.palette.error.main, theme.palette.mode),
    '&:hover': {
      bgcolor: (theme) =>
        getHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
    },
  },
}

export const CurrencyDataGrid = ({loading, data}) => {
  const [ dataRow, setDataRow ] = useState([])

  useEffect(() => {
    if (!data?.length) return

    const sortedData = data.sort((a, b) => b.diff - a.diff)
    sortedData.slice(0, 5).map(x => x.highlighted = 'best')
    sortedData.slice(-5).map(x => x.highlighted = 'worst')

    setDataRow(sortedData)
  }, [data])

  return loading ?
      (<div>Loading currencies...</div>) :
        dataRow?.length ?
          (
            <Box sx={sx}>
              <DataGrid
                getRowId={(row) => row.currency}
                rows={dataRow}
                columns={columns}
                rowHeight={25}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowClassName={(params) => `currency-data-grid--${params?.row?.highlighted}`}
                experimentalFeatures={{ newEditingApi: true }}
                disableColumnFilter={true}
              />
            </Box>
          ) :
          (<div>No data found for this day</div>)
}