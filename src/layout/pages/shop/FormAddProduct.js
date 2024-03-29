import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProductService from "../../../service/ProductService";
import { useState } from "react";

export default function FormAddProduct({userId }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const resetMessage = () => {
        setIsSuccess(false);
        console.log(isSuccess);
    }


    const initialValues = {
        name: "",
        imageUrl: "https://www.telegraph.co.uk/content/dam/news/2023/05/23/TELEMMGLPICT000336809344_16848508364990_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=960",
        price: "",
        sale: 0,
        type: "",
        description: "",
        quantity: "",
        isActive: true,
        userId: userId,
    };


    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        imageUrl: Yup.string().required("Image URL is required"),
        price: Yup.number().required("Price is required")
            .min(0, 'Price cannot be negative'),
        sale: Yup.number().required("Sale ratio is required")
            .min(0, 'Sale percentage cannot be negative')
            .max(100, 'Sale percentage cannot surpass 100'),
        type: Yup.string().required("Type is required"),
        description: Yup.string(),
        quantity: Yup.number().required("Quantity is required")
            .min(0, 'Quantity cannot be negative'),
    });


    const handleSubmit = (values, { resetForm }) => {
        ProductService.addProduct(values)
            .then((res) => {
                console.log("add success", res.data);
                resetForm();
                setIsSuccess(true);
            }).catch((err) => { console.log("Can not add product", err) });
        console.log(values);

    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <h3>Add Product</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form onBlur={resetMessage}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">
                            Illustration photo
                        </label>
                        <Field type="text" name="imageUrl" className="form-control" />
                        <ErrorMessage name="imageUrl" component="div" className="text-danger" />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <Field type="number" name="price" className="form-control" />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>
                        <div className="col">
                            <label htmlFor="sale" className="form-label">
                                Sale Ratio
                            </label>
                            <Field type="number" name="sale" className="form-control" />
                            <ErrorMessage name="sale" component="div" className="text-danger" />
                        </div>
                        <div className="col">
                            <label htmlFor="quantity" className="form-label">
                                Quantity
                            </label>
                            <Field type="number" name="quantity" className="form-control" />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">
                            Type
                        </label>
                        <Field as="select" name="type" className="form-select">
                            <option value="">Select a type</option>
                            <option value="consumption">Consumption</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="clothes">Clothes</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <Field as="textarea" name="description" className="form-control" />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3 form-check">
                        <Field type="checkbox" name="isActive" className="form-check-input" />
                        <label htmlFor="isActive" className="form-check-label">
                            Active
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form>
            </Formik>
            {isSuccess && (<div>Added Successful</div>)}
        </div>
    );
}