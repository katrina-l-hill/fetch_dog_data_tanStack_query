import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDogGroups = async () => {
    const { data } = await axios.get("https://dogapi.dog/api/v2/groups");
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
  