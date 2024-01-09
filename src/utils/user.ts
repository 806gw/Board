import { decodeToken } from "../components/board/detail/token";

export const getUserId = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken !== null) {
    const decoded = decodeToken(accessToken);

    return Number(decoded.id)
  }
}