import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'poem_name', label: 'Poem Name', minWidth: 40 },
  { id: 'poet', label: 'Poet', minWidth: 40 },
  {
    id: 'year',
    label: 'Year',
    minWidth: 30,
    align:'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'line',
    label: 'Line',
    align:'left',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'metaphor_present',
    label: 'Metaphor Present?',    
    align:'left',
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'metaphorical_terms',
    label: 'Metaphorical Terms',
    align:'left',
    minWidth: 75,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'target_domain',
    label: 'Target Domain',
    align:'left',
    minWidth: 40,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'source_domain',
    label: 'Source Domain',
    align:'left',
    minWidth: 40,
    format: (value) => value.toFixed(2),
  },
];

function createData(id, poem_name, poet, year, line, metaphor_present, metaphorical_terms, target_domain, source_domain) {
  return { id, poem_name, poet, year, line, metaphor_present, metaphorical_terms, target_domain, source_domain};
}

function createRows(data){
    const rows = []
    data.forEach(element => {
        rows.push(createData(element._id, element._source['Poem Name'], element._source['Poet'], element._source['Year'], element._source['Line'], element._source['Metaphore present or not'], element._source['Metaphorical Terms'], element._source['Target Domain'], element._source['Source Domain']))
    });
    return rows
}

export default function MetaphorTable({data}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //use Effect to populate rows from data using createRows function
    React.useEffect(() => {
        setRows(createRows(data))
    }
    , [data])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:"3rem"}}>
        <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}
