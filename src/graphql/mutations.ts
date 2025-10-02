import { gql } from "@apollo/client";

export const ADD_STUDENT = gql`
  mutation AddStudent($input: StudentInput!) {
    addStudent(input: $input) {
      id
      name
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

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: Int!, $input: StudentInput!) {
    updateStudent(id: $id, input: $input) {
      id
      name
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
