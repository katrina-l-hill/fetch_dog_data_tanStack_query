import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBreeds = async () => {
  const { data } = await axios.get("https://dogapi.dog/api/v2/breeds");
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
