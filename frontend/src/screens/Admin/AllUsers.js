import React, { Fragment, useEffect, useState, useMemo } from 'react'
import SidebarMenu from './Dashboard/components/SidebarMenu'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Update'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import { deleteUser, getAllUsers, updateUserDetails, clearError } from '../../Redux/actions/userActions'
import './ProductList.css'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import GlobalFilter from './utils/GloableFilter'
import { DELETE_USER_RESET } from '../../Redux/constants/userConstants'
import { UPDATE_USER_RESET } from '../../Redux/constants/userConstants'
import { ToastContainer } from 'react-toastify'


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from '../../components/loaders/Loading'
import MetaData from '../../utils/title/MetaData'
import { notifyError, notifySuccess } from '../../utils/alerts/Alerts'


const AllUser = () => {
    const dispatch = useDispatch();
    const { error, users, loading } = useSelector((state) => state.allUsers);
    const {
        error: deleteError,
        isDeleted,
        isUpdated
    } = useSelector((state) => state.profile);

    const [userId, setUserId] = useState('')
    const [uopen, setUopen] = useState(false);
    const [dopen, setDopen] = useState(false);
    const [inputs, setInputs] = useState({ role: '' });

    const handleUOpen = () => {
        setUopen(true);
    };

    const handleUClose = () => {
        setUopen(false);
    };
    const handleDOpen = () => {
        setDopen(true);
    };

    const handleDClose = () => {
        setDopen(false);
    };

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    };

    users.map(element => {
        delete element.avatar
        delete element.cart
        delete element.resetPasswordExpire
        delete element.resetPasswordToken
        return element.__v = element._id
    });

    const data = useMemo(
        () => [...users],
        [users]
    )
    const columns = useMemo(
        () =>
            users[0]
                ? Object.keys(users[0])
                    .map((key) => {
                        if (key === "__v")
                            return {
                                Header: "Actions",
                                accessor: key,
                                Cell: ({ value }) =>
                                    <>
                                        <Link to={`/admin/u/${value}`} >
                                            <span className='actionIcon'>
                                                <InfoIcon />
                                            </span>
                                        </Link>
                                        <span className='actionIcon'
                                            onClick={() => { setUserId(value); handleUOpen(); }}>
                                            <EditIcon />
                                        </span>
                                        <span className='actionIcon' onClick={() => { setUserId(value); handleDOpen(); }}>
                                            <DeleteIcon />
                                        </span>
                                    </>,
                            };
                        if (key === '_id') {
                            return {
                                Header: "User ID",
                                accessor: "_id"
                            }
                        }
                        if (key === 'date') {
                            return {
                                Header: "Member Since",
                                accessor: key,
                                Cell: ({ value }) =>
                                    <span>
                                        {value.slice(0, 10)}
                                    </span>,
                            }
                        }
                        return { Header: key, accessor: key };
                    })
                : [],
        [users]
    );

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        previousPage,
        nextPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        pageCount,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination,)


    useEffect(() => {

        if (error) {
            notifyError(error);
            dispatch(clearError());
        }

        if (deleteError) {
            notifyError(deleteError);
            dispatch(clearError());
        }

        if (isDeleted) {
            notifySuccess("User Deleted Successfully.");
            dispatch({ type: DELETE_USER_RESET });
        }
        if (isUpdated) {
            notifySuccess("User Role Updated Successfully.");
            dispatch({ type: UPDATE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, isUpdated]);

    const { role } = inputs
    const updateUserSubmitHandler = () => {
        dispatch(updateUserDetails(userId, role));
    };

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    return (
        <Fragment>
            {loading ? (<Loading />) : (
                <Fragment>
                    <MetaData title='All Users' />
                    <SidebarMenu />
                    <div className='adminViewList'>
                        <div className='adminViewHeader'>
                            <h2>All Users</h2>
                            <div className='adminViewHeaderLinks'>
                                <GlobalFilter
                                    preGlobalFilteredRows={preGlobalFilteredRows}
                                    setGlobalFilter={setGlobalFilter}
                                    globalFilter={state.globalFilter}
                                />
                                <span className='howMuchshowOnPage'>
                                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                        {
                                            [10, 25, 50, 100].map((element) => (
                                                <option key={element} value={element}>
                                                    show {element}
                                                </option>
                                            ))
                                        }
                                    </select>

                                </span>
                            </div>
                        </div>

                        {users && <table {...getTableProps()} className='adminViewTable'>
                            <thead>
                                {headerGroups.map((headerGroup,) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} >
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.isSorted ? (column.isSortedDesc ? "▼  " : "▲  ") : "▲  ▼ "}
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))
                                }
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        }
                        {
                            pageOptions.length > 1 ?
                                <div>
                                    <span>
                                        Page{' '}
                                        <strong>
                                            {pageIndex + 1} of {pageOptions.length}
                                        </strong>
                                    </span>
                                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='btnPrimary next'>{'<<'}</button>
                                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className='btnPrimary next'>previous</button>
                                    <button onClick={() => nextPage()} disabled={!canNextPage} className='btnPrimary prev'>next</button>
                                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='btnPrimary prev'>{'>>'}</button>
                                </div> : ''
                        }
                    </div>


                    {/* dialog box for the update user rore*/}
                    <Dialog open={uopen} onClose={handleUClose} onSubmit={updateUserSubmitHandler}>
                        <DialogTitle>Change Role</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To access the admin panel you can change the user as admin role.
                                Are you sure to change the chenges.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="role"
                                type="text"
                                fullWidth
                                variant="standard"
                                name='role'
                                onChange={onChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleUClose}>Cancel</Button>
                            <Button onClick={() => { updateUserSubmitHandler(); handleUClose() }}>Update</Button>
                        </DialogActions>
                    </Dialog>
                    {/* dialog box for the user delete  */}
                    <Dialog
                        open={dopen}
                        onClose={handleDClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure to delete this user ?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please sure that you realy want to delete this user
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <button onClick={handleDClose} className='btnPrimary'>Cancel</button>
                            <button onClick={() => { deleteUserHandler(userId); handleDClose() }} className='btnPrimary deleteBtn'>
                                Delete
                            </button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            )}
            <ToastContainer />
        </Fragment>
    )
}

export default AllUser
