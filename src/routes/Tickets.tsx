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
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { rows as dummyTickets } from '../const/dummyData';
import { matchPriority, matchState, PriorityDB, Ticket } from '../types/types';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { deleteTicket, getTickets } from '../services/ticketService';


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
        id: 'state',
        numeric: true,
        disablePadding: false,
        label: 'Estado',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Ticket) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Ticket) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {

                    return (
                        <TableCell
                            key={headCell.id}
                            align={(headCell.id == 'subject') ? 'center' : headCell.numeric ? 'right' : 'left'}
                            sx={{
                                textAlign: (headCell.id == 'subject') ? { xs: 'center', sm: 'right' } : headCell.numeric ? 'right' : 'left',
                                display: (headCell.id == 'priority' || headCell.id == 'state') ? { xs: "none", sm: "table-cell" } : "table-cell",
                                fontSize: { xs: 11, sm: 14 },
                                maxWidth: 95,
                                paddingLeft: (headCell.id == 'id') ? "16px" : 0
                            }}
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
                    )
                })}
                <TableCell padding='checkbox' sx={{ fontSize: { xs: 11, sm: 14 } }}
                    align='center'
                >Detalle</TableCell>
                <TableCell padding='checkbox' sx={{ fontSize: { xs: 11, sm: 14 } }}>Editar</TableCell>
                <TableCell padding='checkbox' sx={{ fontSize: { xs: 11, sm: 14 } }}>Eliminar</TableCell>
            </TableRow>

        </TableHead>
    );
}
function EnhancedTableToolbar() {
    const idUser = 1

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
                </Typography>
            </a>

        </Toolbar >
    );
}

export default function Tickets() {

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Ticket>('subject');
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<Ticket[]>(dummyTickets);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            const res = await getTickets()
            if (!res) {
                console.log('err');
            }
            console.log("res");
            console.log(res);
            setRows(res.content as Ticket[])
        }

        fetchTickets()
    }, [])

    const handleRequestSort = (_event: MouseEvent<unknown>, property: keyof Ticket) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_event: MouseEvent<unknown>, row: any) => {
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

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredRows = rows.filter((row) =>
        row.subject.toLowerCase().includes(searchTerm),
    );

    const priorityValue: Record<PriorityDB, number> = {
        'URGENT': 5,
        'HIGH': 4,
        'MEDIUM': 3,
        'LOW': 2,
        'SUPER_LOW': 1
    };

    const sortedRows = useMemo(
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

    const [ticketClicked, setTicketClicked] = useState<Ticket>();
    const [open, setOpen] = useState(false);
    const [openToastDelete, setOpenToastDelete] = useState(false);

    const handleClickOpen = (row: Ticket) => {
        setTicketClicked(row)
        setOpen(true);
    };

    const handleCloseToast = () => {
        setOpenToastDelete(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        setOpen(false);
        if (!ticketClicked) return
        const completeDelete = await deleteTicket(ticketClicked.id)
        if (completeDelete) setOpenToastDelete(true)
    };

    return (
        <Paper sx={{ width: '100%', flex: 1, flexDirection: 'row', justifySelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: "#ccc", marginTop: 5 }}>
            <Snackbar open={openToastDelete} autoHideDuration={6000} onClose={handleCloseToast} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleCloseToast} severity={'success'} variant="filled" sx={{ width: "100%" }}>
                    El ticket se elimino con exito!
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Se eliminará el requerimiento "${ticketClicked?.code}"`}
                </DialogTitle>
                <DialogContent>
                    <div>
                        El requerimiento se eliminará permanentemente del sistema
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Cancelar</Button>
                    <Button onClick={handleDelete} autoFocus color='error' variant='contained'>
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
                        <Button variant="contained" color="success"
                            sx={{
                                width: { xs: '130px', sm: 'auto' },
                                fontSize: { xs: 12, sm: 13 },
                                mt: -2
                            }}
                            onClick={() => {
                                window.location.href = "/create";
                            }}>
                            Crear nuevo requerimiento
                        </Button>
                    </div>

                </div>
                <TableContainer>
                    <Table
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
                                const textPriority = Object.keys(matchPriority).find(key => matchPriority[key] === row.priority)
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
                                            sx={{
                                                width: { xs: "20px" },
                                                padding: '16px',
                                                fontSize: { xs: 10, sm: 12 }
                                            }}
                                        >
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="right"
                                            sx={{
                                                fontSize: 12,
                                            }}
                                        >{row.subject}</TableCell>
                                        <TableCell align="right"
                                            sx={{ display: { xs: "none", sm: "table-cell" } }}
                                        >
                                            {row.priority == 'URGENT' && (<Chip color='error' style={{ color: "#fff" }} variant='filled' label={textPriority} />)}
                                            {row.priority == 'HIGH' && (<Chip style={{ backgroundColor: "#ff5f38", color: "#fff" }} variant='filled' label={textPriority} />)}
                                            {row.priority == 'MEDIUM' && (<Chip color='warning' style={{ color: "#fff" }} variant='filled' label={textPriority} />)}
                                            {row.priority == 'LOW' && (<Chip color='primary' style={{ color: "#fff" }} variant='filled' label={textPriority} />)}
                                            {row.priority == 'SUPER_LOW' && (<Chip color='primary' style={{ color: "#fff" }} variant='filled' label={textPriority} />)}

                                        </TableCell>
                                        <TableCell align="right"
                                            sx={{ display: { xs: "none", sm: "table-cell" } }}
                                        >
                                            {matchState[row.state]}
                                        </TableCell>
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
                                                        handleClickOpen(row);
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
