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
