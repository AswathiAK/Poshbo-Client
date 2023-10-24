import React from 'react'
import { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#290268");
  return (
    <div className="sweet-loading">
      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{justifyContent:"center",alignItems:"center"}}
      />
    </div>
  )
}

export default Loader
