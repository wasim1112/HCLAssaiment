import * as React from 'react';
import { DataGridPro, GridOverlay } from '@mui/x-data-grid-pro';
import {
  useDemoData,
} from '@material-ui/x-grid-data-generator';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';
import { createTheme, darken, lighten } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const MAX_ROW_LENGTH = 500;
// TODO v5: remove
function getThemePaletteMode(palette) {
  return palette.type || palette.mode;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === 'dark'
        ? darken(color, 0.6)
        : lighten(color, 0.6);

    const getHoverBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === 'dark'
        ? darken(color, 0.5)
        : lighten(color, 0.5);

    return {
      root: {
        '& .super-app-theme--Open': {
          backgroundColor: getBackgroundColor(theme.palette.info.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
          },
        },
        '& .super-app-theme--Filled': {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
          },
        },
        '& .super-app-theme--PartiallyFilled': {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.warning.main),
          },
        },
        '& .super-app-theme--Rejected': {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
      },
    };
  },
  { defaultTheme },
);
async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default function InfiniteLoadingGrid({history}) {
  const [loading, setLoading] = React.useState(false);
  const [loadedRows, setLoadedRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const mounted = React.useRef(true);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
    maxColumns: 6,
  });
  const getBooks = async () => {
    const url = `https://613b3c71110e000017a45522.mockapi.io/api/v1/books`
    const response = await  Axios.get(url);
    const map2 = response.data?.map(x => ({ id: x.id, bookName: x.bookName, bookAuther: x.bookAuther, bookDesc: x.bookDesc }));
    return map2
     
  }
  const loadServerRows = async () => {
    setLoading(true);
    const newData = await getBooks();
    // Simulate network throttle
    await sleep(Math.random() * 500 + 100);

    if (mounted.current) {
      setLoading(false);
      setLoadedRows(loadedRows.concat(newData));
    }
  };

  const handleOnRowsScrollEnd = (params) => {
    if (loadedRows.length <= MAX_ROW_LENGTH) {
      loadServerRows(params.viewportPageSize);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 , cellClassName: 'super-app-theme--cell' },
  {
    field: 'bookName',
    headerName: 'Book name',
    width: 150,
    sortable: true,
    cellClassName: 'super-app-theme--cell'
  },
  {
    field: 'bookAuther',
    headerName: 'Book Auther',
    width: 150,
    sortable: true,
    editable: false,
    cellClassName: 'super-app-theme--cell'
  },
  {
    field: 'bookDesc',
    headerName: 'Book Desc',
    description: 'This column has a value getter and is not sortable.',
    cellClassName: 'super-app-theme--cell',
    sortable: true,
    width: 160,
  },
  
  
];
  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const classes = useStyles();
  return (
    <div style={{ height: 400, width: '100%' }} className={classes.root}>
      <DataGridPro
        {...data}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={5}
        autoHeight
        disableColumnResize={false}
        disableMultipleColumnsFiltering={false}
        rowsPerPageOptions={[5]}
        pagination
        rows={loadedRows}
        columns={columns}
        loading={loading}
        pageSize={5}
        onRowsScrollEnd={handleOnRowsScrollEnd}
        onCellClick={(e)=>{history.push('/viewBook', e.id)}}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        getRowClassName={(params) =>
          `super-app-theme--${params.getValue(params.id, 'status')}`
        }
      />
    </div>
  );
}