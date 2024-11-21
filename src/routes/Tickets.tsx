import * as React from 'react';
import { alpha } from '@mui/material/styles';
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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
interface Data {
    code: string;
    id: number;
    issue: string;
    date: string;
    priority: 'Muy alta' | 'Alta' | 'Media' | 'Baja'
}

const rows = [
    { code: "C001", id: 1, issue: "Error en el sistema", date: "11/01/2024", priority: "Muy alta" },
    { code: "C002", id: 2, issue: "Problema de conectividad", date: "11/02/2024", priority: "Alta" },
    { code: "C003", id: 3, issue: "Falla de hardware", date: "11/03/2024", priority: "Media" },
    { code: "C004", id: 4, issue: "Requerimiento de actualización", date: "11/04/2024", priority: "Baja" },
    { code: "C005", id: 5, issue: "Solicitud de soporte", date: "11/05/2024", priority: "Alta" },
    { code: "C006", id: 6, issue: "Incidencia de red", date: "11/06/2024", priority: "Muy alta" },
    { code: "C007", id: 7, issue: "Problema de seguridad", date: "11/07/2024", priority: "Alta" },
    { code: "C008", id: 8, issue: "Rendimiento lento", date: "11/08/2024", priority: "Media" },
    { code: "C009", id: 9, issue: "Falta de recursos", date: "11/09/2024", priority: "Baja" },
    { code: "C010", id: 10, issue: "Fallo en la base de datos", date: "11/10/2024", priority: "Muy alta" },
    { code: "C011", id: 11, issue: "Error en el sistema", date: "11/11/2024", priority: "Alta" },
    { code: "C012", id: 12, issue: "Problema de conectividad", date: "11/12/2024", priority: "Media" },
    { code: "C013", id: 13, issue: "Falla de hardware", date: "11/13/2024", priority: "Baja" },
    { code: "C014", id: 14, issue: "Requerimiento de actualización", date: "11/14/2024", priority: "Alta" },
    { code: "C015", id: 15, issue: "Solicitud de soporte", date: "11/15/2024", priority: "Muy alta" },
    { code: "C016", id: 16, issue: "Incidencia de red", date: "11/16/2024", priority: "Alta" },
    { code: "C017", id: 17, issue: "Problema de seguridad", date: "11/17/2024", priority: "Media" },
    { code: "C018", id: 18, issue: "Rendimiento lento", date: "11/18/2024", priority: "Baja" },
    { code: "C019", id: 19, issue: "Falta de recursos", date: "11/19/2024", priority: "Muy alta" },
    { code: "C020", id: 20, issue: "Fallo en la base de datos", date: "11/20/2024", priority: "Alta" },
    { code: "C021", id: 21, issue: "Error en el sistema", date: "11/21/2024", priority: "Media" },
    { code: "C022", id: 22, issue: "Problema de conectividad", date: "11/22/2024", priority: "Baja" },
    { code: "C023", id: 23, issue: "Falla de hardware", date: "11/23/2024", priority: "Alta" },
    { code: "C024", id: 24, issue: "Requerimiento de actualización", date: "11/24/2024", priority: "Muy alta" },
    { code: "C025", id: 25, issue: "Solicitud de soporte", date: "11/25/2024", priority: "Alta" },
    { code: "C026", id: 26, issue: "Incidencia de red", date: "11/26/2024", priority: "Media" },
    { code: "C027", id: 27, issue: "Problema de seguridad", date: "11/27/2024", priority: "Baja" },
    { code: "C028", id: 28, issue: "Rendimiento lento", date: "11/28/2024", priority: "Muy alta" },
    { code: "C029", id: 29, issue: "Falta de recursos", date: "11/29/2024", priority: "Alta" },
    { code: "C030", id: 30, issue: "Fallo en la base de datos", date: "11/30/2024", priority: "Media" },
    { code: "C031", id: 31, issue: "Error en el sistema", date: "12/01/2024", priority: "Baja" },
    { code: "C032", id: 32, issue: "Problema de conectividad", date: "12/02/2024", priority: "Muy alta" },
    { code: "C033", id: 33, issue: "Falla de hardware", date: "12/03/2024", priority: "Alta" },
    { code: "C034", id: 34, issue: "Requerimiento de actualización", date: "12/04/2024", priority: "Media" },
    { code: "C035", id: 35, issue: "Solicitud de soporte", date: "12/05/2024", priority: "Baja" },
    { code: "C036", id: 36, issue: "Incidencia de red", date: "12/06/2024", priority: "Muy alta" },
    { code: "C037", id: 37, issue: "Problema de seguridad", date: "12/07/2024", priority: "Alta" },
    { code: "C038", id: 38, issue: "Rendimiento lento", date: "12/08/2024", priority: "Media" },
    { code: "C039", id: 39, issue: "Falta de recursos", date: "12/09/2024", priority: "Baja" },
    { code: "C040", id: 40, issue: "Fallo en la base de datos", date: "12/10/2024", priority: "Muy alta" },
    { code: "C041", id: 41, issue: "Error en el sistema", date: "12/11/2024", priority: "Alta" },
    { code: "C042", id: 42, issue: "Problema de conectividad", date: "12/12/2024", priority: "Media" },
    { code: "C043", id: 43, issue: "Falla de hardware", date: "12/13/2024", priority: "Baja" },
    { code: "C044", id: 44, issue: "Requerimiento de actualización", date: "12/14/2024", priority: "Alta" },
    { code: "C045", id: 45, issue: "Solicitud de soporte", date: "12/15/2024", priority: "Muy alta" },
    { code: "C046", id: 46, issue: "Incidencia de red", date: "12/16/2024", priority: "Alta" },
    { code: "C047", id: 47, issue: "Problema de seguridad", date: "12/17/2024", priority: "Media" },
    { code: "C048", id: 48, issue: "Rendimiento lento", date: "12/18/2024", priority: "Baja" },
    { code: "C049", id: 49, issue: "Falta de recursos", date: "12/19/2024", priority: "Muy alta" },
    { code: "C050", id: 50, issue: "Fallo en la base de datos", date: "12/20/2024", priority: "Alta" }
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
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
        id: 'issue',
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
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
interface EnhancedTableToolbarProps {
    numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%', textAlign: 'left' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Requerimientos
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function Tickets() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('issue');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
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

    const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
        row.issue.toLowerCase().includes(searchTerm),
    );

    const sortedRows = React.useMemo(
        () =>
            [...filteredRows].sort((a, b) => {
                if (order === 'asc') {
                    return a[orderBy] > b[orderBy] ? 1 : -1;
                } else {
                    return a[orderBy] < b[orderBy] ? 1 : -1;
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
        <Box sx={{ width: '100%' }}>
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
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
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
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
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
                                        <TableCell align="right">{row.issue}</TableCell>
                                        <TableCell align="right">{row.priority}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell padding="checkbox">
                                            <Tooltip title="Ver detalles">
                                                <IconButton
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        alert(`Detalles del requerimiento ID: ${row.id}`);
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            <Tooltip title="Modificar">
                                                <IconButton onClick={() => {
                                                    alert(`Detalles del requerimiento ID: ${row.id}`);
                                                }}>
                                                    <EditIcon />
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
                                                    <DeleteIcon />
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
        </Box>
    );
}
