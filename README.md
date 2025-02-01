```markdown
# Quiz Application

A React-based quiz application where users can answer questions, get real-time feedback, and view their score after completing the quiz.

## Features
- Fetches quiz questions dynamically from an API.
- Users can answer questions within a 15-second timer.
- Displays a progress bar to show quiz completion.
- Prevents submission without selecting an answer.
- Displays a summary screen with the total correct/incorrect answers and the final score.

## Prerequisites

- Node.js (version >= 20.x)
- A running backend API to fetch quiz questions and submit answers (e.g., a RESTful API).
- A `.env` file to store environment variables for your API base URL.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/jimmyptl-jer/pm.git
cd client

cd api
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root of the project and add the following environment variable:

```bash
VITE_API_BASE_URL=http://localhost:5173

MONGO_URI= ""
```

### 4. Running the Application

To start the development server, use the following command:

```bash
npm run dev
```

This will start the application locally. By default, it will run on [http://localhost:7000](http://localhost:7000).

### 5. Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This will generate a `dist` folder with the optimized production files.


## API Endpoints

Ensure that your backend API has the following endpoints:

- **GET `/api/quiz`**: Fetches a list of quiz questions.
- **POST `/api/quiz/submit`**: Submits an answer for a specific quiz question. Requires the following JSON body:
  
  ```json
  {
    "answer": "selected_answer",
    "questionId": "question_id"
  }
  ```

## Project Structure

Here is the basic structure of the project:

```
/quiz-app
│
├── /public                   # Public files (e.g., index.html)
├── /src                      # Source code files
│   ├── /api                  # API calls for quiz data
│   ├── /components           # React components (e.g., QuizPage, ProgressBar)
│   ├── /pages                # Pages of the app (e.g., Home, Quiz)
│   └── index.tsx             # Entry point for the app
│
├── .env                       # Environment variables
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

### Key Components

- **`QuizPage`**: Displays the quiz question and options. Users can select an answer and submit it. Also handles the timer and progress.
- **`ProgressBar`**: Shows the user's progress through the quiz.
- **`quizApi.tsx`**: Contains the API calls to fetch quiz questions and submit answers.


## License

This project is licensed under the MIT License.

```
