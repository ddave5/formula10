import { CurrentSeasonConstructorStainding, CurrentSeasonDriverStanding } from "../interfaces/groupHome/currentSeason";
import ergastClient from "./ergast-axios";

export const currentSeasonStanding = async (season: number): Promise<CurrentSeasonDriverStanding[]> => {
    try {
      const response = await ergastClient.get(`${season}/driverStandings.json`);
  
      // Adatok kinyerése és átalakítása
      const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  
      const formattedStandings = standings.filter( (standings: any) => 
        Array.from({ length: 5 }, (_, index) => (index + 8).toString()).includes(standings.position)
      ).map((standing: any) => ({
        position: parseInt(standing.position),
        driver: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
        points: parseInt(standing.points),
      }));
  
      return formattedStandings;
  
    } catch (error) {
      console.error("Failed to fetch standings:", error);
      throw error;
    }
};

export const currentSeasonConstuctorStanding = async (season: number): Promise<CurrentSeasonConstructorStainding[]> => {
    try {
        const response = await ergastClient.get(`${season}/constructorStandings.json`);
    
        const standings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    
        const formattedStandings = standings.filter( (standings: any) => 
            Array.from({ length: 5 }, (_, index) => (index + 6).toString()).includes(standings.position)
        ).map((standing: any) => ({
          position: parseInt(standing.position),
          constructor: `${standing.Constructor.name}`,
          points: parseInt(standing.points),
        }));
    
        return formattedStandings;
    
    } catch (error) {
        console.error("Failed to fetch standings:", error);
        throw error;
    }
};