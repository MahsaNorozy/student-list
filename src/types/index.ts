import { Gender } from "./gender";

export interface Grade {
  courseName: string;
  date: string; // ISO-Format
  gradeValue: string;
  isPassed: boolean;
}
export interface Student {
  address: string;
  email: string;
  gender: Gender;
  grades: Grade[];
  id: number;
  matriculationNumber: string;
  name: string;
  program: string;
  semester: number;
}
