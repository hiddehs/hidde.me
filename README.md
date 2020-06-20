# hidde.me
hidde.me personal site @ 2020



## Git Contribution Converter

The Git contribution converter fetches all commits from diffrent GitHub and GitLab repositories and combines them in a date-based datamodel.

To fetch a fresh cache for the GitLab repositories / instances, run:

```bash
yarn gitlab_convert_1
yarn gitlab_convert_2
```

To fetch from `.env` configured GitLab instances `GITLAB_BASE_URL_1` & `GITLAB_BASE_URL_2`

## Configuration

```bash
cp .env.example .env
```
| Env. Variable         | Description                                                                          |
| :-------------------- | :----------------------------------------------------------------------------------- |
| `PRISMIC_ACCESS_TOKEN`  | Token used in `lib/prismicApolloClient.js` for static-prop GraphQL content fetching. |
| `GITHUB_ACCESS_TOKEN`   | Token used in `lib/githubApolloClient.js` for fetching contributions.                |
| `GITLAB_ACCESS_TOKEN_1` | Token 1 used in `lib/gitlabApiClient.js` for fetching contributions.                 |
| `GITLAB_ACCESS_TOKEN_2` | Token 2 used in  `lib/githubApolloClient.js`  for fetching contributions.            |
| `GITLAB_BASE_URL_1`     | Url 1 for GitLab instance 1                                                          |
| `GITLAB_BASE_URL_2`     | Url 2 for GitLab instance 2                                                          |
