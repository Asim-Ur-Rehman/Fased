import { gql } from '@apollo/client'

export const Login_User = gql`
  query LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      status
      message
      data {
        id
        email
        name
        # password
        isVerified
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
        createdAt
        CategoryId
        CategoryName
      }
    }
  }
`

export const GET_FAV_NEWS_BY_ID = gql`
query GetFavoriteByUserId($userId: Int!) {
  getFavoriteByUserId(userId: $userId) {
    data {
      News {
      createdAt
      Description
      Tagline
      Title
      Image
      id
    }
    }
    status
    message
  }
}`

export const Get_Reports = gql`
  query Query {
    getReports {
      status
      message
      data {
        createdAt
      Description
      CostMoney
      IncidentDate
      latitude
      SubCategory
      longitude
      userId
      id
      CategoryId
      SuspectName
      IncidentTime
      floor
      Category {
        BackgroundColor
        Title
      }
      }
    }
  }
`

export const FILTER_CATEGORIES = gql`
  query Query($showIds: [Int!]) {
    filterReports(showIds: $showIds) {
      status
      message
      data {
        createdAt
      Description
      CostMoney
      IncidentDate
      latitude
      SubCategory
      longitude
      userId
      id
      CategoryId
      SuspectName
      IncidentTime
      floor
      Category {
        BackgroundColor
        Title
      }
      }
    }
  }
`
export const FILTER_BY_DATE = gql`
query FilterReportsByDate($from: Date!, $to: Date!) {
  filterReportsByDate(from: $from, to: $to) {
    status
    message
    data {
      createdAt
      Description
      CostMoney
      IncidentDate
      latitude
      SubCategory
      longitude
      userId
      id
      CategoryId
      SuspectName
      IncidentTime
      floor
      Category {
        BackgroundColor
        Title
      }
    }
  }
}
`

export const GET_REASONS = gql`
query GetFlagReasons {
  getFlagReasons {
    status
    message
    data {
      createdAt
      reason
      id
    }
  }
}`
