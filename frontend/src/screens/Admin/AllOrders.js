import React, { Fragment, useState, useEffect, useMemo } from "react";
import './ProductList.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders, clearError } from "../../Redux/actions/orderActions";
import SidebarMenu from "./Dashboard/components/SidebarMenu";
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import GlobalFilter from './utils/GloableFilter'
import { DELETE_ORDER_RESET } from '../../Redux/constants/orderConstants';
import { ToastContainer } from "react-toastify";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from "../../components/loaders/Loading";
import MetaData from "../../utils/title/MetaData";
import { notifyError, notifySuccess } from "../../utils/alerts/Alerts";

const AllOrders = () => {
    const dispatch = useDispatch();
    const { error, orders, loading } = useSelector((state) => state.allOrders);

    const { isDeleted, error: deleteError } = useSelector((state) => state.order);

    const [orderId, setOrderId] = useState('')
    const [dopen, setDopen] = useState(false);

    const handleDOpen = () => {
        setDopen(true);
    };

    const handleDClose = () => {
        setDopen(false);
    };

    orders && orders.map(element => {
        delete element.itemsPrice
        delete element.paidAt
        delete element.paymentInfo
        delete element.shippingInfo
        delete element.shippingPrice
        delete element.taxPrice
        delete element.__v
        delete element.orderItems
        return element.user = element._id
    });

    const data = useMemo(
        () => [...orders],
        [orders]
    )
    const columns = useMemo(
        () =>
            orders[0]
                ?
                Object.keys(orders[0])
                    .map((key) => {
                        if (key === "user")
                            return {
                                Header: "Actions",
                                accessor: key,
                                Cell: ({ value }) =>
                                    <>
                                        <Link to={`/admin/u/order/${value}`} >
                                            <span className='actionIcon'>
                                                <InfoIcon />
                                            </span>
                                        </Link>
                                        <span className='actionIcon' onClick={() => { setOrderId(value); handleDOpen(); }}>
                                            <DeleteIcon />
                                        </span>
                                    </>,
                            };
                        if (key === 'orderStatus') {
                            return {
                                Header: "Order Status",
                                accessor: key,
                                Cell: ({ value }) =>
                                    <span className={value === 'Delivered' ? "greenColor"
                                        : "redColor"}>{value}
                                    </span>,
                            }
                        }
                        if (key === '_id') {
                            return {
                                Header: "Order ID",
                                accessor: "_id"
                            }
                        }
                        if (key === 'createdAt') {
                            return {
                                Header: "Place At",
                                accessor: key,
                                Cell: ({ value }) =>
                                    <span>
                                        {value && value.slice(0, 10)}
                                    </span>,
                            }
                        }
                        if (key === 'deliveredAt') {
                            return {
                                Header: "Delivered At",
                                accessor: key,
                                Cell: ({ value }) =>
                                    <span>
                                        {value && value.slice(0, 10)}
                                    </span>,
                            }
                        }
                        return { Header: key, accessor: key };
                    })
                : [],
        [orders]
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
            notifySuccess('Order Deleted Successfully.');
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, isDeleted, error, deleteError]);


    const deleteOrderHandler = (orderId) => {
        dispatch(deleteOrder(orderId));
    };

    return (
        <Fragment>
            {
                loading ?
                    (<Loading />) : (
                        <Fragment>
                            <MetaData title='All Orders' />
                            <SidebarMenu />
                            <div className='adminViewList'>
                                <div className='adminViewHeader'>
                                    <h2>All Orders</h2>
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
                                {orders && <table {...getTableProps()} className='adminViewTable'>
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
                                    <button onClick={() => { deleteOrderHandler(orderId); handleDClose() }} className='btnPrimary deleteBtn'>
                                        Delete
                                    </button>
                                </DialogActions>
                            </Dialog>
                        </Fragment>
                    )
            }
            <ToastContainer />
        </Fragment>
    );
};

export default AllOrders;
