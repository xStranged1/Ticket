import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { rows } from '../const/dummyData';
import { Priority, Ticket } from '../types/types';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Ticket;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Código',
    },
    {
        id: 'subject',
        numeric: true,
        disablePadding: false,
        label: 'Requerimiento',
    },
    {
        id: 'priority',
        numeric: true,
        disablePadding: false,
        label: 'Prioridad',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Fecha',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Ticket) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Ticket) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sx={{ padding: '16px' }}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding='checkbox'>Detalle</TableCell>
                <TableCell padding='checkbox'>Editar</TableCell>
                <TableCell padding='checkbox'>Eliminar</TableCell>
            </TableRow>

        </TableHead>
    );
}
function EnhancedTableToolbar() {
    const idUser = 13

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }
            ]}
        >
            <Typography
                sx={{ flex: '1 1 100%', textAlign: 'left' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Requerimientos
            </Typography>
            <a style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'none' }} href={`/profile/${idUser}`}>
                <AccountBoxIcon fontSize='large' />
                <Typography
                    sx={{ textAlign: 'right', textWrap: 'nowrap', marginLeft: 1, marginRight: 1 }}
                    variant="h6"
                    id="tableTitle"
                >
                    Romeo kai
                </Typography>
            </a>

        </Toolbar >
    );
}

export default function Tickets() {

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Ticket>('subject');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Ticket) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, row: any) => {
        const selectedIndex = selected.indexOf(row.id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        navigate(`/ticket/${row.id}`, { state: { ticket: row } })
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };



    const filteredRows = rows.filter((row) =>
        row.subject.toLowerCase().includes(searchTerm),
    );

    const priorityValue: Record<Priority, number> = {
        'Muy alta': 4,
        'Alta': 3,
        'Media': 2,
        'Baja': 1,
    };

    const sortedRows = React.useMemo(
        () =>
            [...filteredRows].sort((a, b) => {
                if (orderBy === 'priority') {
                    // TODO: ARREGLAR PRIORIDADES CUANDO HAGA EL FETCH
                    if (order === 'asc') {
                        return priorityValue[a.priority] - priorityValue[b.priority];
                    } else {
                        return priorityValue[b.priority] - priorityValue[a.priority];
                    }
                } else {
                    if (order === 'asc') {
                        return a[orderBy] > b[orderBy] ? 1 : -1;
                    } else {
                        return a[orderBy] < b[orderBy] ? 1 : -1;
                    }
                }
            }),
        [filteredRows, order, orderBy],
    );

    const paginatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper sx={{ width: '100%', flex: 1, flexDirection: 'row', justifySelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: "#ccc", marginTop: 5 }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Se eliminará el requerimiento"}
                </DialogTitle>
                <DialogContent>
                    <div>
                        El requerimiento se eliminará permanentemente del sistema
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Cancelar</Button>
                    <Button onClick={handleClose} autoFocus color='error' variant='contained'>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper sx={{ width: '100%' }}>
                <EnhancedTableToolbar />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginLeft: 15 }}>
                        <TextField
                            fullWidth
                            label="Buscar"
                            variant="outlined"
                            onChange={handleSearch}
                            value={searchTerm}
                            placeholder="Buscar requerimientos..."
                            sx={{ mb: 2 }}
                        />
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="success" onClick={() => {
                            window.location.href = "/create";
                        }}>
                            Crear nuevo requerimiento
                        </Button>
                    </div>

                </div>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {paginatedRows.map((row, index) => {
                                const isItemSelected = selected.indexOf(row.id) !== -1;
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        style={{ cursor: 'pointer' }}
                                        hover
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >

                                        <TableCell component="th" id={labelId} scope="row" padding="none"
                                            sx={{ padding: '16px' }}
                                        >
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="right">{row.subject}</TableCell>
                                        <TableCell align="right">{row.priority}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell padding="checkbox">
                                            <Tooltip title="Ver detalles">
                                                <IconButton
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        navigate(`/ticket/${row.id}`, { state: { ticket: row } })
                                                    }}
                                                >
                                                    <VisibilityIcon color='action' />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            <Tooltip title="Modificar">
                                                <IconButton onClick={(event) => {
                                                    event.stopPropagation();
                                                    navigate(`/ticket/${row.id}?editing=true`, { state: { ticket: row } })
                                                }}>
                                                    <EditIcon color='primary' />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        {/* Eliminar */}
                                        <TableCell padding="checkbox" sx={{ paddingRight: '16px' }}
                                        >
                                            <Tooltip title="Eliminar">
                                                <IconButton
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleClickOpen();
                                                    }}
                                                >
                                                    <DeleteIcon color='error' />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {/* Ver Detalles */}

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Paper>
    );
}
