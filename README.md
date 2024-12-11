# Recipe Recommender

> Crave it? Say it. Cook it.

## Getting Started

To start the application, you will need to run both the frontend and the backend in separate terminals.

The following steps require the installation of [Taskfile](https://taskfile.dev/), a tool that allows for better Makefiles! If you would like to follow these simplified steps, install it by going [here](https://taskfile.dev/installation/). To manually run our application, see the section called [Running without Taskfile](#running-without-taskfile)

### Running with Taskfile

**NOTE: Please remember to place the .env file submitted with the repository into the backend directory. Otherwise, the backend will not work because of required access to MongoDB and OpenAI.**

To run the frontend, first make sure that you have both `npm` and `node` installed. Then run the following:

```bash
task frontend:install
task frontend:dev # or frontend:start
```

To run the backend, first make sure you have `python3` installed. Then, run the following:

```bash
task backend:setup
task backend:dev # or backend:start
```

Alternatively, you can run both the frontend and backend at the same time with the following command:

```bash
task dev # or start
```

### Running without Taskfile

To run the frontend, first make sure that you have both `npm` and `node` installed. Then run the following from the `app` directory:

```bash
npm i
npm run dev
```

To run the backend, first make sure you have `python3` installed. Then, run the following in **a separate terminal window**, from the `backend` directory:

```bash
python3 -m venv .venv
.venv/bin/python3 -m pip install -r requirements.txt
.venv/bin/python3 -m fastapi run main.py
```
