import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import EMICalculator from "./EmiCalculator";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <div>{loading ? <Loader /> : <EMICalculator />}</div>;
};

export default App;
