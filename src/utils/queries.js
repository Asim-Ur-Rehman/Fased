import {

    gql,
} from "@apollo/client";


export const Login_User = gql`

 query Query($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      message
    status
    }
  }


`


