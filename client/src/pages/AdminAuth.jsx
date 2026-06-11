import AdminHeader from "../components/Admin/AdminHeader";
import Header from "../components/CustomerDashboardComponents/Header";
import EmployeeSignin from "../components/EmployeeSignin";

export default function AdminAuth(){
    return(
        <div>
       <AdminHeader />
       <EmployeeSignin />
       </div>
    )
}