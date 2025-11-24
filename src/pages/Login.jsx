import { Form } from '../components/ui/form';
import logo from '../assets/logo.svg';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from './auth/auth-schema/login-schema';
import FormTextInput from '../components/FormTextInput';
import { Link } from 'react-router-dom';

export default function Login({ setShowLogin, setShowSignup }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const {
    formState: { isDirty },
    reset,
    getValues,
  } = form;

  function onSubmit(data) {
    console.log("User Login Data:", data);
    alert(`Welcome ${data.Email}!`);
    reset(getValues());
  }

  return (
    <div className="absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] my-15 z-[9999] bg-white/95 backdrop-blur-md text-gray-900 shadow-2xl rounded-xl border border-gray-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white m-auto w-[420px] max-sm:w-[340px] overflow-y-auto rounded-xl border border-gray-200 p-0.5 shadow-md relative"
          style={{ scrollbarWidth: 'none' }}
        >
         

          {/* العنوان */}
          <div className="p-8 pb-6">
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="Logo" className="w-20 h-20" />
              <h1 className="mb-1 mt-2 text-xl font-semibold text-gray-900">
                Login to Stratify
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! login to continue
              </p>
            </div>

            {/* مدخلات النموذج */}
            <div className="gap-3 flex flex-col">
              <FormTextInput
                form={form}
                label={"Email"}
                name={"Email"}
                placeholder="name@gmail.com"
              />
              <FormTextInput
                form={form}
                label={"Password"}
                name={"Password"}
              />

              <button
                type="submit"
                className={`${
                  isDirty
                    ? "cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                    : "cursor-not-allowed bg-blue-600 text-white"
                } w-full h-10 rounded px-4 mt-3 font-semibold transition`}
              >
                Log In
              </button>
            </div>

            {/* Sign in with Google */}
            <div className="mt-5">
              <button
                type="button"
                className="hover:bg-gray-100 flex w-full h-12 cursor-pointer items-center justify-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.98em"
                  height="1em"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  ></path>
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>

          {/* التسجيل */}
          <div className="bg-gray-50 rounded-b border-t border-gray-200 p-3">
            <p className="text-gray-700 text-center text-sm">
              Don't have an account?
              <Link
               to="/CreateAccountForm"
                type="button"
                className="text-blue-600 hover:underline bg-transparent px-2 cursor-pointer"
                onClick={() => {
                  setShowSignup(true);
                  setShowLogin(false);
                }}
              >
                Create account
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
