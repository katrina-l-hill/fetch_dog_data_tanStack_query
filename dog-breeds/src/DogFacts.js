import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDogFacts = async () => {
    const { data } = await axios.get("https://dogapi.dog/api/v2/facts");
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
  