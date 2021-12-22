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

export const Get_Categories = gql`

query Query {
  getCategories {
    status
    message
    data {
      id
      Image
      Title
      Description
      BackgroundColor
    }
  }
}

`

export const Get_News = gql`
query Query {
  getNews {
    status
    message
    data {
      id
      Image
      Title
      Tagline
      Description
    }
  }
}

`