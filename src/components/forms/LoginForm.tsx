"use client"
import {useState} from "react";
import Link from "next/link";
import {toast} from 'react-toastify';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import Image from "next/image";

import OpenEye from "@/assets/images/icon/icon_68.svg";
import {useRouter} from "next/navigation";
import {login} from "@/app/login/actions";

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {


    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup
        .object({
            email: yup.string().required().email().label("Email"),
            password: yup.string().required().label("Password"),
        })
        .required();

    const {register, handleSubmit, reset, formState: {errors},} = useForm<FormData>({resolver: yupResolver(schema),});
    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true)
            const response  = await login(data)
            if(response?.status === 500) {
                setError(response.message)
                return
            }
            const notify = () => toast('Login successfully', {position: 'top-center'});
            notify();
        } finally {
            setIsLoading(false)
        }

        // reset();
        // router.push("/dashboard/dashboard-index")
    };

    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                        <label>Email*</label>
                        <input type="email" {...register("email")} placeholder="Youremail@gmail.com"/>
                        <p className="form_error">{errors.email?.message}</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group-meta position-relative mb-20">
                        <label>Password*</label>
                        <input type={isPasswordVisible ? "text" : "password"} {...register("password")}
                               placeholder="Enter Password" className="pass_log_id"/>
                        <span className="placeholder_icon"><span
                            className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}><Image
                            onClick={togglePasswordVisibility} src={OpenEye} alt=""/></span></span>
                        <p className="form_error">{errors.password?.message}</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                        <div>
                            {/*<input type="checkbox" id="remember" />*/}
                            {/*<label htmlFor="remember">Keep me logged in</label>*/}
                        </div>
                        <Link href="#">Forget Password?</Link>
                    </div>

                    {
                        error ? <p style={{color: "red", fontSize: 18, textAlign: "center"}}>{error}</p> : null
                    }

                </div>
                <div className="col-12">
                    <button disabled={isLoading} type="submit"
                            className="btn-two w-100 text-uppercase d-block mt-20">Login
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm