import {

  gql,
} from "@apollo/client";


export const Login_User = gql`

query SignIn($email: String, $password: String) {
  loginUser(email: $email, password: $password) {
    message
  status
    data {
      id
      email
      isVerified
    password
    name
    }
  }
}


`


