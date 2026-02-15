function TotalEstimateCost({ amount }) {
    return (
      <div
        style={{
          background: "#e8f5e9",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >
        <h3 style={{ margin: 0 , color: "#000" }}>Total Estimated Cost</h3>
        <h1 style={{ marginTop: "10px", color: "#2e7d32" }}>
          ₹{amount.toLocaleString()}
        </h1>
      </div>
    );
  }
  
  export default TotalEstimateCost;
  