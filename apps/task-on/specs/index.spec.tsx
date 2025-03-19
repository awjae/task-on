import { render } from '@testing-library/react';
import Page from '../src/app/[locale]/page';
import { MockedProvider } from '@apollo/react-testing';
import { gql } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

const todosQuery = gql`
  query ReadTodo($uuid: String!) {
    readTodo(uuid: $uuid) {
      data {
        uuid
        editKey
        content {
          id
          text
          completed
        }
      }
    }
  }
`;


const mocks = [
  {
    request: {
      query: todosQuery,
      variables: { uuid: '1234-5678' },
    },
    result: {
      data: {
        readTodo: {
          data: {
            uuid: '1234-5678',
            editKey: 'my-secret-key',
            content: [
              { id: 1, text: '할 일 1', completed: false },
              { id: 2, text: '할 일 2', completed: true },
            ],
          },
        },
      },
    },
  },
];

describe('Page', () => {
  it('should render successfully', () => {
    const theme = createTheme({
      palette: {
        taskOn: {
          mintGreen: '#74d3ae',
          oliveGreen: '#678d58',
          lightGreen: '#a6c48a',
          lightYellow: '#f6e7cb',
          lightRed: '#dd9787',
        },
      },
    });

    const { baseElement } = render(
      <MockedProvider mocks={ mocks }>
        <ThemeProvider theme={ theme }>
          <Page />
        </ThemeProvider>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
