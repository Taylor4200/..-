"use client";
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { createClient } from "@/utils/supabase/client";

interface FormData {
    user_name: string;
    user_email: string;
    message: string;
    title: string;
}

const schema = yup
    .object({
        user_name: yup.string().required().label("Name"),
        user_email: yup.string().required().email().label("Email"),
        message: yup.string().required().label("Message"),
        title: yup.string().required().label("Title"),
    })
    .required();

const ContactForm = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

    const form = useRef<HTMLFormElement>(null);
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendEmail = async (formDetails: FormData) => {

        if (form.current) {
            setIsLoading(true);
            const { data, error, status } = await supabase
                .from('support')
                .insert({
                    name: formDetails.user_name,
                    message: formDetails?.message,
                    email: formDetails?.user_email,
                    title: formDetails?.title
                });

            console.log({ data, error, status });
            if (status === 201) {
                const notify = () => toast('Message sent successfully', { position: 'top-center' });
                notify();
                reset();
            }
        } else {
            console.error("Form reference is null");
        }

        setIsLoading(false);
    };

    return (
        <form ref={form} onSubmit={handleSubmit(sendEmail)}>
            <h3>Send Message</h3>
            <div className="messages"></div>
            <div className="row controls">
                <div className="col-12">
                    <div className="input-group-meta form-group mb-30">
                        <label htmlFor="">Name*</label>
                        <input type="text" {...register("user_name")} name="user_name" placeholder="Your Name*" />
                        <p className="form_error">{errors.user_name?.message}</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group-meta form-group mb-30">
                        <label htmlFor="">Email*</label>
                        <input type="email" {...register("user_email")} placeholder="Email Address*" name="user_email" />
                        <p className="form_error">{errors.user_email?.message}</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group-meta form-group mb-40">
                        <label htmlFor="">Title*</label>
                        <input type="text" {...register("title")} name="title" placeholder="Title*" />
                        <p className="form_error">{errors.title?.message}</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group-meta form-group mb-35">
                        <textarea {...register("message")} placeholder="Your message*"></textarea>
                        <p className="form_error">{errors.message?.message}</p>
                    </div>
                </div>
                <div className="col-12">
                    <button
                        disabled={isLoading}
                        type='submit'
                        className="btn-nine text-uppercase rounded-3 fw-normal w-100"
                        style={{
                            backgroundColor: '#000', // Black background
                            color: '#fff',           // White text color
                            border: 'none',          // Remove any border if present
                            padding: '0.75em 1.5em', // Adjust padding as needed
                            fontSize: '1rem',        // Ensure font size matches the rest
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
