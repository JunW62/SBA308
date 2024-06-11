// Function to check if the date is in YYYY-MM-DD format and if it is a valid date.
function checkDateFormat(dateString) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  // Check if the date string matches the date format
  if (!dateFormat.test(dateString)) {
    console.warn("Warning: The date format should be YYYY-MM-DD.");
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  // Verify if the date components match the input components
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    console.warn("Warning: The date is not valid.");
    return false;
  }

  return true;
}
// Function to process learner data and calculate assignment scores and averages
function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  try {
    // Ensure the course ID matches
    if (AssignmentGroup.course_id === CourseInfo.id) {
      let result = [];
      let learnerData = []; // Array to store processed learner data

      // Iterate through each submission
      for (let i = 0; i < submissions.length; i++) {
        learnerId = submissions[i].learner_id;
        assignementId = submissions[i].assignment_id;
        submissionDate = submissions[i].submission.submitted_at;
        score = submissions[i].submission.score;

        // Check the date format of submission date
        if (checkDateFormat(submissionDate) == false) {
          throw `Please verify and correct your Date for ${ag.assignments[i].name}`;
        } else {
          // Validate assignment data
          let exist = false;
          for (let j = 0; j < ag.assignments.length; j++) {
            if (ag.assignments[j].id == assignementId) {
              exist = true;
              PointsPossible = ag.assignments[j].points_possible;

              // Ensure the assignment has possible points
              if (PointsPossible > 0) {
                DueDate = ag.assignments[j].due_at;

                // Check the date format of due date
                if (checkDateFormat(DueDate) == false) {
                  throw `Please verify and correct your Date for ${ag.assignments[j].name}`;
                } else {
                  break;
                }
              } else {
                throw `Warning: Invalid Possiable Points. \nPlease verify and correct the Possiable Points for Assignment ${ag.assignments[j].name}.`;
              }
            }
          }
        }
        // Create assignment score object
        let assignementScore = {
          "Assignment ID": assignementId,
          "Assignment Score": score,
          "Submission Date": submissionDate,
          "Possible Points": PointsPossible,
          "Due Date": DueDate,
        };

        // Check if the learner data already exists
        exist = false;
        let existingIndex = 0;
        let existingAssignmentScore = null;
        for (let k = 0; k < learnerData.length; k++) {
          existingId = learnerData[k].id;
          existingAssignmentScore = learnerData[k].assignment;
          if (existingId == learnerId) {
            exist = true;
            existingIndex = k;
            break;
          }
        }

        // If learner exists, update their assignment scores
        if (exist) {
          if (
            assignementScore["Submission Date"] > assignementScore["Due Date"]
          ) {
            assignementScore["Assignment Score"] =
              assignementScore["Assignment Score"] -
              0.1 * assignementScore["Possible Points"];
          }

          // Skip assignments due after the day I finished this code
          if (assignementScore["Due Date"] > "2024-06-10") {
            continue;
          }
          existingAssignmentScore.push(assignementScore);
          learnerData[existingIndex].assignment = existingAssignmentScore;
        } else {
          // Add new learner data
          learnerData.push({
            id: learnerId,
            assignment: [assignementScore],
          });
        }
      }
      // console.log(learnerData);
      // console.log(learnerData[0].assignment);
      // console.log(learnerData[1].assignment);

      // Calculate averages and create result objects
      for (let n = 0; n < learnerData.length; n++) {
        obj = {};
        obj["ID"] = learnerData[n].id;
        assignments = learnerData[n].assignment;
        totalScore = 0;
        totalPossibleScore = 0;
        for (let m = 0; m < assignments.length; m++) {
          totalScore += assignments[m]["Assignment Score"];
          totalPossibleScore += assignments[m]["Possible Points"];
        }
        avg = (totalScore / totalPossibleScore).toFixed(3);
        obj["Average"] = avg;
        for (let m = 0; m < assignments.length; m++) {
          totalScore += assignments[m]["Assignment Score"];
          totalPossibleScore += assignments[m]["Possible Points"];
          obj["Assigment " + assignments[m]["Assignment ID"]] = (
            assignments[m]["Assignment Score"] /
            assignments[m]["Possible Points"]
          ).toFixed(3);
        }
        result.push(obj);
      }
      return result;
    } else {
      throw `Warning: Course ID Mismatch. \nPlease verify and correct your Course ID for ${CourseInfo.name}.`;
    }
  } catch (error) {
    console.log(error);
    return "Error detected.";
  }
}
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0, // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833, // late: (140 - 15) / 150
//   },
// ];
// return result;}

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
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
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
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
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
