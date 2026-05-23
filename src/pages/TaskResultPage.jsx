import { ChevronLeft, FileText, Link2, Paperclip } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import TaskSuccessBanner from "../features/mission/components/TaskSuccessBanner";
import ResultScoreBoard from "../features/mission/components/ResultScoreBoard";
import SkillBreakdown from "../features/mission/components/SkillBreakdown";
import PerformanceFeedback from "../features/mission/components/PerformanceFeedback";
import ResultActions from "../features/mission/components/ResultActions";

const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));

const countWords = (value = "") =>
  value.trim().split(/\s+/).filter(Boolean).length;

const getSubmissionAnswers = (submission) => {
  const data = submission?.data || {};
  const payload = data.submissionPayload || data;

  if (Array.isArray(data.answers) && data.answers.length) {
    return data.answers.map((answer, index) => ({
      title: answer.title || `Reflection ${index + 1}`,
      question: answer.question || "",
      answer: answer.answer || "",
    }));
  }

  return [payload.answer1, payload.answer2, payload.answer3]
    .map((answer, index) => ({
      title: `Reflection ${index + 1}`,
      question: "",
      answer: answer || "",
    }))
    .filter((answer) => answer.answer);
};

const getEvidence = (submission) => {
  const data = submission?.data || {};
  const payload = data.submissionPayload || data;

  return {
    figmaLink: data.evidence?.figmaLink || payload.figmaLink || "",
    fileUrl: data.evidence?.fileUrl || payload.fileUrl || "",
    fileName: data.evidence?.fileName || "",
    fileSize: data.evidence?.fileSize || 0,
  };
};

const getRating = (score) => {
  if (score >= 90) return "Outstanding Submission";
  if (score >= 75) return "Strong Submission";
  if (score >= 60) return "Complete Submission";
  return "Needs More Detail";
};

const buildResultData = (submission) => {
  const answers = getSubmissionAnswers(submission);
  const evidence = getEvidence(submission);
  const answerCount = answers.length || 1;
  const completedAnswers = answers.filter((item) => item.answer.trim()).length;
  const totalWords = answers.reduce((total, item) => total + countWords(item.answer), 0);
  const averageWords = totalWords / answerCount;
  const hasEvidence = Boolean(evidence.figmaLink || evidence.fileUrl || evidence.fileName);
  const completionScore = (completedAnswers / answerCount) * 45;
  const detailScore = Math.min(averageWords / 35, 1) * 40;
  const evidenceScore = hasEvidence ? 15 : 0;
  const score = clampScore(completionScore + detailScore + evidenceScore);
  const rating = getRating(score);

  const whatYouDidWell = [
    completedAnswers === answerCount && "All required reflection answers are completed.",
    averageWords >= 15 && "Your answers include enough detail to understand your thinking.",
    evidence.figmaLink && "You included a Figma link as supporting evidence.",
    (evidence.fileName || evidence.fileUrl) && "You attached supporting work for this task.",
  ].filter(Boolean);

  if (!whatYouDidWell.length) {
    whatYouDidWell.push("You submitted the task and started documenting your work.");
  }

  const areasToImprove = [
    averageWords < 15 && "Add more specific reasoning, decisions, and examples in each essay.",
    !hasEvidence && "Add a Figma link or supporting file so the work can be reviewed directly.",
    totalWords < 45 && "Expand the reflection with concrete steps you took and what you learned.",
  ].filter(Boolean);

  if (!areasToImprove.length) {
    areasToImprove.push("Keep connecting your design choices to user goals and task requirements.");
  }

  return {
    answers,
    evidence,
    feedback: { whatYouDidWell, areasToImprove },
    result: {
      score,
      stars: Math.max(1, Math.ceil(score / 20)),
      rating,
      summary: `${completedAnswers} of ${answerCount} reflections completed with ${totalWords} total words${
        hasEvidence ? " and supporting evidence attached." : "."
      }`,
    },
    skills: [
      {
        name: "Reflection Completeness",
        value: clampScore((completedAnswers / answerCount) * 100),
      },
      {
        name: "Depth of Explanation",
        value: clampScore(Math.min(averageWords / 35, 1) * 100),
      },
      {
        name: "Evidence Provided",
        value: hasEvidence ? 100 : 35,
      },
      {
        name: "Task Readiness",
        value: score,
      },
    ],
  };
};

function SubmissionSummary({ answers, evidence }) {
  const hasFigmaLink = Boolean(evidence.figmaLink);
  const hasFile = Boolean(evidence.fileName || evidence.fileUrl);

  return (
    <section className="w-full space-y-5">
      <h2 className="text-(--color-primary) font-bold text-2xl">
        Your Submission
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border border-(--color-primary) rounded-3xl p-6 bg-(--color-surface)">
          <div className="flex items-center gap-3 mb-4">
            <Link2 size={20} />
            <h3 className="font-bold text-lg">Work Evidence</h3>
          </div>

          <div className="space-y-3 text-sm lg:text-base">
            {hasFigmaLink ? (
              <a
                href={evidence.figmaLink}
                target="_blank"
                rel="noreferrer"
                className="block break-all underline underline-offset-4 hover:opacity-70"
              >
                {evidence.figmaLink}
              </a>
            ) : (
              <p className="text-(--color-primary)/70">No Figma link submitted.</p>
            )}

            {hasFile ? (
              <div className="flex items-center gap-2 text-(--color-primary)">
                <Paperclip size={18} />
                <span className="break-all">
                  {evidence.fileName || evidence.fileUrl}
                </span>
              </div>
            ) : (
              <p className="text-(--color-primary)/70">No file attached.</p>
            )}
          </div>
        </div>

        <div className="border border-(--color-primary) rounded-3xl p-6 bg-(--color-primary)/5">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={20} />
            <h3 className="font-bold text-lg">Answer Summary</h3>
          </div>
          <p className="text-sm lg:text-base font-medium text-(--color-primary)/80">
            {answers.length} reflection answer{answers.length === 1 ? "" : "s"} saved from your task submission.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {answers.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="border border-(--color-primary)/60 rounded-3xl p-6 bg-(--color-surface)"
          >
            <p className="text-sm font-bold text-(--color-primary)/70 mb-2">
              {item.title}
            </p>
            {item.question && (
              <h3 className="font-bold text-lg text-(--color-heading-dark) mb-3">
                {item.question}
              </h3>
            )}
            <p className="whitespace-pre-wrap text-sm lg:text-base leading-relaxed text-(--color-primary)/90">
              {item.answer || "No answer submitted."}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TaskResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const storedSubmission = (() => {
    try {
      return JSON.parse(localStorage.getItem("lastTaskSubmission"));
    } catch {
      return null;
    }
  })();
  const submission = location.state?.submission || storedSubmission;
  const resultData = buildResultData(submission);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-13 text-(--color-primary) space-y-6">
        <button
          className="flex items-center gap-2 text-base font-semibold hover:opacity-70 cursor-pointer"
          onClick={() => navigate("/daily-mission")}
        >
          <ChevronLeft size={18} />
          <span>Back to Daily Mission</span>
        </button>
        <TaskSuccessBanner submission={submission} />
        <ResultScoreBoard result={resultData.result} />
        <SubmissionSummary
          answers={resultData.answers}
          evidence={resultData.evidence}
        />
        <PerformanceFeedback feedback={resultData.feedback} />
        <ResultActions />
        <SkillBreakdown skills={resultData.skills} />
      </main>
      <Footer />
    </>
  );
}

export default TaskResultPage;
