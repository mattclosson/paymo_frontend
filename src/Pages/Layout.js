import logo from '../logo.svg';
import { useNavigate } from 'react-router';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState, useAuthDispatch, logout } from '../Context';

function Layout() {
	const userDetails = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

	const handleLogout = () => {
		logout(dispatch);
		navigate('/login');
	};

    const user = userDetails.token
    return (
      <div className="container">
        <div className="header">
            <div className="logo">
                <Link to="/dashboard"><img src={logo} /></Link>
            </div>
            <div className="nav">
                <ul>
                {!user ?
                    <>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-login">Login</Link>
                    </li>
                    </>
                    :
                    <>
                    <li>
                        <Link to="/invoice/create">Create Invoice</Link>
                    </li>
                    <li>
                        <button className="logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                    </>
                }
                </ul>
            </div>
        </div>
        <Outlet />
      </div>
    );
  }

  export default Layout