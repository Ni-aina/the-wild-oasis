import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    width: 100dvw;
    height: 100dvh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    // 1. Load authenticated user
    const { isLoading, isAuthenticated } = useUser();

    // 2. If there is no authenticated user, redirect to login
    useEffect(()=> {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

     // 3. While loading, show spinner
     if (isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    )

    // 4. If there is user, render the app 
    if (isAuthenticated) return children;
}
 
export default ProtectedRoute;