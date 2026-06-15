import Accounts from "../components/CustomerDashboardComponents/Accounts";
import Header from "../components/CustomerDashboardComponents/Header";
import Transaction from "../components/CustomerDashboardComponents/Transaction";
import Loans from "../components/CustomerDashboardComponents/Loans";
import { useDispatch, useSelector } from "react-redux";
import TransactionHistory from "../components/CustomerDashboardComponents/TransactionHistory";
import { useEffect } from "react";
import { storeTransaction } from "../store/actions/transactionAction";

export default function CustomerDashboard() {

 const user = useSelector((state) => state.user);
  const dispatch=useDispatch()
 useEffect(() => {
  if (user.token) {
    dispatch(storeTransaction());
   // console.log(user.token)
  }
}, [user.token,dispatch]);
  return (
   <div>
<Header />

    <div className="container-fluid py-4 min-vh-100 cus-dashboard-bg">
      <div className="row g-4">


        <div className="col-12 col-md-8">
          <div className="row-12  row-md-9 g-4 mb-3">
            <div className="col-12">
              <div className="p-3 bg-white  rounded border h-100">
                <Accounts />
              </div>
            </div>
          </div>

          <div className="row g-4" >
            <div className="col-6">
              <div className="p-3 bg-white rounded border h-100">
                <Loans />
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 bg-white rounded border">
                <Transaction />
              </div>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="p-3 bg-white rounded border h-100">
                <TransactionHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
  );
}