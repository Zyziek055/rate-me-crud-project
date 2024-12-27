import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, content, image });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-[rgb(50,100,100)] text-white p-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">RATe Me</Link>
                </div>
            </nav>
            {/* Page Content */}
            <div className="container mx-auto mt-10 p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Post</h2>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Post Content</label>
                        <textarea
                            id="content"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Post Image</label>
                        <input
                            type="file"
                            id="image"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;