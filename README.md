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
$ npm install
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
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug 

# production mode
$ npm run start:prod
```

## Contributing Guide

[CONTRIBUTING.md](CONTRIBUTING.md).

## COC

[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

[MIT licensed](LICENSE).
