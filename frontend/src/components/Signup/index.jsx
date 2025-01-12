import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Display success toast
            toast.success("Account created successfully! Redirecting to login...", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Navigate to login after 3 seconds
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                // Display error toast
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Login in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
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
                        <button type="submit" className={styles.green_btn}>
                            Signup
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;



//
// import { Link, useNavigate } from "react-router-dom";
// import styles from './styles.module.css'
// import { useState } from "react";
// import axios from 'axios'
//
//
// const Signup = () => {
//     const [data, setData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: ""
//     })
//
//     const [error, setError] = useState('')
//     const navigate = useNavigate();
//
//     const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value })
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = "http://localhost:8080/api/users";
//             // const { data: res } = await axios.post(url, data);
//             const response = await axios.post(url, data, {
//                 headers: {
//                     'Content-Type': 'application/json',  // Make sure the request body is in JSON format
//                 },
//             });
//             navigate("/login")
//             console.log(response.message);
//
//
//         } catch (error) {
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message)
//             }
//         }
//     }
//     return (
//         <div className={styles.signup_container}>
//             <div className={styles.signup_form_container}>
//                 <div className={styles.left}>
//                     <h1>Welcome back</h1>
//                     <Link to="/login">
//                         <button type="button" className={styles.white_btn}>
//                             Sign in
//                         </button>
//                     </Link>
//                 </div>
//                 <div className={styles.right}>
//                     <form className={styles.form_container} onSubmit={handleSubmit}>
//                         <h1>Create Account</h1>
//                         <input
//                             type="text"
//                             placeholder="First Name"
//                             name="firstName"
//                             onChange={handleChange}
//                             value={data.firstName}
//                             required
//                             className={styles.input} />
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             name="lastName"
//                             onChange={handleChange}
//                             value={data.lastName}
//                             required
//                             className={styles.input} />
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
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Signup