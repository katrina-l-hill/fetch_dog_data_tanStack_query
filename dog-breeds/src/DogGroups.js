import { useQuery } from "@tanstack/react-query";

const fetchDogGroups = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/groups");
  if (!response.ok) {
    throw new Error("Failed to fetch dog groups");
  }
  const data = await response.json();
  return data;
};

const DogGroups = () => {
  const { data, isLoading, isError } = useQuery(["dogGroups"], fetchDogGroups);

  if (isLoading) return <p>Loading groups...</p>;
  if (isError) return <p>Error fetching groups!</p>;

  return (
    <ul>
      {data.data.map((group) => (
        <li key={group.id}>{group.attributes.name}</li>
      ))}
    </ul>
  );
};

export default DogGroups;