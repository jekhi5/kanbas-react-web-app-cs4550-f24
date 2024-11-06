import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute(
    { children, requiredAttribute = null }:
        {
            children: any,
            requiredAttribute?: {
                key: string,
                val: any,
                altRoute?: string,
            } | null
        }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser) {
        if (requiredAttribute) {
            if (currentUser[requiredAttribute.key] === requiredAttribute.val) {
                return children;
            }

            return requiredAttribute.altRoute
                ? <Navigate to={`/Kanbas/${requiredAttribute.altRoute}`} />
                : <Navigate to="/Kanbas/Account/Signin" />;
        }
        return children;
    } else {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }
}
