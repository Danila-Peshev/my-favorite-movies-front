import logo from "../../assets/logo/logo.png";
import { useAuth } from "../../global-components/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Field, Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import InputField from "./InputField";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const onSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const success = await login(email, password);
    if (success) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } else {
      return { [FORM_ERROR]: t("inputErrorFailed") };
    }
  };

  const validateField = (value: string) =>
    value ? undefined : t("inputErrorEmpty");

  return (
    <div className="w-1/4 mt-20 mx-auto">
      <img
        src={logo}
        className="mx-auto size-40 mb-10 rounded-full"
        alt="logo"
      />
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          submitError,
          hasValidationErrors,
          submitting,
          pristine,
        }) => (
          <form
            className="h-80 bg-white border border-blue-200 shadow-xl shadow-blue-200 rounded"
            onSubmit={handleSubmit}
          >
            <div className="my-10 w-11/12 mx-auto">
              <Field
                name="email"
                component={InputField}
                typeField="text"
                label={t("inputEmail")}
                validate={validateField}
              />
              <Field
                name="password"
                component={InputField}
                typeField="password"
                label={t("inputPassword")}
                validate={validateField}
              />
              <div>
                {submitError && (
                  <p className="text-red-500 font-semibold">{submitError}</p>
                )}
              </div>
              <div className="mb-10 flex justify-end">
                <button
                  type="submit"
                  disabled={hasValidationErrors || submitting || pristine}
                  className="bg-blue-800 h-10 w-20 rounded text-white hover:bg-white hover:text-black hover:border hover:border-black disabled:bg-gray-500"
                >
                  {t("login")}
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
