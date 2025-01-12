


// import { Link } from "react-router-dom";
// import styles from './styles.module.css'
// import { useState } from "react";
// import axios from 'axios'
//
//
//
// const Login = () => {
//     const [data, setData] = useState({
//
//         email: "",
//         password: ""
//     })
//
//     const [error, setError] = useState('')
//
//
//     const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value })
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = "http://localhost:8080/api/auth";
//             const { data: res } = await axios.post(url, data);
//
//             localStorage.setItem("token", res.data)
//             window.location = "/"
//
//
//         } catch (error) {
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message)
//             }
//         }
//     }
//     return (
//         <div className={styles.login_container}>
//             <div className={styles.login_form_container}>
//                 <div className={styles.left}>
//                     <form className={styles.form_container} onSubmit={handleSubmit}>
//                         <h1>Login To your account</h1>
//
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             name="email"
//                             onChange={handleChange}
//                             value={data.email}
//                             required
//                             className={styles.input} />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             name="password"
//                             onChange={handleChange}
//                             value={data.password}
//                             required
//                             className={styles.input} />
//                         {error && <div className={styles.error_msg}>{error}</div>}
//                         <button type="submit" className="styles.green_btn">Signup</button>
//                     </form>
//
//                 </div>
//                 <div className={styles.right}>
//                     <h1>new here?</h1>
//                     <Link to="/signup">
//                         <button type="button" className={styles.white_btn}>
//                             Sign In
//                         </button>
//                     </Link>
//
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Login

import { Link } from "react-router-dom";
import styles from './styles.module.css';
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);

            localStorage.setItem("token", res.data);
            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            setTimeout(() => {
                window.location = "/";
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <ToastContainer />
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login To Your Account</h1>

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <p>Password must contain total 8 characters including an uppercase, a lowercase,</p>
                        <p>a special character like @ and numbers</p>

                        <p>Like Aj@123456789</p>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>Login</button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

