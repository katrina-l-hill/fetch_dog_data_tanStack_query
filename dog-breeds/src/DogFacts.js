import { useQuery } from "@tanstack/react-query";

const fetchDogFacts = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/facts");
  if (!response.ok) {
    throw new Error("Failed to fetch dog facts");
  }
  const data = await response.json();
  return data;
};

const DogFacts = () => {
  const { data, isLoading, isError } = useQuery(["dogFacts"], fetchDogFacts);

  if (isLoading) return <p>Loading facts...</p>;
  if (isError) return <p>Error fetching facts!</p>;

  return (
    <ul>
      {data.data.map((fact, index) => (
        <li key={index}>{fact.attributes.fact}</li>
      ))}
    </ul>
  );
};

export default DogFacts;