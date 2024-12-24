import Post from '../components/Post';

function HomePage() {
  const samplePost = {
    author: 'Zyziek055',
    image: '../../example-post-photo.jpg',
    text: 'Oceńcie czy kotek grzecznie siedzi',
    rating: 4,
    comments: [
      { author: 'Oliwia', text: 'Super grzecznie' },
    ],
  };

  return (
    <div className="h-screen bg-[rgb(100,100,100)]">
      <nav className="bg-[rgb(50,100,100)] text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">RATe Me</div>
        <div className="flex space-x-4">
          <button className="bg-white text-[rgb(50,100,100)] px-4 py-2 rounded hover:bg-blue-100">
            Login
          </button>
          <button className="bg-white text-[rgb(50,100,100)] px-4 py-2 rounded hover:bg-blue-100">
            Register
          </button>
        </div>
      </nav>

      <div className="p-4">
        {/* Add post button */}
        <button className="bg-white text-[rgb(50,100,100)] px-6 py-2 rounded hover:bg-blue-100">
          Post something!
        </button>

       <div className="mt-6 space-y-4">
          <Post {...samplePost} />
        </div>
      </div>

    </div>
  );
}

export default HomePage;