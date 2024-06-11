# Learner Data Processor

This JavaScript project processes and validates learner assignment submissions for a course, calculates their scores, and computes averages.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Examples](#examples)

## Description

This project includes a function that takes in course information, assignment details, and learner submissions. It validates the dates and scores of the submissions, processes them to compute individual assignment scores, and calculates the average score for each learner.

## Features

- **Date Validation**: Ensures that the submission and due dates are in the correct `YYYY-MM-DD` format and are valid dates.
- **Score Processing**: Calculates individual assignment scores and deducts points for late submissions.
- **Average Calculation**: Computes the average score for each learner based on their assignment scores.
- **Error Handling**: Provides error messages for invalid data such as incorrect date formats, invalid possiable points or mismatched course IDs.

## Setup

1. Clone the repository or download the `index.js` file.
2. Ensure you have Node.js installed to run the JavaScript code.

## Usage

1. Include your course, assignment group, and learner submissions data in the respective objects.
2. Run the script using Node.js:

   ```bash
   node index.js
   ```

3. The results will be logged in the console.

## Examples

### Input Example

Below is an example of valid input data for `CourseInfo`, `AssignmentGroup`, and `LearnerSubmissions`:

```javascript
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
];
```

### Output Example

For the above input, the output will be:

```[
  {
    ID: 125,
    Average: "1.000",
    "Assignment 1": "0.940",
    "Assignment 2": "1.000"
  }
]
```

### Erroneous Input Example 1 - Invalid date format

```
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "25-01-2023", // Invalid date format
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
];
```

### Erroneous Output Example 1 - Invalid date format

```
Warning: The date format should be YYYY-MM-DD.
Please verify and correct your Date for Declare a Variable
Error detected.
```

### Erroneous Input Example 2 - Mismatched course ID

```
const CourseInfo = {
  id: 451, // Course ID
  name: "Introduction to JavaScript",
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 999, // Mismatched course ID
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
];
```

### Erroneous Output Example 2 - Mismatched course ID

```
Warning: Course ID Mismatch. Please verify and correct your Course ID for Introduction to JavaScript.
Error detected.
```

### Erroneous Input Example 3 - Invalid possible points

```
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 0, // Invalid possible points
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
  ],
};
```

### Erroneous Output Example 3 - Invalid possible points

```
Warning: Invalid Possible Points. Please verify and correct the Possible Points for Assignment Declare a Variable.
Error detected.
```
