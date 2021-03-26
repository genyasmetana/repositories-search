import {
  PAGINATION_REPOSITORIES_SUCCESS,
  SEARCH_REPOSITORIES_START,
  SEARCH_REPOSITORIES_SUCCESS,
  UPDATE_REPOSITORY_SUCCESS,
} from '../action-types'

const initialState = {
  loading: true,
  data: {
    nodes: [],
    pageInfo: {
      endCursor: '',
      startCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_REPOSITORIES_START:
      return {
        ...state,
        loading: true,
      }

    case PAGINATION_REPOSITORIES_SUCCESS:
      return {
        ...state,
        data: {
          nodes: [...state.data.nodes, ...action.payload.nodes],
          pageInfo: action.payload.pageInfo,
        },
        loading: false,
      }

    case SEARCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }

    case UPDATE_REPOSITORY_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          nodes: action.payload,
        },
        loading: false,
      }

    default:
      return {
        ...state,
        loading: false,
      }
  }
}
