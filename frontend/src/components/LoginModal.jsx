 import { useState } from "react";
 import * as Yup from "yup";
 import "./LoginModal.css";

 const loginSchema = Yup.object({
   email: Yup.string().email("Enter a valid email").required("Email is required"),
   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
 });

 const registerSchema = Yup.object({
   fullName: Yup.string().min(3, "Name must be at least 3 characters").required("Full name is required"),
   email: Yup.string().email("Enter a valid email").required("Email is required"),
   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
   confirmPassword: Yup.string()
     .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const initialForm = { fullName: "", email: "", password: "", confirmPassword: "" };

function LoginModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSwitch = () => {
    setIsRegister(!isRegister);
    setFormData(initialForm);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const schema = isRegister ? registerSchema : loginSchema;
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      onClose();
      // TODO: call your API here
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => (validationErrors[e.path] = e.message));
      setErrors(validationErrors);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <p className="modal-brand">Your Store</p>
        <h2 className="modal-title">
          {isRegister ? "Create an account" : "Sign in to your account"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <div className="modal-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "input-error" : ""}
              />
              {errors.fullName && <p className="error-msg">{errors.fullName}</p>}
            </div>
          )}

          <div className="modal-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="modal-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder={isRegister ? "Min. 8 characters" : "Min. 6 characters"}
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          {isRegister && (
            <div className="modal-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
            </div>
          )}

          <button type="submit" className="modal-submit">
            {isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="modal-divider">
          <hr /><span>or</span><hr />
        </div>

        <p className="modal-switch">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span onClick={handleSwitch}>
            {isRegister ? " Sign in" : " Create one"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;