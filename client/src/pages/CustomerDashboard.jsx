import Accounts from "../components/Accounts";
import Header from "../components/CustomerDashboardComponents/Header";
import Transaction from "../components/CustomerDashboardComponents/Transaction";
import Loans from "../components/Loans";

import TransactionHistory from "../components/TransactionHistory";

export default function CustomerDashboard() {
  return (
   <div>
<Header />

    <div className="container-fluid py-4 min-vh-100 bg-dark">
      <div className="row g-4">


        <div className="col-12 col-md-8">
          <div className="row-12  row-md-9 g-4 mb-3">
            <div className="col-12">
              <div className="p-3 bg-primary  rounded border h-100">
                <Accounts />
              </div>
            </div>
          </div>

          <div className="row g-4" >
            <div className="col-6">
              <div className="p-3 bg-warning rounded border h-100">
                <Loans />
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 bg-warning rounded border h-50">
                <Transaction />
              </div>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="p-3 bg-success rounded border h-100">
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