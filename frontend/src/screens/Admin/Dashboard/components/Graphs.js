import React from 'react'
import './Graphs.css'
import { Doughnut, Bar } from 'react-chartjs-2';

const Graphs = ({ orders, products }) => {
    //stocks
    let outOfStock = 0;
    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    // revenue each month in a year
    let Months = (orders, from, to) => {
        let totalAmountInaMonth = 0;
        let data = orders.filter((prod) => {
            if (!prod) {
                return 0;
            }
            if (prod) {
                return prod.createdAt.slice(5,10) > `${from}` &&
                    prod.createdAt.slice(5, 10) < `${to}`;
            }
            return 0;
        }
        );
        data.forEach(element => {
            totalAmountInaMonth += element.totalPrice
        });
        return totalAmountInaMonth;
    }


    let january = Months(orders, '12-31', '02-01')

    let february = orders && Months(orders, '01-31', '03-01')
    let march = orders && Months(orders, '02-28', '04-01')
    let april = orders && Months(orders, '03-31', '05-01')
    let may = orders && Months(orders, '04-30', '06-01')
    let june = orders && Months(orders, '05-31', '07-01')
    let july = orders && Months(orders, '06-30', '08-01')
    let august = orders && Months(orders, '07-31', '09-01')
    let september = orders && Months(orders, '08-31', '10-01')
    let october = orders && Months(orders, '09-30', '11-01')
    let november = orders && Months(orders, '10-31', '12-01')
    let december = orders && Months(orders, '11-30', '01-01')

    let DoughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                label: 'Products',
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],

                fontSize: 30,
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }
    let BarState = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Earning',
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                data: [january, february, march, april, may, june, july, august, september, october, november, december]
            }
        ]
    }
    return (
        <div className='agraphBox'>
            <div className='boxInGraph'>
                <Doughnut
                    data={DoughnutState}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },

                    }}

                />
            </div>
            <div className='boxInGraph'>
                <Bar
                    data={BarState}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Graphs
