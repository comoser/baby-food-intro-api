# Baby food introduction API

This API is part of the Baby Food Introduction application, which aims to help technological parents keep track of the food introductions they make for their babies.

## Motivation
I'm really forgetful, and food introduction in babies can be tricky.
When you first start introducing food at around 6 months old, you need to do it in an orderly and spaced manner.

You need to introduce one food at one given week, and then in the next week you introduce another, and so on. The problem with food introduction arises when your babies have an allergy!

When an allergy happens, you need to backtrack the food introductions you have been doing one by one.
You remove the latest one introduced and wait a week. If the baby is still not ok, you remove the previous one, and so on.

For this exact purpose, I created the Baby Food Introduction application, to help parents keep their babies food introductions in check and easily backtrackable in case of allergies!

## Installation

```bash
$ yarn install
```

## Running the app

**⚠️ Important ⚠️**

> To first start with running the API, you need to copy
> [.env.example](.env.example) to [.env](.env.docker-compose) and fill in with correct values.

> `start`, `start:dev` and `start:debug` start scripts will spin up a virtualized Postgres database before starting the API. In order to get the database going, you need to copy
> [.env.docker-compose.example](.env.docker-compose.example) to [.env.docker-compose](.env.docker-compose) with the path you
> want for the database volume to be stored in.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# debug mode
$ yarn run start:debug 

# production mode
$ yarn run start:prod
```

## Documentation

There's a [Postman collection](postman_collection.json) in the repo that allows to consume all the endpoints created.
If there are new additions to the controllers of the API, please add them to this postman collection, so that other devs have an easier life!

## Production

We are using Heroku to deploy the API and to provision the corresponding database.
There's a production API currently deployed at [https://baby-food-intro-api.herokuapp.com/api/v1](https://baby-food-intro-api.herokuapp.com/api/v1).

## Contributing Guide

[CONTRIBUTING.md](CONTRIBUTING.md).

## COC

[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://tiagomichaelsousa.dev"><img src="https://avatars.githubusercontent.com/u/28356381?v=4?s=100" width="100px;" alt="Tiago Sousa"/><br /><sub><b>Tiago Sousa</b></sub></a><br /><a href="https://github.com/comoser/baby-food-intro-api/commits?author=tiagomichaelsousa" title="Code">💻</a> <a href="https://github.com/comoser/baby-food-intro-api/commits?author=tiagomichaelsousa" title="Documentation">📖</a> <a href="#ideas-tiagomichaelsousa" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-tiagomichaelsousa" title="Tools">🔧</a> <a href="https://github.com/comoser/baby-food-intro-api/pulls?q=is%3Apr+reviewed-by%3Atiagomichaelsousa" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/dNhunter3107"><img src="https://avatars.githubusercontent.com/u/91651461?v=4?s=100" width="100px;" alt="Debasis Nayak"/><br /><sub><b>Debasis Nayak</b></sub></a><br /><a href="https://github.com/comoser/baby-food-intro-api/commits?author=dNhunter3107" title="Documentation">📖</a> <a href="#tool-dNhunter3107" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/comoser"><img src="https://avatars.githubusercontent.com/u/5495320?v=4?s=100" width="100px;" alt="David Alecrim"/><br /><sub><b>David Alecrim</b></sub></a><br /><a href="https://github.com/comoser/baby-food-intro-api/commits?author=comoser" title="Code">💻</a> <a href="https://github.com/comoser/baby-food-intro-api/commits?author=comoser" title="Documentation">📖</a> <a href="#ideas-comoser" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-comoser" title="Maintenance">🚧</a> <a href="https://github.com/comoser/baby-food-intro-api/pulls?q=is%3Apr+reviewed-by%3Acomoser" title="Reviewed Pull Requests">👀</a> <a href="#tool-comoser" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT licensed](LICENSE).
