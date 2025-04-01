import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('All fields are required');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email format');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/loginCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Logged in user:', data.user);
                navigate('/dashboardCustomer');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred while logging in. Please try again.');
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f8f8f6]">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-[#636363]">
                <h2 className="text-2xl font-bold text-center text-[#0b0c0e] mb-6">Customer Login</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[#222222] font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-[#636363] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc323f]"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-[#222222] font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-[#636363] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc323f]"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#dc323f] text-white py-2 rounded-lg hover:bg-[#a91e2b] transition-all"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-[#636363] mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-[#dc323f] hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default CustomerLogin;