import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComplaintPage.css';

const ComplaintPage = () => {
    const [complaint, setComplaint] = useState('');
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState(''); // State for user email
    const navigate = useNavigate();
    const BASE_URL = "https://healthy-snacks-website-backend.onrender.com";

    // Fetch the username and email from the backend using the token
    useEffect(() => {
        const authToken = localStorage.getItem('auth-token');

        if (authToken) {

            fetch(`${BASE_URL}/getuser`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`, // Correctly set the Authorization header
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUsername(data.user.name);
                    setUserEmail(data.user.email); // Assuming backend returns the email
                } else {
                    navigate('/login'); // Redirect to login if not successful
                }
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
                navigate('/login'); // Redirect to login on error
            });
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!complaint) {
            alert('Please enter a complaint');
            return;
        }

        const complaintData = {
            username,
            complaint,
            email: userEmail, // Include the email here
            submittedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch(`${BASE_URL}/complaints`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`, // Include the token correctly
                },
                body: JSON.stringify(complaintData),
            });

            const responseData = await response.json(); // Parse response to JSON

            if (response.ok) {
                alert('Complaint submitted successfully! We will get back to you soon through your Mail Id, Or you can reach out to us through our WhatsApp');
                setComplaint(''); // Clear the form
            } else {
                alert(`Failed to submit complaint: ${responseData.error || responseData.message}`); // Show error message from backend
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('An error occurred while submitting the complaint');
        }
    };

    return (
        <div className="complaint-page">
            <h2>Submit a Complaint</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} readOnly />
                </label>
                <label>
                    <h2>Your Complaint:</h2>
                    <textarea
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                        placeholder="Describe your issue here..."
                        required
                    />
                </label>
                <button type="submit">Submit Complaint</button>
            </form>
        </div>
    );
};

export default ComplaintPage;
