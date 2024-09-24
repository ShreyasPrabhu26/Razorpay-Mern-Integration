import useRazorpay from "react-razorpay"

function App() {
  const [Razorpay] = useRazorpay()
  const payNow = () => {
    const responseFromServer = fetch("http://localhost:3000/order");
    console.log(responseFromServer);
    const options = {
      key: "",
      amount: "50000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://www.vecteezy.com/free-vector/lion-logo",
      order_id: responseFromServer.orderID,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Shreyas Prabhu",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpay = new Razorpay(options)

    razorpay.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    razorpay.open();
  };

  return (
    <>
      <div>Hi There</div>
      <button onClick={payNow}>PAY NOW</button>
    </>
  )
}
export default App
