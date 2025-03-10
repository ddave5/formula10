export interface RaceDTO {
    id: number;
    location: string;
    seasonId: number;
    seasonYear: number;
    qualifyingStart: string;
    raceStart: string;
    sprintQualifyingStart?: string;
    sprintRaceStart?: string;
  }