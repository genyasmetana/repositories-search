import gql from 'graphql-tag'
import queryString from 'query-string'

import {
  PAGINATION_REPOSITORIES_SUCCESS,
  SEARCH_REPOSITORIES_FAILED,
  SEARCH_REPOSITORIES_START,
  SEARCH_REPOSITORIES_SUCCESS,
  UPDATE_REPOSITORY_SUCCESS,
} from '../action-types'
import { client } from '../../../config/apollo'

export const searchRepositoriesListAction = (searchString, newPage) => async (dispatch, state) => {
  const queryParams = queryString.parse(window.location.search)
  const after = queryParams.page || newPage

  const query = gql`
    query SearchRepositories($query: String!, $after: String) {
      search(first: 10, query: $query, type: REPOSITORY, after: $after) {
        nodes {
          ... on Repository {
            id
            url
            name
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `

  const variables = {
    query: searchString,
    after,
  }

  dispatch({ type: SEARCH_REPOSITORIES_START })

  try {
    const { data } = await client.query({ query, variables })
    if (variables.after === null) {
      dispatch({
        type: SEARCH_REPOSITORIES_SUCCESS,
        payload: data.search,
      })
    } else {
      dispatch({
        type: PAGINATION_REPOSITORIES_SUCCESS,
        payload: data.search,
      })
    }
  } catch (e) {
    dispatch({ type: SEARCH_REPOSITORIES_FAILED })
    console.log(e)
  }
}

export const updateRepositoryAction = (data) => (dispatch, getState) => {
  const state = getState()
  const combineRepoList = state.repositoriesList.data.nodes.map((item) => {
    if (item.id === data.id) {
      return data
    }
    return item
  })

  dispatch({
    type: UPDATE_REPOSITORY_SUCCESS,
    payload: combineRepoList,
  })
}
