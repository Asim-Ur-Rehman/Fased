import { useQuery, gql, useMutation } from '@apollo/client'

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

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $changePasswordId: Int!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      id: $changePasswordId
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      status
      message
    }
  }
`

export const Create_Report_Incident = gql`
  mutation CreateRepor($categoryId: Int!, $latitude: Float!, $longitude: Float!, $suspectName: String!, $costMoney: String!, $incidentDate: Date!, $incidentTime: String!, $description: String!, $floor: Int!, $subCategoryId: Int, $userId: Int) {
  CreateReport(CategoryId: $categoryId, latitude: $latitude, longitude: $longitude, SuspectName: $suspectName, CostMoney: $costMoney, IncidentDate: $incidentDate, IncidentTime: $incidentTime, Description: $description, floor: $floor, subCategoryId: $subCategoryId, userId: $userId){
      status
      message
    }
  }
`
export const Create_Report_Incident_without_SubCat = gql`
  mutation CreateReport(
    $userId: Int
    $categoryId: Int!
    $latitude: Float!
    $longitude: Float!
    $suspectName: String!
    $costMoney: String!
    $description: String!
    $floor: Int!
    $incidentDate: Date!
    $incidentTime: String!
  ) {
    CreateReport(
      userId: $userId
      CategoryId: $categoryId
      latitude: $latitude
      longitude: $longitude
      SuspectName: $suspectName
      CostMoney: $costMoney
      Description: $description
      floor: $floor
      IncidentDate: $incidentDate
      IncidentTime: $incidentTime
    ) {
      status
      message
    }
  }
`

export const ADD_TO_FAV = gql`
  mutation AddToFavorite($userId: Int!, $newsId: Int!) {
    addToFavorite(userId: $userId, newsId: $newsId) {
      status
      message
      data {
        createdAt
        newsId
        userId
        id
        News {
          id
          Image
          Title
          Tagline
          Description
        }
      }
    }
  }
`

export const SOCIAL_LOGIN = gql`
  mutation SocialMediaLogin(
    $providerId: String!
    $registrationType: String!
    $name: String
    $email: String
    $fcmToken: String
  ) {
    socialMediaLogin(
      providerId: $providerId
      registrationType: $registrationType
      name: $name
      email: $email
      fcmToken: $fcmToken
    ) {
      status
      message
      data {
        id
        email
        name
        password
        isVerified
        providerId
        registrationType
        createdAt
      }
    }
  }
`

export const FLAG_REPORT = gql`
  mutation CreateFlagReport(
    $reason: String!
    $reasonId: Int!
    $userId: Int!
    $reportId: Int!
  ) {
    CreateFlagReport(
      reason: $reason
      reasonId: $reasonId
      userId: $userId
      reportId: $reportId
    ) {
      status
      message
    }
  }
`
