import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);
  return <></>;
};
export default AuthChecker;
