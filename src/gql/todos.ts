import { gql } from "@apollo/client";
export const GET_TODOS_CARDS_DATA = gql`
  #graphql
  query temp($filterBy: FilterBy, $sortBy: SortBy) {
    todos(filterBy: $filterBy, sortBy: $sortBy) {
      id
      title
      due_date
      status
      priority
    }
  }
`;

export const GET_TODO_BY_ID = gql`
  #graphql
  query TodoById($id: ID) {
    todoById(id: $id) {
      title
      description
      due_date
      created_at
      status
      priority
    }
  }
`;

export const UPDATE_TODO = gql`
  #graphql
  mutation UpdateTodo(
    $id: ID!
    $title: String!
    $description: String!
    $due_date: String!
    $status: Status!
    $priority: Priority!
  ) {
    updateTodo(
      id: $id
      title: $title
      description: $description
      due_date: $due_date
      status: $status
      priority: $priority
    ) {
      message
    }
  }
`;

export const DELETE_TODO = gql`
  #graphql
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      message
    }
  }
`;

export const ADD_TODOS = gql`
  #graphql

  mutation CreateTodo(
    $title: String!
    $description: String!
    $due_date: String!
    $status: Status!
    $priority: Priority!
  ) {
    createTodo(
      title: $title
      description: $description
      due_date: $due_date
      status: $status
      priority: $priority
    ) {
      message
    }
  }
`;
