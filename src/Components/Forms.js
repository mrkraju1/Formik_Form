import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (values) => {
  console.log("formik values", values);

  axios({
    method: "POST",
    url: "http://localhost:9900/formik",
    data: values,
  })
    .then(function (res) {
      console.log(res);
      alert("Successfully signed up!");
    })
    .catch(function (res) {
      console.log(res);
    });

    window.location.reload()
};

// const validate = (values) => {
//   let errors = {};

//   if (!values.name) {
//     errors.name = "Required";
//   } else if (!/^[A-Za-z]{3,20}$/i.test(values.name)) {
//     errors.name = "Invalid name";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i.test(values.email)) {
//     errors.email = "Inavlid email format";
//   }
//   if (!values.password) {
//     errors.password = "Required";
//   } else if (
//     !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i.test(
//       values.password
//     )
//   ) {
//     errors.password = "Invalid password format";
//   }

//   return errors;
// };

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required field")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid format")
    .required("Email is a required field"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match"),
    }),
});

const Forms = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  });

  // console.log("Visited fields", formik.values);

  return (
    <div>
      <form className="form-css" onSubmit={formik.handleSubmit}>
        <h2 className="font-css">Formik Form</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // To hide error msgs
            value={formik.values.name}
            autoComplete="off" // To stop suggestions
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-color">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            autoComplete="off"
            // aria-describedby="emailHelp"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-color">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-color">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-color">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forms;
