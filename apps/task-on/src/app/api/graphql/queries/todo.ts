export const createTodoQuery = `
  mutation CreateTodo($uuid: String!, $editKey: String!, $contents: [ContentInput!]!) {
    createTodo(uuid: $uuid, editKey: $editKey, contents: $contents) { status }
  }
`;
export const createTodoItemQuery = `
  mutation CreateTodoItem($uuid: String!, $contents: [ContentInput!]!) {
    createTodoItem(uuid: $uuid, contents: $contents) { status }
  }
`;
export const updateTodoItemQuery = `
  mutation UpdateCompletedTodo($uuid: String!, $id: Float!, $completed: Boolean!) {
    updateCompletedTodo(uuid: $uuid, id: $id, completed: $completed) { status }
  }
`;
export const deleteTodoItemQuery = `
  mutation DeleteTodoItem($uuid: String!, $id: Float!) {
    deleteTodoItem(uuid: $uuid, id: $id) { status }
  }
`;