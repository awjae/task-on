export const createTodoQuery = `
  mutation CreateTodo($uuid: String!, $editKey: String!, $content: [ContentInput!]!) {
    createTodo(uuid: $uuid, editKey: $editKey, content: $content) { status }
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