import { Gender } from "../Gender";

export type Grade = {
  courseName: string;
  date: string; // ISO-Format
  grade: string;
  passed: boolean;
};
export type Student = {
  address: string;
  email: string;
  gender: Gender;
  grades: Grade[];
  id: number;
  matriculationNumber: string;
  name: string;
  photoUrl: string;
  program: string;
  semester: number;
};
