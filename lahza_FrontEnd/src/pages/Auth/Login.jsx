// /* eslint-disable no-unused-vars */
// import Checkbox from "../../Components/Checkbox";
// import InputError from "../../Components/InputError";
// import InputLabel from "../../Components/InputLabel";
// import PrimaryButton from "../../Components/PrimaryButton";
// import TextInput from "../../Components/TextInput";
// import FormField from "../../Components/Form/FormField";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// export default function Login({ status, canResetPassword }) {
//   const [submitting, setSubmitting] = useState(false);

//   // const { data, setData, processing, errors } = useForm({
//   //   email: "",
//   //   password: "",
//   //   remember: false,
//   // });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "john.doe@example.com",
//       password: "Password123!",
//       remember: true,
//     },
//   });

//   const submit = (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     console.log("data is submitted ");
//   };

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row h-screen min-h-screen">
//         {/* Left - Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-12 min-h-screen lg:min-h-0">
//           <div className="w-full max-w-md mx-auto">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
//               Connexion
//             </h2>

//             {status && (
//               <div className="mb-4 text-sm font-medium text-green-600 text-center ">
//                 {status}
//               </div>
//             )}

//             <form onSubmit={submit} className="space-y-4">
//               <div>
//                 <InputError message={errors.email} className="mt-2" />
//                 <FormField
//                   id="email"
//                   type="email"
//                   label="Adresse email"
//                   value={register.email}
//                   onChange={(e) => setValue("email", e.target.value)}
//                   errors={errors}
//                 />
//               </div>

//               <div>
//                 <InputError message={errors.email} className="mt-2" />
//                 <FormField
//                   id="passsword"
//                   type="passsword"
//                   label="passsword"
//                   value={register.password}
//                   onChange={(e) => setValue("password", e.target.value)}
//                   errors={errors}
//                 />
//                 <InputError message={errors.password} className="mt-2" />
//               </div>

//               <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
//                 <label
//                   className="flex items-center cursor-default"
//                   htmlFor="remember_me"
//                 >
//                   <Checkbox
//                     name="remember"
//                     checked={register.remember}
//                     onChange={(e) => setValue("remember", e.target.checked)}
//                     id="remember_me"
//                   />
//                   <span className="ml-2 text-sm text-gray-600 select-none">
//                     Se souvenir de moi
//                   </span>
//                 </label>
//                 {canResetPassword && (
//                   <Link
//                     href={"/request_password"}
//                     className="text-sm text-gray-600 underline hover:text-gray-900"
//                   >
//                     Mot de passe oublié ?
//                   </Link>
//                 )}

//                 <Link
//                   href={"/register"}
//                   className="text-sm text-gray-600 underline hover:text-gray-900"
//                 >
//                   Vous n'avez pas de compte ?
//                 </Link>
//               </div>

//               <div className="flex justify-center">
//                 <PrimaryButton
//                   className="w-full text-center justify-center mt-2"
//                   disabled={submitting}
//                 >
//                   Connexion
//                 </PrimaryButton>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Right - Image */}
//         <div className="w-1/2 hidden lg:block">
//           <div
//             className="h-full w-full bg-cover bg-center"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

/* eslint-disable no-unused-vars */
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ status, canResetPassword }) {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const watchedValues = watch();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(";").shift());
    }
    return null;
  }
  const onSubmit = async (data) => {
    setSubmitting(true);
    console.log("data submitted", data);

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const res = await axios.post("http://localhost:8000/api/login", data, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
      });
      console.log("your are logged in ");
      navigate("/dashboard");
    } catch (error) {
      console.log("login error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex h-screen w-full p-4 rounded-2xl flex-col items-center justify-center lg:flex-row">
      {/* Left - Form */}
      <div className="bg-white flex w-full items-center justify-center px-6 sm:w-1/2 sm:px-12">
        <div className="w-full max-w-md">
          <h2 className="text-gray-900 mb-6 text-center text-3xl font-bold">
            Connexion
          </h2>

          {status && (
            <div className="text-green-600 mb-4 text-center text-sm font-medium">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <InputLabel htmlFor="email" value="Adresse email" />
              {/* <TextInput
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused
              /> */}
              <TextInput
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                value={watch("email")} // 👈 track value manually
                onChange={(e) => setValue("email", e.target.value)} // 👈 update RHF
                className="mt-1 block w-full"
                autoComplete="email"
                isFocused
              />
              <InputError message={errors.email?.message} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="password" value="Mot de passe" />
              <TextInput
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                value={watch("password")} // 👈 track value manually
                onChange={(e) => setValue("password", e.target.value)} // 👈 update RHF
                className="mt-1 block w-full"
                autoComplete="password"
                isFocused
              />
              <InputError message={errors.password?.message} className="mt-2" />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                className="flex cursor-pointer items-center"
                htmlFor="remember"
              >
                <input
                  type="checkbox"
                  id="remember"
                  {...register("remember")}
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500 rounded shadow-sm"
                />
                <span className="text-gray-600 ml-2 select-none text-sm">
                  Se souvenir de moi
                </span>
              </label>

              <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                {canResetPassword && (
                  <Link
                    to="/forgot-password"
                    className="text-gray-600 hover:text-gray-900 text-sm underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                )}

                <Link
                  to="/register"
                  className="text-gray-600 hover:text-gray-900 text-sm underline"
                >
                  Vous n'avez pas de compte ?
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <PrimaryButton
                type="submit"
                className="mt-2 w-full justify-center text-center"
                disabled={submitting}
              >
                {submitting ? "Connexion..." : "Connexion"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
      {/* Right - Image */}
      <div className="w-1/2 hidden lg:block">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
      </div>
      ;
    </div>
  );
}
