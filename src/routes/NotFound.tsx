import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>Oops! La pagina no existe.</p>
            <Link to="/">Login</Link>
        </div>
    );
}