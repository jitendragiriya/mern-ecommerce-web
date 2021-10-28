import React, { Fragment, useState, useEffect, useMemo } from 'react'
import './ProductList.css'
import { useSelector, useDispatch } from 'react-redux';
import { adminProductDelete, getAdminProduct, clearError } from '../../Redux/actions/productAction'
import { DELETE_PRODUCT_RESET } from '../../Redux/constants/productConstants';
import { Link } from 'react-router-dom';
import SidebarMenu from './Dashboard/components/SidebarMenu';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import GlobalFilter from './utils/GloableFilter'
import { ToastContainer } from 'react-toastify';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from '../../components/loaders/Loading';
import MetaData from '../../utils/title/MetaData';
import { notifyError, notifySuccess } from '../../utils/alerts/Alerts';


const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products)
    const { error: deleteError, isDeleted } = useSelector((state) => state.updateProduct);

    const [productId, setProductId] = useState('')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteProductHandler = (id) => {
        dispatch(adminProductDelete(id))
    };

    products && products.map(element => {
        delete element.category
        delete element.createdAt
        delete element.description
        delete element.images
        delete element.numofReviews
        delete element.ratings
        delete element.reviews
        delete element.__v
        return element.user = element._id
    });

    const data = useMemo(
        () => [...products],
        [products]
    )

    const maxlimit = 50;

    const columns = useMemo(
        () =>
            products[0]
                ? Object.keys(products[0])
                    .map((key) => {
                        if (key === "user")
                            return {
                                Header: "Actions",
                                accessor: key,
                                Cell: ({ value }) => <>
                                    <Link to={`/admin/product/${value}`}>
                                        <span className='actionIcon'>
                                            <EditIcon />
                                        </span>
                                    </Link>
                                    <span className='actionIcon' onClick={() => { setProductId(value); handleClickOpen(); }}>
                                        <DeleteIcon />
                                    </span></>,
                            };
                        if (key === 'name') {
                            return {
                                Header: "Product Name",
                                accessor: "name",
                                Cell: ({ value }) => <span>{
                                    ((value).length > maxlimit) ?
                                        (((value).substring(0, maxlimit - 3)) + '...') :
                                        value
                                }</span>
                            }
                        }
                        if (key === '_id') {
                            return {
                                Header: "Product ID",
                                accessor: "_id"
                            }
                        }

                        return { Header: key, accessor: key };
                    })
                : [],
        [products]
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
            notifySuccess("Product Deleted Successfully");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProduct())
    }, [dispatch,error, isDeleted, deleteError]);

    return (
        <Fragment>
            {
                loading ? (
                    <Loading />
                )
                    :
                    (<Fragment>
                        <MetaData title='All Products' />
                        <div className='adminDashboard'>
                            <SidebarMenu />
                            <div className='adminViewList'>
                                <div className='adminViewHeader'>
                                    <h2>All products</h2>
                                    <div className='adminViewHeaderLinks'>
                                        <div className='addDelete'>
                                            <Link to='/admin/product/new'>
                                                <div className='btnPrimary addNewProduct'>Add New Product</div>
                                            </Link>
                                        </div>
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

                                {products && <table {...getTableProps()} className='adminViewTable'>
                                    <thead>
                                        {headerGroups.map((headerGroup,) => (
                                            <tr {...headerGroup.getHeaderGroupProps()} >
                                                {headerGroup.headers.map((column) => (
                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                        {column.isSorted ? (column.isSortedDesc ? "▼  " : "▲  ") : "▼  "}
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
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>

                        <Dialog
                            open={open}
                            onClose={handleClose}
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
                                <button onClick={handleClose} className='btnPrimary'>Cancel</button>
                                <button onClick={() => { deleteProductHandler(productId); handleClose() }} className='btnPrimary deleteBtn'>
                                    Delete
                                </button>
                            </DialogActions>
                        </Dialog>
                    </Fragment>)
            }
            <ToastContainer />
        </Fragment>
    )
}

export default ProductList