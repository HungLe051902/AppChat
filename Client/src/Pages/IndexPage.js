import React from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    let navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");

    if (!token) {
        navigate('/login');
    }
    else {
        navigate('/dashboard');
    }
  }, []);

  return <div>Index</div>;
};

export default IndexPage;
