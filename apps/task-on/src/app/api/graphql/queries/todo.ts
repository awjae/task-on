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
  mutation CreateTodo($uuid: String!, $editKey: String!, $contents: [ContentInput!]!) {
    createTodo(uuid: $uuid, editKey: $editKey, contents: $contents) { status }
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
  mutation UpdateTodo($uuid: String!) {
    updateTodo(uuid: $uuid, operations: JSON!) { status }
  }
`;
export const deleteTodoItemQuery = `
  mutation DeleteTodoItem($uuid: String!, $id: Float!) {
    deleteTodoItem(uuid: $uuid, id: $id) { status }
  }
`;