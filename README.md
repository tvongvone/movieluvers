## TONYFLIX

TONYFLIX is a netflix inspired website where you can view popular and upcoming films.

Here is the livelink! [TONYFLIX](https://movieluvers.onrender.com)

## Wiki
- [Feature List](https://github.com/tvongvone/movieluvers/wiki/Feature-list)
- [User Stories](https://github.com/tvongvone/movieluvers/wiki/User-Stories)
- [Database Schema](https://github.com/tvongvone/movieluvers/wiki/Database-Schema)

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Database:**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Hosting:**

![Render](https://img.shields.io/badge/Render-informational?style=for-the-badge&logo=render&logoColor=%5bdec3)

## Run Locally
### HTTPS
```bash
  git clone https://github.com/tvongvone/movieluvers.git
```

### SSH
```bash
  git clone git@github.com:tvongvone/movieluvers.git
```

Install dependencies

```bash
pip install -r requirements.txt &&
flask db upgrade &&
flask seed all
```

```bash
cd react-app
npm install --prefix react-app
```

Start the server

```bash
pipenv run flask run
```

In seperate terminal

```bash
cd react-app
npm start
```

## Landing Page

![project_pic png](https://user-images.githubusercontent.com/107327260/230163426-0cc11ae3-193f-42d5-b3fc-5a70ac453ed1.png)

## Technical Challenges

Trying to fetch videos from an external api by passing in the id that came with the movie that I seeded in the backend. The external api returns a array of videos so I write conditionals to set the trailer state to the Official trailer if it exists 
      
    const fetchVideo = async () => {

        const data = await dispatch(getSingleMovie(id))

        if(data) {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${data.apiId}/videos?api_key=${API_KEY}&language=en-US`)

            if(response?.data?.results?.find(ele => ele.name === 'Official Trailer')) {
                setTrailer(response.data.results.find(ele => ele.name === 'Official Trailer'))
            } else if (response.data.results.length){
                setTrailer(response.data.results[response.data.results.length - 1])
            } else {
                setTrailer('')
            }
        }
    }
