import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute(
    { children, requiredAttribute = null }:
        { children: any, requiredAttribute?: { key: string, val: any } | null }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser) {
        if (requiredAttribute) {
            return (currentUser[requiredAttribute.key] === requiredAttribute.val)
                ? children
                : <Navigate to="/Kanbas/Account/Signin" />;
        }
        return children;
    } else {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }
}
