import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";

interface Props {
  children: React.ReactNode;
}

export function PublicOnlyRoute({ children }: Props) {
  const { user } = useAuth();

  if (user === undefined) {
    return <Loading />;
  }

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
