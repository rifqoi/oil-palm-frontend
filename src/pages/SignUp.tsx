import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useToken from "../hooks/useToken";
import { API_URL } from "../libs/config";

interface FormData {
  username: string;
  name: string;
  password: string;
  validatePassword: string;
}

async function signUp(name: string, username: string, password: string) {
  const url = `${API_URL}/api/v1/auth/signup`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      username: username,
      password: password,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  return response;
}

const SignUpScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const password = watch("password");
  const [token, setToken] = useToken();

  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: FormData) => {
    signUp(data.name, data.username, data.password)
      .then((response: Response) => {
        if (!response.ok) {
          console.log(response.json());
          setError("username", {
            message: "Username already exists",
            type: "custom",
          });
          return;
        }
        navigate("/login");
      })
      .catch((e) => {
        const errors = e as Response;
        if (!errors.ok) {
          setError("username", {
            message: "Username already exists",
            type: "custom",
          });
        }
      });
  };

  return (
    <>
      <Navbar center={true}></Navbar>
      <div className="my-20 flex min-h-screen flex-col">
        <div className="mx-auto mt-4 w-full max-w-3xl rounded-md border-brightRed  bg-gray-50 p-8 md:border ">
          <form
            action=""
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-xl font-medium text-gray-800  ">
              Create your account
            </div>

            {/* Name */}
            <div>
              <label
                className={`block text-sm font-bold text-gray-400 ${
                  errors.name
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name here..."
                className={`mt-1 w-full rounded  border p-2 focus:outline-0 ${
                  errors.name
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-sm font-bold text-gray-400 ${
                  errors.username
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your email here..."
                className={`mt-1 w-full rounded  border p-2 focus:outline-0 ${
                  errors.username
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  // pattern: {
                  // 	value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,63})$/,
                  // 	message: "Email is invalid",
                  // },
                })}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className={`block text-sm font-bold text-gray-400 ${
                  errors.password
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                className={`mt-1 w-full rounded border border-brightRed p-2 focus:outline-0 ${
                  errors.password
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be greater than 8.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be lesser than 20.",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Password must contains one lowercase, one uppercase, one number, and one special characters.",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Validate Password */}
            <div>
              <label
                className={`block text-sm font-bold text-gray-400 ${
                  errors.validatePassword
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                className={`mt-1 w-full rounded border border-brightRed p-2 focus:outline-0 ${
                  errors.validatePassword
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("validatePassword", {
                  validate: (val: string) => {
                    if (password !== val) {
                      return "Password do not match!";
                    }
                  },
                })}
              />
              {errors.validatePassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.validatePassword.message}
                </p>
              )}
            </div>
            <div>
              <button className="w-full rounded-md bg-brightRed py-2 px-4 text-sm text-white hover:bg-brightRedLight">
                Register
              </button>
            </div>
          </form>
          <div className=" text-md ml-2 mt-5 text-gray-600">
            Already have an account?
            <span>
              <a href="/login" className="text-blue-500">
                &nbsp;Login here
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpScreen;
