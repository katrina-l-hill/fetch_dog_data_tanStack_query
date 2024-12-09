import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBreedDetails = async (id) => {
    
    
    const { data } = await axios.get(`https://dogapi.dog/api/v2/breeds/${id}`);
    return data;
  };
  
  const BreedDetails = ({ breedId }) => {
    const { data, isLoading, isError } = useQuery(["breedDetails", breedId], () =>
      fetchBreedDetails(breedId)
    );
  
    if (isLoading) return <p>Loading details...</p>;
    if (isError) return <p>Error fetching breed details!</p>;
  
    const { name, description } = data.data.attributes;
  
    return (
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default BreedDetails;
  