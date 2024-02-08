interface Question {
    [question: string]: string[] | string;
    id: string;
    answers: string[];
}

interface Questionnaire {
    questions: Question[];
}

interface Path {
    questionId: string;
    answers: Answer[];
}

interface Answer {
    questionId: string;
    answer: string;
}

const questionnaire: Questionnaire = {
    questions: [
        {"What is your marital status?": ["Single", "Married"], id: "START", answers: ["A1", "B1"]},
        {"Are you planning on getting married next year?": ["Yes", "No"], id: "A1", answers: ["END", "END"]},
        {"How long have you been married?": ["Less than a year", "More than a year"], id: "B1", answers: ["END", "B2"]},
        {"Have you celebrated your one year anniversary?": ["Yes", "No"], id: "B2", answers: ["B3", "END"]},
        {"Have you celebrated your one year anniversary?": ["Yes", "No"], id: "B3", answers: ["END", "END"]}
    ]
};

function traversePaths(questionnaire: Question[], currentPath: Path): Path[] {
    const paths: Path[] = [];
    const currentQuestion = questionnaire.find(q => q.id === currentPath.questionId);
    if (!currentQuestion) return paths;

    const allEndAnswers = currentQuestion.answers.every(answer => answer === "END");
    if (allEndAnswers) {
        paths.push(currentPath);
        return paths;
    }

    // If there's only one answer that doesn't lead to "END", treat "END" as a separate path
    if (currentQuestion.answers.length === 2 && currentQuestion.answers.includes("END")) {
        const nonEndAnswer = currentQuestion.answers.find(answer => answer !== "END")!;
        const nonEndPath: Path = {
            questionId: nonEndAnswer,
            answers: [...currentPath.answers, { questionId: currentQuestion.id, answer: getAnswerValue(currentQuestion, nonEndAnswer) }]
        };
        const nonEndPaths = traversePaths(questionnaire, nonEndPath);
        paths.push(...nonEndPaths);

        const endPath: Path = {
            questionId: "END",
            answers: [...currentPath.answers, { questionId: currentQuestion.id, answer: "END" }]
        };
        paths.push(endPath); // Only push the "END" path, no need to traverse further
        return paths;
    }

    // Standard traversal for questions with multiple answers
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const nextQuestionId = currentQuestion.answers[i];
        const nextPath: Path = {
            questionId: nextQuestionId,
            answers: [...currentPath.answers, { questionId: currentQuestion.id, answer: getAnswerValue(currentQuestion, nextQuestionId) }]
        };
        const nextPaths = traversePaths(questionnaire, nextPath);
        paths.push(...nextPaths);
    }

    return paths;
}

// Helper function to get answer value from question
function getAnswerValue(question: Question, answerId: string): string {
    const answer = question[answerId];
    if (typeof answer === "string") {
        
        return answer;
    } else if (Array.isArray(answer)) {
        return answer[0]; // Assuming the first value of the array represents the answer
    }
    return answer;
}
// Loop outside the function
const initialPath: Path = { questionId: "START", answers: [] };
const allPaths = traversePaths(questionnaire.questions, initialPath);

// Output all paths with selected answers

interface result{
    paths:{
        numberOfPaths:0,
        list:Object[]
    }
}

let resArr:result = { paths:{
    numberOfPaths:0,
    list:[]
}};


console.log("All paths:");
allPaths.forEach(path => {
   resArr.paths.list.push(path)
   resArr.paths.numberOfPaths++;
});
console.log(resArr!);
