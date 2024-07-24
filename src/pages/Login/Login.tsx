import logo from "../../assets/logo/logo.png"
import { useAuth } from '../../components/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const onSubmit = async (values: { email: any; password: any; }) => {
    const { email, password } = values;
    if (!email || !password) {
      return { email: t("inputErrorEmpty"), password: t("inputErrorEmpty") };
    }
    const success = await login(email, password);
    if (success) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } else {
      return { [FORM_ERROR]: t("inputErrorFailed") };
    }
  };

  return (
    <div className="w-1/4 mt-20 mx-auto">
      <img src={logo} className="mx-auto size-40 mb-10 rounded-full" alt='logo' />
      <div className="h-80 bg-white border border-blue-200 shadow-xl shadow-blue-200 rounded">
        <div className="my-10 w-11/12 mx-auto">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitError }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mx-auto">
                  <label className="left">{t("inputEmail")}</label>
                  <Field name="email">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="text"
                          className="border border-blue-200 shadow-sm h-10 text-lg w-full"
                        />
                        {meta.touched && meta.error && (
                          <span className="text-red-500 font-semibold">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="flex flex-col mx-auto my-5">
                  <label>{t("inputPassword")}</label>
                  <Field name="password">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="password"
                          className="border border-blue-200 shadow-sm h-10 text-2xl w-full"
                        />
                        {meta.touched && meta.error && (
                          <span className="text-red-500 font-semibold">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <div style={{ minHeight: '24px' }}>
                    {submitError && (
                      <p className="text-red-500 font-semibold">{submitError}</p>
                    )}
                  </div>
                </div>
                <div className="mb-10 mt-10 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-800 h-10 w-20 rounded text-white hover:bg-white hover:text-black hover:border hover:border-black">
                    {t("login")}
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;