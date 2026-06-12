
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../styles/Transaction.css";

export default function Transaction() {
  const token = useSelector((state) => state.user.token);

  const [transactionType, setTransactionType] = useState("WITHDRAW");

  const [sourceAcc, setSourceAcc] = useState("");
  const [targetAcc, setTargetAcc] = useState("");
  const [amount, setAmount] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setPageLoading(true);

      const [accountsResponse, beneficiaryResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:8080/api/account/getActiveAccounts",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          axios.get(
            "http://localhost:8080/api/beneficiary/get",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

      setAccounts(accountsResponse.data);
      setBeneficiaries(beneficiaryResponse.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load account details.");
    } finally {
      setPageLoading(false);
    }
  }

  function resetForm() {
    setSourceAcc("");
    setTargetAcc("");
    setAmount("");
  }

  function changeTransactionType(type) {
    setTransactionType(type);

    setSourceAcc("");
    setTargetAcc("");
    setAmount("");

    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    let payload = {
      transactionType,
      amount: Number(amount),
    };

    if (transactionType === "WITHDRAW") {
      payload.Source_accno = sourceAcc;
    }

    if (transactionType === "DEPOSIT") {
      payload.Target_accno = targetAcc;
    }

    if (transactionType === "TRANSFER") {
      payload.Source_accno = sourceAcc;
      payload.Target_accno = targetAcc;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/transaction-Withdraw-Deposit-Transfer",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        `${transactionType.toLowerCase()} transaction completed successfully.`
      );

      resetForm();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Transaction failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="transaction-page">
        <div className="transaction-card text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3">
            Loading accounts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-page">
      <div className="transaction-card">

        <h2 className="transaction-title">
          Bank Transaction
        </h2>

        {/* Tabs */}

        <div className="transaction-tabs">

          <button
            type="button"
            className={
              transactionType === "DEPOSIT"
                ? "active"
                : ""
            }
            onClick={() =>
              changeTransactionType("DEPOSIT")
            }
          >
            Deposit
          </button>

          <button
            type="button"
            className={
              transactionType === "WITHDRAW"
                ? "active"
                : ""
            }
            onClick={() =>
              changeTransactionType("WITHDRAW")
            }
          >
            Withdraw
          </button>

          <button
            type="button"
            className={
              transactionType === "TRANSFER"
                ? "active"
                : ""
            }
            onClick={() =>
              changeTransactionType("TRANSFER")
            }
          >
            Transfer
          </button>

        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {success && (
          <div className="success-box">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Withdraw */}

          {transactionType === "WITHDRAW" && (
            <>
              <label className="form-label">
                Select Account
              </label>

              <select
                className="custom-select"
                value={sourceAcc}
                onChange={(e) =>
                  setSourceAcc(e.target.value)
                }
                required
              >
                <option value="">
                  Select Account
                </option>

                {accounts.map((account) => (
                  <option
                    key={account.accountNumber}
                    value={account.accountNumber}
                  >
                    {account.accountNumber} -
                    {" "}
                    {account.accountType}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Deposit */}

          {transactionType === "DEPOSIT" && (
            <>
              <label className="form-label">
                Select Account
              </label>

              <select
                className="custom-select"
                value={targetAcc}
                onChange={(e) =>
                  setTargetAcc(e.target.value)
                }
                required
              >
                <option value="">
                  Select Account
                </option>

                {accounts.map((account) => (
                  <option
                    key={account.accountNumber}
                    value={account.accountNumber}
                  >
                    {account.accountNumber} -
                    {" "}
                    {account.accountType}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Transfer */}

          {transactionType === "TRANSFER" && (
            <>
              <label className="form-label">
                Source Account
              </label>

              <select
                className="custom-select"
                value={sourceAcc}
                onChange={(e) =>
                  setSourceAcc(e.target.value)
                }
                required
              >
                <option value="">
                  Select Source Account
                </option>

                {accounts.map((account) => (
                  <option
                    key={account.accountNumber}
                    value={account.accountNumber}
                  >
                    {account.accountNumber} -
                    {" "}
                    {account.accountType}
                  </option>
                ))}
              </select>

              <label className="form-label">
                Beneficiary Account
              </label>

              <select
                className="custom-select"
                value={targetAcc}
                onChange={(e) =>
                  setTargetAcc(e.target.value)
                }
                required
              >
                <option value="">
                  Select Beneficiary
                </option>

                {beneficiaries.map(
                  (beneficiary) => (
                    <option
                      key={
                        beneficiary.accountNumber
                      }
                      value={
                        beneficiary.accountNumber
                      }
                    >
                      {
                        beneficiary.accountNumber
                      }
                    </option>
                  )
                )}
              </select>
            </>
          )}

          {/* Amount */}

          <label className="form-label">
            Amount
          </label>

          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Enter Amount"
            className="custom-input amount-input"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>

                Processing...
              </>
            ) : (
              transactionType
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

