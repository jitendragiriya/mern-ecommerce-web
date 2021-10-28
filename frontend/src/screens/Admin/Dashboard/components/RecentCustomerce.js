import React from 'react'
import img from './img/download.png'
import { Link } from 'react-router-dom'
import './RecentCustomerce.css'


const RecentCustomerce = ({ users }) => {
    return (
        <div>
            <div className='adminPrecentCustomers'>
                <div className='cardHeader'>
                    <h2>Recent Customers</h2>
                    <Link to='/admin/users' className='btnPrimary'>View All</Link>
                </div>
                <table>
                    {users && users.slice(0, 10).map((user) => (
                        <tbody key={user._id}>
                            <tr>
                                <td width='60px'><div className="recentCustomerImgBox">
                                    {
                                        user && user.avatar && user.avatar.url?
                                            <img src={user.avatar.url} alt='img' /> :
                                            <img src={img} alt='img' />
                                    }
                                </div>
                                </td>
                                <td><h4>{user && user.name}<br /><span>Italy</span></h4></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div >
    )
}

export default RecentCustomerce
