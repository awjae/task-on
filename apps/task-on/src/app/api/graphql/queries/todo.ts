export const readTodoQuery = `
  query ReadTodo($uuid: String!) {
    readTodo(uuid: $uuid) {
      data {
        uuid
        contents {
          id
          text
          completed
        }
      }
    }
  }
`;
export const createTodoQuery = `
  mutation CreateTodo($uuid: String!, $contents: [ContentInput!]!) {
    createTodo(uuid: $uuid, contents: $contents) { status }
  }
`;
export const createTodoItemQuery = `
  mutation CreateTodoItem($uuid: String!, $content: ContentInput!) {
    createTodoItem(uuid: $uuid, content: $content) { status }
  }
`;
export const updateTodoItemQuery = `
  mutation UpdateCompletedTodo($uuid: String!, $id: Float!, $completed: Boolean!) {
    updateCompletedTodo(uuid: $uuid, id: $id, completed: $completed) { status }
  }
`;
export const updateTodoQuery = `
  mutation UpdateTodo($uuid: String!, $operations: JSON!) {
    updateTodo(uuid: $uuid, operations: $operations) { status data { isShared } }
  }
`;
export const deleteTodoItemQuery = `
  mutation DeleteTodoItem($uuid: String!, $id: Float!) {
    deleteTodoItem(uuid: $uuid, id: $id) { status }
  }
`;