import { transformResponse } from './transformResponse';

describe('transformResponse: getUserRepos', () => {
  it('transforms response', () => {
    const data = transformResponse([
      {
        id: 123,
        language: 'language',
        description: 'description',
        html_url: 'html_url',
        name: 'name',
        stargazers_count: 456,
      },
      {
        id: 678,
        language: 'language2',
        description: 'description2',
        html_url: 'html_url2',
        name: 'name2',
        stargazers_count: 901,
      },
    ]);

    expect(data).toStrictEqual([
      {
        description: 'description',
        id: 123,
        language: 'language',
        name: 'name',
        starCount: 456,
        url: 'html_url',
      },
      {
        description: 'description2',
        id: 678,
        language: 'language2',
        name: 'name2',
        starCount: 901,
        url: 'html_url2',
      },
    ]);
  });
});
