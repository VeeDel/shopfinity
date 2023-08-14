import React, { useState } from "react";
import styles from "./checkout.module.css";
import $ from "jquery";

export default function Checkout() {
  const [amount, setAmount] = useState("");

  const paymentStart = () => {
    console.log(amount); // send amount to server for processing the transaction and redirect
    $.ajax({
      url: "/user/create_order",
      data: JSON.stringify({ amount: amount, info: "order_request" }),
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      success: function (response) {
        //invoke where success
      },
      error: function (error) {
        //invoke when error
        console.log(error);
        alert("something went wrong!!");
      },
    });
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="text"
          className="form-control mt-2"
          placeholder="Enter Amount"
        />
        <div className="container text-center mt-4">
          <button
            onClick={paymentStart}
            className="btn btn-success btn-block mb-2"
          >
            Pay Now!
          </button>
        </div>
      </div>
    </div>
  );
}
