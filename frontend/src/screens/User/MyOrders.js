import React, { Fragment, useEffect, useMemo } from "react";
import "./MyOrders.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../Redux/actions/orderActions";
import { useTable, useSortBy, usePagination } from 'react-table'
import MetaData from "../../utils/title/MetaData";

const MyOrders = () => {
    const dispatch = useDispatch();

    const { orders } = useSelector((state) => state.myOrders);

    orders.map(element => {
        let len = element.orderItems.length
        delete element.itemsPrice
        delete element.paidAt
        delete element.paymentInfo
        delete element.shippingInfo
        delete element.shippingPrice
        delete element.taxPrice
        delete element.__v
        delete element.user
        return element.orderItems = len.toString();
    });


    const data = useMemo(
        () => [...orders],
        [orders]
    )
    const columns = useMemo(
        () =>
            orders[0]
                ? Object.keys(orders[0])
                    .map((key) => {
                        if (key === '_id') {
                            return {
                                Header: "Order ID",
                                accessor: "_id",
                                Cell: ({ value }) =>
                                    <Link to={`/order/${value}`}>
                                        <span>
                                            {value && value}
                                        </span>
                                    </Link>
                            }
                        }
                        if (key === 'orderItems') {
                            return {
                                Header: "Qunatity",
                                accessor: "orderItems"
                            }
                        }
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
        state: { pageIndex, pageSize }
    } = useTable({ columns, data }, useSortBy, usePagination)


    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);
    return (
        <Fragment>
            <MetaData title='my orders'/>
            <div className='myOrdersPage'>
                <div className='myOrdersPHeading'>
                    <h2>My Orders</h2>
                    <div className='userViewLinks'>
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
                {orders && <table {...getTableProps()} className='myOrdersTable'>
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
                        </div> : ""
                }
            </div>
        </Fragment>
    );
};

export default MyOrders;
