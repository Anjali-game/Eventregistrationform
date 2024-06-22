import React, { useState } from 'react';
// Ensure you have this file for styling

const Form = () => {
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        age: "",
        attendingwithguest: "No",
        guestname: ""
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        let tempErrors = {};
        if (!formdata.name) tempErrors.name = 'Name is required';
        if (!formdata.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
            tempErrors.email = 'Email is not valid';
        }
        if (!formdata.age) {
            tempErrors.age = 'Age is required';
        } else if (formdata.age <= 0) {
            tempErrors.age = 'Age must be greater than 0';
        }
        if (formdata.attendingwithguest === 'Yes' && !formdata.guestname) {
            tempErrors.guestname = 'Guest Name is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value
        });
    };

    return (
        <div className="form-container">
            <h1>Event Registration Form</h1>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                            className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formdata.age}
                            onChange={handleChange}
                            className={errors.age ? 'input-error' : ''}
                        />
                        {errors.age && <span>{errors.age}</span>}
                    </div>
                    <div className="form-group">
                        <label>Are you attending with a guest?</label>
                        <select
                            name="attendingwithguest"
                            value={formdata.attendingwithguest}
                            onChange={handleChange}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    {formdata.attendingwithguest === 'Yes' && (
                        <div className="form-group">
                            <label>Guest Name:</label>
                            <input
                                type="text"
                                name="guestname"
                                value={formdata.guestname}
                                onChange={handleChange}
                                className={errors.guestname ? 'input-error' : ''}
                            />
                            {errors.guestname && <span>{errors.guestname}</span>}
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div className="form-summary">
                    <h2>Form Submitted</h2>
                    <p>Name: {formdata.name}</p>
                    <p>Email: {formdata.email}</p>
                    <p>Age: {formdata.age}</p>
                    <p>Attending with guest: {formdata.attendingwithguest}</p>
                    {formdata.attendingwithguest === 'Yes' && (
                        <p>Guest Name: {formdata.guestname}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Form;
