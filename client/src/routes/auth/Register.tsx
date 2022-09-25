import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../features/user/userSlice';
import { useAppDispatch } from '../../store/hook';
import { RegisterDto } from '../../typings/auth';
import { RegisterSchema } from '../../validation/auth';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      userId: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values: RegisterDto) => {
      setLoading(true);
      dispatch(
        register({
          ...values,
        }),
      )
        .unwrap()
        .then(() => {
          setLoading(false);
          navigate('/auth/login');
        })
        .catch((err) => {
          setLoading(false);
        });
    },
  });
  return (
    <div className="flex flex-col w-[350px] h-[400px] items-center backdrop-blur-sm p-4">
      <h2 className="text-3xl text-white bold font-black">회원가입</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-white font-bold">
              닉네임
            </label>
            <input
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="ex) 음잘알123"
              className="w-full h-[40px] px-4 text-white bg-black rounded-md"
            />
            {formik.errors.username && (
              <label className="text-red-300">{formik.errors.username}</label>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="userId" className="text-white font-bold">
              아이디
            </label>
            <input
              id="userId"
              onChange={formik.handleChange}
              value={formik.values.userId}
              placeholder="아이디"
              className="w-full h-[40px] px-4 text-white bg-black rounded-md"
            />
            {formik.errors.userId && (
              <label className="text-red-300">{formik.errors.userId}</label>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white font-bold">
              패스워드
            </label>
            <input
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              placeholder="패스워드"
              className="w-full h-[40px] px-4 text-white bg-black rounded-md"
            />
            {formik.errors.password && (
              <label className="text-red-300">{formik.errors.password}</label>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 flex items-center justify-center text-white font-black h-[50px] hover:opacity-50"
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-200 animate-spin fill-green-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              '회원가입'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
