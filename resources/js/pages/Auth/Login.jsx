import { useEffect, useState } from "react";
import Checkbox from "@/components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Controller, useForm } from "react-hook-form";
import { Head, Link } from "@inertiajs/react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { router } from "@inertiajs/react";
import Flasher from "@/components/ui/Flasher";

export default function Login({ messages, status }) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: "",
    //     password: "",
    //     remember: false,
    // });
    console.log({ status });

    const [loading, setLoading] = useState(false);

    const {
        register,
        control,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            remember: false,
            email: "",
            password: "",
        },
    });

    const onLogin = () => {
        setLoading(true);
        const body = {
            email: watch("email"),
            password: watch("password"),
            remember: watch("remember"),
        };
        router.post("/login", body);
        setLoading(false);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onLogin)}>
                <Textinput
                    name="email"
                    label="Email"
                    type="email"
                    register={register}
                    error={errors.email}
                />
                <Textinput
                    name="password"
                    label="Password"
                    type="password"
                    register={register}
                    error={errors.email}
                />

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Controller
                            control={control}
                            name="remember"
                            render={({ field: { onChange, value } }) => (
                                <Checkbox
                                    name="remember"
                                    checked={value}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                    <Button
                        isLoading={loading}
                        type="submit"
                        className="btn-dark hover:btn-outline-dark py-2"
                        text={"Login"}
                    />
                    {/* <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton> */}
                </div>
            </form>
        </GuestLayout>
    );
}
