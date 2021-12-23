import {

  useQuery,
  gql,
  useMutation
} from "@apollo/client";



export const Add_User = gql`
mutation SignUp($email: String!, $name: String!, $password: String!) {
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
`


export const Forgot_Password = gql`

mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    status
    message
  }
}

`

export const Verify_Otp = gql`

mutation OtpVerify_Email($token: String!, $email: String!) {
  OtpVerify_Email(token: $token, email: $email) {
    status
    message
  }
}

`

export const New_Password = gql`
mutation NewPassword($password: String!, $email: String!) {
  NewPassword(password: $password, email: $email) {
    status
    message

  }
}

`

export const Create_Report_Incident = gql`

mutation CreateReport($userId: Int!, $categoryId: Int!, $subCategory: Int!, $latitude: Float!, $longitude: Float!, $suspectName: String!, $costMoney: Int!, $incidentDate: Date!, $description: String!, $floor: Int!) {
  CreateReport(userId: $userId, CategoryId: $categoryId, SubCategory: $subCategory, latitude: $latitude, longitude: $longitude, SuspectName: $suspectName, CostMoney: $costMoney, IncidentDate: $incidentDate, Description: $description, floor: $floor) {
    status
    message
  }
}

`