import React, { useState } from 'react';

const Form = () => {
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        age: "",
        attendingwithguest: "",
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
            tempErrors.guestname = 'Guest Name is required'; // Corrected key to match the input field name
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
        
        <div>
            <h1 > Event Registration Form </h1>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formdata.age}
                            onChange={handleChange}
                        />
                        {errors.age && <span>{errors.age}</span>}
                    </div>
                    <div>
                        <label>Are you attending with a guest?</label>
                        <select
                            name="attendingwithguest" // Corrected the name to match the formdata key
                            value={formdata.attendingwithguest}
                            onChange={handleChange}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    {formdata.attendingwithguest === 'Yes' && (
                        <div>
                            <label>Guest Name:</label>
                            <input
                                type="text"
                                name="guestname" // Corrected the name to match the formdata key
                                value={formdata.guestname}
                                onChange={handleChange}
                            />
                            {errors.guestname && <span>{errors.guestname}</span>} {/* Corrected key to match the error key */}
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <h2>Form Submitted</h2>
                    <p>Name: {formdata.name}</p>
                    <p>Email: {formdata.email}</p>
                    <p>Age: {formdata.age}</p>
                    <p>Attending with guest: {formdata.attendingwithguest}</p> {/* Corrected key to match the formdata key */}
                    {formdata.attendingwithguest === 'Yes' && (
                        <p>Guest Name: {formdata.guestname}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Form;
