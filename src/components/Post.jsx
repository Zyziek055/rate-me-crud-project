import { useState } from 'react';

function Post({ author, image, text, initialRating, comments}) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  const handleMouseEnter = (ratingValue) => {
    setHoveredRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };


  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <div className="text-lg font-bold">{author}</div>
      {image && <img src={image} alt="Post" className="w-full h-auto rounded mt-2" />}
      <p className="mt-2">{text}</p>
      <div className="mt-4 flex items-center">
        <div className="mr-2">Rating:</div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
            key={star}
            className={`cursor-pointer text-xl ${star <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-yellow-100'}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            > &#9733;
            </span>
          ))}
        </div>
        <div className="ml-4">Average Rating: {rating} stars</div>
      </div>
      <div className="mt-4">
        <div className="font-semibold">Comments:</div>
        <div className="mt-2 space-y-2">
          {comments.map((comment, index) => (
            <div key={index} className="border-t pt-2">
              <div className="font-bold">{comment.author}</div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;