interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export const PostComponent: React.FC<PostProps> = ({
  id,
  title,
  description,
  image,
  price,
}) => {
  return (
    <div
      key={id}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="max-w-md rounded mt-2 overflow-hidden shadow-lg bg-white">
        <img className="object-cover w-full" src={image} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
};
