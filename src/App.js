import { useQuery } from "@apollo/client";

import plantsToCareQuery from './common/plantsToCare.js'
import Water from './water/Water'

import './App.css';

function App() {
  const { loading, error, data } = useQuery(plantsToCareQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">Houseplants</header>
      {data && data.plantsToCare?.map((plant, i) => <Water plant={plant} key={i} /> )}
    </div>
  );
}

export default App;
