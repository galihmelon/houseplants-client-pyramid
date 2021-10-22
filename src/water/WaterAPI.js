import { gql } from "@apollo/client";

export default gql`
mutation WaterPlant($plantId: ID!){
  waterPlant(plantId: $plantId) {
    wateringLog {
      plant {
        id
      }
      nextSuggestedDate
      waterDate
    }
  }
}`
