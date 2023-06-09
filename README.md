# CMSC 447-04 CURD Application (HW2)
By Alex Lloyd \<<alloyd2@umbc.edu>\>

## Versions used
- `python`: 3.8.0
- `pyenv`: 2.3.11
- `pip`: 23.0.1
- `npm`: 9.6.0

## Setup notes
1. Clone/receive repo
2. Set up virtualenv with python, pyenv, pip
3. Set up npm
4. `cd back/`, install Python dependencies: `pip install flask flask-sqlalchemy`
5. Start Flask server: `python3 app.py`
6. New terminal, `cd front/`, `npm install && npm start`
7. Get taken to `localhost:3000/menu` as a result

## App usage notes
Fill out all fields in each column & then press the button beneath,
either to create a new entry, search an entry, or delete one.

- Negative numbers will be blocked everywhere.
- IDs < 1 will be blocked.
- Partial submissions will be blocked.
- Duplicate IDs will be blocked (user creation).
- Search strings are exact.
- If not found (searching/deleting), message is given.
- If found (searching), record details shall be shown.

## Design notes
**Layout:** Fanciness not requested, bare minimum CSS flex-grid.

**Database:** Persistence not requested. On Flask server start,
restarts with the default start data. SQL Alchemy utilized.

In-use database stored @ `back/instance/site.db`,
generated on Flask server start.

## Noteworthy files for grading
1. back/app.py, Flask server & database classes/handling.
3. src/App.js, routes.
2. src/Menu.css, flex-grid layouts.
4. src/Menu.js, primary front-end.

Other automatically generated HTML/CSS/JS files in `src/` from running `npx create-react-app`, gitignores, & everything in `public/` aren't important.

## Miscellaneous notes: css-select  <=3.1.0 vuln solution
https://github.com/facebook/create-react-app/issues/12132
