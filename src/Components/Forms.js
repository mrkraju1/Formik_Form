import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const Forms = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: (values) => {
      console.log("formik values", values);

      axios({
        method: "POST",
        url: "http://localhost:9900/formik",
        data: values,
      })
        // axios
        //   .post("http://localhost:9900/formik", {
        //     values,
        //   })
        .then(function (res) {
          console.log(res);
          alert("Successfully signed up!");
          formik.setValues({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch(function (res) {
          console.log(res);
        });

      // window.location.reload()
    },

    // validate: (values) => {
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
    // },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("*Name is a required field")
        .min(3, "Name must be at least 3 characters"),
      email: Yup.string()
        .email("Invalid format")
        .required("*Email is a required field"),
      password: Yup.string()
        .required("*Please enter your password")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      confirmPassword: Yup.string()
        .required("*Please confirm your password")
        .when("password", {
          is: (password) => (password && password.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password doesn't match"
          ),
        }),
    }),
  });

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get("http://localhost:9900/formik").then((res) => {
      setAPIData(res.data.users);
    });
  };

  // const updateUser = (id) => {
  //   axios.put(`http://localhost:9900/formik/${id}`).then((res) => {

  //   });
  // };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:9900/formik/${id}`).then((res) => {
      console.log(res);
      // alert("user deleted");
      getUsers();
    });
  };

  // getUsers();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Table striped bordered hover variant="light" className="table-css">
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {APIData.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <button className="btn btn-warning me-2">
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(item._id)}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="col-md-4">
          <form className="form-css" onSubmit={formik.handleSubmit}>
            <h2 className="font-css mb-3">Formik Form</h2>
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
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-color">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        {/* <div className="col-md-3"></div> */}
      </div>
    </div>
  );
};

export default Forms;
