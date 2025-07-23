import React from 'react';
import { useForm } from 'react-hook-form';
import LoginAuth from './API/loginAPI';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from '../utils/loader2';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { submitData, isSubmitting, } = LoginAuth();

    useEffect(() => {
        Aos.init({
            duration: 500,
            easing: "ease-out",
            once: true,

        });
    }, []);
    
    return (
        <div className='bg-white md:bg-gray-300 min-h-screen w-screen flex items-center justify-center overflow-hidden'>
            <div className="p-10 rounded-md md:bg-white max-w-md w-full mx-4 md:mx-auto shadow-2xl shadow-black/50 "
                data-aos="fade-down">
                <form onSubmit={handleSubmit(submitData)}>
                    <div className='flex justify-center'>
                        <img src="/images/KCERA.png"
                            alt=""
                            className='min-h-15 max-h-20 mx-auto' />
                    </div>
                    <h2 className="text-base/10  font-bold text-gray-900  uppercase text-center mb-2">Login your Account</h2>
                    <div className="flex flex-col gap-4">
                        <TextField
                            {...register("email", { required: "Email is required" })}
                            variant="outlined"
                            type="email"
                            fullWidth
                            label="Email"
                            size="small"
                            placeholder='johnDoe@example.com'
                        />
                        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                        <TextField
                            {...register("password", { required: "Password is required" })}
                            variant="outlined"
                            type="password"
                            fullWidth
                            label="Password"
                            size="small"
                        />
                        {errors.password && <p className="text-red-700">{errors.password.message}</p>}

                        <Button type="submit" variant="contained" size="small" fullWidth>
                            {isSubmitting ? 'logging in' : "Login"}
                        </Button>

                        <p className="text-center">
                            Don't have an account? <a href="./Registration" className="text-sky-500">Register</a>
                        </p>

                    </div>
                </form>
            </div>
            {isSubmitting ? <Loading /> : ''}
        </div>
    );
};

export default Login;