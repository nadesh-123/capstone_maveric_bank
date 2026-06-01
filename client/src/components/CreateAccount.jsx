
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CreateAccount() {
 const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    branch: "",
    accountType: "",
    amount: ""
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hit")
    const payload = { accountType: formData.accountType };
    console.log(formData)
   try { const response = await fetch( `http://localhost:8080/api/account/add/customer?branchName=${formData.branch}&customerId=${user.cusid}`, 
    { method: "POST",
       headers: { "Authorization": `Bearer ${user.token}`,
         "Content-Type": "application/json" },
      body: JSON.stringify(payload) } );
     
    
      if (response.ok) { 
    
    
       alert("Account Created Successfully"); 
     navigate("/accountList");
     
      } else { 
        alert(response)
        console.log(response);

       } 
      } 
      catch (error) { 
        alert(error)
        console.log(error); 
         } };

  return (

    <div className="min-h-screen bg-light_white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-snow_white rounded-3xl shadow-xl p-10 border border-bdr_light">

        {/* Heading */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-darkBlue">
            Create Bank Account
          </h1>

          <p className="text-sliver mt-3 text-lg">
            Open your account securely with Maveric Bank
          </p>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Branch Dropdown */}
          <div>

            <label className="block text-darkBlue font-semibold mb-3">
              Select Branch
            </label>

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-2xl
                border
                border-bdr_light
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-brightBlue
                text-darkBlue
              "
            >
              <option value="">Choose Branch</option>

              <option value="Mumbai Main Branch">Mumbai Main Branch</option>
              <option value="Amaravati Capital Branch">Amaravati Capital Branch</option>
              <option value="Bengaluru Tech Park Branch">Bengaluru Tech Park Branch</option>
              <option value="Chennai Coastal Branch">Chennai Coastal Branch </option>
              <option value="Delhi Central Branch">Delhi Central Branch</option>

            </select>
          </div>


          {/* Account Type Dropdown */}
          <div>

            <label className="block text-darkBlue font-semibold mb-3">
              Account Type
            </label>

            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-2xl
                border
                border-bdr_light
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-hexawareBlue
                text-darkBlue
              "
            >
              <option value="">Choose Account Type</option>

              <option value="SAVINGS_ACCOUNT">Savings Account</option>
              <option value="CURRENT_ACCOUNT">Current Account</option>
              <option value="CURRENT_ACCOUNT">Salary Account</option>
              <option value="CURRENT_ACCOUNT">Fixed Deposit Account</option>

            </select>
          </div>


          {/* Initial Amount */}
          <div>

            <label className="block text-darkBlue font-semibold mb-3">
              Initial Deposit Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="Enter Initial Amount"
              value={formData.amount}
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-2xl
                border
                border-bdr_light
                focus:outline-none
                focus:ring-2
                focus:ring-honey
                text-darkBlue
              "
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full
              bg-darkBlue
              hover:bg-hexawareBlue
              transition
              duration-300
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              shadow-lg
            "
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;

