import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      matriculationNumber
    }
  }
`;

export const GET_STUDENT = gql`
  query GetStudent($id: Int!) {
    student(id: $id) {
      id
      name
      email
      address
      program
      semester
      gender
      matriculationNumber
      grades {
        courseName
        gradeValue
        date
        isPassed
      }
    }
  }
`;
