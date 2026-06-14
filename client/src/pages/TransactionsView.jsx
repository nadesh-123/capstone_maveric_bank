import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/CustomerDashboardComponents/Header'

const TransactionsView = () => {
  return (
    <div>
        <Header />
   <div className="container d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div className="col-6">
        <Outlet />
       
      </div>
    </div>
    </div>
  )
}

export default TransactionsView
