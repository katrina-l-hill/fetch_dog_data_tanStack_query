import { useQuery } from "@tanstack/react-query";

const fetchBreeds = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/breeds");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const DogBreeds = ({ onSelectBreed }) => {
  const { data, isLoading, isError, isSuccess } = useQuery(["breeds"], fetchBreeds);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching breeds!</p>;

  return (
    <div>
      {isSuccess && <p>Breeds fetched successfully!</p>}
      <ul>
        {data.data.map((breed) => (
          <li key={breed.id} onClick={() => onSelectBreed(breed.id)}>
            {breed.attributes.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogBreeds;