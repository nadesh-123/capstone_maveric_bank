import AddEmployee from "../components/Admin/AddEmployee";
import AdminHeader from "../components/Admin/AdminHeader";
import BranchStat from "../components/Admin/BranchStat";

export default function AdminDashboard(){
    return(
        <div>
       <AdminHeader />
       <div>
        <div className="row g-5">
            <div className="col-6 g-0 p-5">
       <AddEmployee />
            </div>
            <div className="col-6">
                <h1>Branch vs Accounts Count</h1>
        <BranchStat />
            </div>
        </div>
       </div>
        </div>
    )
}