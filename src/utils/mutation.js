import {

    useQuery,
    gql,
    useMutation
} from "@apollo/client";



export const Add_User = gql`
mutation SignUp($email: String!, $name: String, $password: String) {
  addUser(email: $email, name: $name, password: $password) {
    data {
      id
      email
      name
      password
      isVerified
    }
    status
    message
  }
}
`;