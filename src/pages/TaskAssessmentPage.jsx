import { useEffect, useRef, useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import AssessmentProgress from "../features/mission/components/AssessmentProgress";
import AssessmentForm from "../features/mission/components/AssessmentForm";
import MissionRewardCard from "../features/mission/components/MissionRewardCard";
import HeaderMission from "../components/ui/HeaderMission";
import { useNavigate, useParams } from "react-router-dom";
import missionService from "../features/mission/services/missionService";
import { getApiErrorMessage } from "../services/api";

const scrollToPageTop = () => {
  window.setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

const MIN_ESSAY_LENGTH = 10;

const getFirstValue = (items, key) =>
  Object.values(items).find((item) => item?.[key])?.[key] || "";

const getDraftStorageKey = (taskId) => `careerbytes-task-draft-${taskId}`;

const readStoredDraft = (taskId) => {
  if (!taskId) return null;

  try {
    const storedDraft = localStorage.getItem(getDraftStorageKey(taskId));
    return storedDraft ? JSON.parse(storedDraft) : null;
  } catch {
    localStorage.removeItem(getDraftStorageKey(taskId));
    return null;
  }
};

const buildSubmissionPayload = (answers, figmaLinks, uploadedFiles) => ({
  figmaLink: Object.values(figmaLinks).find(Boolean) || "",
  fileUrl: getFirstValue(uploadedFiles, "fileUrl"),
  answer1: answers.answer1 || "",
  answer2: answers.answer2 || "",
  answer3: answers.answer3 || "",
});

const buildAnswerEntries = (tasks, answers) =>
  tasks.map((task, index) => {
    const questionKey = task?.id || index;

    return {
      id: questionKey,
      title: task?.taskName || `Reflection ${index + 1}`,
      question: task?.description || task?.submission?.essay?.label || "",
      answer: answers[questionKey] || "",
    };
  });

const getFirstFile = (uploadedFiles) =>
  Object.values(uploadedFiles).find((file) => file?.name || file?.fileUrl) || null;

const enrichSubmissionResponse = (response, context) => ({
  ...response,
  message: response?.message || "Task berhasil di-submit!",
  data: {
    ...(response?.data || {}),
    taskId: response?.data?.taskId || context.taskId,
    taskTitle: response?.data?.taskTitle || context.taskDetail?.title || "Daily Mission Task",
    roadmapLevelId:
      response?.data?.roadmapLevelId || context.roadmapLevelId || context.taskDetail?.roadmapLevelId,
    category: context.taskDetail?.role,
    difficulty: context.taskDetail?.level,
    duration: context.taskDetail?.estimateTime,
    answers: context.answerEntries,
    evidence: {
      figmaLink: context.payload.figmaLink,
      fileUrl: context.payload.fileUrl,
      fileName: context.file?.name || "",
      fileSize: context.file?.size || 0,
    },
    submittedAt: new Date().toISOString(),
    submissionPayload: context.payload,
  },
});

const buildFallbackSubmission = ({
  taskDetail,
  taskId,
  roadmapLevelId,
  payload,
  answerEntries,
  file,
  apiErrorMessage,
}) => ({
  success: false,
  message:
    "Submit belum terkirim ke server. Jawabanmu tetap ditampilkan agar bisa dicek ulang.",
  data: {
    taskId,
    taskTitle: taskDetail?.title || "Daily Mission Task",
    roadmapLevelId,
    category: taskDetail?.role,
    difficulty: taskDetail?.level,
    duration: taskDetail?.estimateTime,
    answers: answerEntries,
    evidence: {
      figmaLink: payload.figmaLink,
      fileUrl: payload.fileUrl,
      fileName: file?.name || "",
      fileSize: file?.size || 0,
    },
    submittedAt: new Date().toISOString(),
    apiErrorMessage,
    submissionPayload: payload,
  },
});

function TaskAssessmentPage() {
  const { roadmapLevelId, taskId } = useParams();
  const [taskDetail, setTaskDetail] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [figmaLinks, setFigmaLinks] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [workMethods, setWorkMethods] = useState({});
  const [answerErrors, setAnswerErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const uploadedFileUrlsRef = useRef([]);
  const hasHydratedDraftRef = useRef(false);
  const navigate = useNavigate();

  const tasks = taskDetail?.assessment?.tasks || [];
  const currentQuestion = tasks[currentQuestionIndex];
  const currentQuestionKey = currentQuestion?.id || currentQuestionIndex;
  const isLastQuestion = currentQuestionIndex === tasks.length - 1;
  const currentAnswer = answers[currentQuestionKey] || "";

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) {
        setError("Task tidak ditemukan. Buka task dari halaman Daily Mission.");
        setLoading(false);
        return;
      }

      try {
        const response = await missionService.getTaskDetail(taskId);
        setTaskDetail(response.data);
      } catch (error) {
        setError(getApiErrorMessage(error, "Failed to fetch task detail"));
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  useEffect(() => {
    if (!taskId) return;

    hasHydratedDraftRef.current = false;
    const storedDraft = readStoredDraft(taskId);
    if (!storedDraft) {
      hasHydratedDraftRef.current = true;
      return;
    }

    setAnswers(storedDraft.answers || {});
    setFigmaLinks(storedDraft.figmaLinks || {});
    setUploadedFiles(storedDraft.uploadedFiles || {});
    setWorkMethods(storedDraft.workMethods || {});
    setCurrentQuestionIndex(storedDraft.currentQuestionIndex || 0);
    hasHydratedDraftRef.current = true;
  }, [taskId]);

  useEffect(() => {
    scrollToPageTop();
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!tasks.length) return;

    setCurrentQuestionIndex((prevIndex) =>
      Math.min(Math.max(prevIndex, 0), tasks.length - 1)
    );
  }, [tasks.length]);

  useEffect(() => {
    if (!taskId || !hasHydratedDraftRef.current) return;

    const timeoutId = window.setTimeout(() => {
      const draft = {
        answers,
        figmaLinks,
        uploadedFiles,
        workMethods,
        currentQuestionIndex,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(getDraftStorageKey(taskId), JSON.stringify(draft));
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [
    answers,
    currentQuestionIndex,
    figmaLinks,
    taskId,
    uploadedFiles,
    workMethods,
  ]);

  useEffect(() => {
    const uploadedFileUrls = uploadedFileUrlsRef.current;

    return () => {
      uploadedFileUrls.forEach((fileUrl) => {
        if (fileUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(fileUrl);
        }
      });
    };
  }, []);

  const handleAnswerChange = (event) => {
    const nextValue = event.target.value;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionKey]: nextValue,
    }));

    if (nextValue.trim().length >= MIN_ESSAY_LENGTH) {
      setAnswerErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        delete nextErrors[currentQuestionKey];
        return nextErrors;
      });
    }
  };

  const handleFigmaLinkChange = (event) => {
    setFigmaLinks((prevLinks) => ({
      ...prevLinks,
      [currentQuestionKey]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    uploadedFileUrlsRef.current.push(fileUrl);

    setUploadedFiles((prevFiles) => {
      const previousFile = prevFiles[currentQuestionKey];
      if (previousFile?.fileUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previousFile.fileUrl);
      }

      return {
        ...prevFiles,
        [currentQuestionKey]: {
          name: file.name,
          size: file.size,
          type: file.type,
          fileUrl,
        },
      };
    });
  };

  const handleFileRemove = () => {
    setUploadedFiles((prevFiles) => {
      const previousFile = prevFiles[currentQuestionKey];
      if (previousFile?.fileUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previousFile.fileUrl);
      }

      const nextFiles = { ...prevFiles };
      delete nextFiles[currentQuestionKey];
      return nextFiles;
    });
  };

  const handleWorkMethodChange = (method) => {
    setWorkMethods((prevMethods) => ({
      ...prevMethods,
      [currentQuestionKey]: method,
    }));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setDraftMessage("Draft saved");
    scrollToPageTop();
  };

  const validateEssay = (
    question = currentQuestion,
    questionKey = currentQuestionKey,
    action = "lanjut"
  ) => {
    if (!question?.submission?.essay) return true;

    const answer = (answers[questionKey] || "").trim();
    const errorMessage = !answer
      ? `Isi essay terlebih dahulu sebelum ${action}.`
      : answer.length < MIN_ESSAY_LENGTH
        ? `Tulis jawaban minimal ${MIN_ESSAY_LENGTH} karakter sebelum ${action}.`
        : "";

    if (!errorMessage) return true;

    setAnswerErrors((prevErrors) => ({
      ...prevErrors,
      [questionKey]: errorMessage,
    }));
    setDraftMessage("");
    return false;
  };

  const validateAllEssays = () => {
    const firstInvalidIndex = tasks.findIndex((task, index) => {
      const questionKey = task?.id || index;
      return (
        task?.submission?.essay &&
        (answers[questionKey] || "").trim().length < MIN_ESSAY_LENGTH
      );
    });

    if (firstInvalidIndex === -1) return true;

    const firstInvalidTask = tasks[firstInvalidIndex];
    const firstInvalidKey = firstInvalidTask?.id || firstInvalidIndex;
    const answer = (answers[firstInvalidKey] || "").trim();

    setAnswerErrors((prevErrors) => ({
      ...prevErrors,
      [firstInvalidKey]: !answer
        ? "Isi essay terlebih dahulu sebelum submit."
        : `Tulis jawaban minimal ${MIN_ESSAY_LENGTH} karakter sebelum submit.`,
    }));
    setCurrentQuestionIndex(firstInvalidIndex);
    setDraftMessage("");
    scrollToPageTop();
    return false;
  };

  const handleSaveDraft = async () => {
    if (!taskId) return;
    setSavingDraft(true);
    setError("");
    setDraftMessage("");

    try {
      const draft = {
        answers,
        figmaLinks,
        uploadedFiles,
        workMethods,
        currentQuestionIndex,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(getDraftStorageKey(taskId), JSON.stringify(draft));

      await missionService.saveDraft(
        taskId,
        buildSubmissionPayload(answers, figmaLinks, uploadedFiles)
      );
      setDraftMessage("Draft saved");
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to save draft"));
    } finally {
      setSavingDraft(false);
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateEssay(currentQuestion, currentQuestionKey, isLastQuestion ? "submit" : "lanjut")) return;

    if (!isLastQuestion) {
      await handleSaveDraft();
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      scrollToPageTop();
      return;
    }

    setSubmitting(true);
    try {
      if (!validateAllEssays()) return;

      const payload = buildSubmissionPayload(answers, figmaLinks, uploadedFiles);
      const answerEntries = buildAnswerEntries(tasks, answers);
      const file = getFirstFile(uploadedFiles);
      let response;

      try {
        const apiResponse = await missionService.submitTask(taskId, payload);
        response = enrichSubmissionResponse(apiResponse, {
          answerEntries,
          file,
          payload,
          roadmapLevelId,
          taskDetail,
          taskId,
        });

        missionService.markTaskCompleted({
          taskId: response?.data?.taskId || taskId,
          roadmapLevelId: response?.data?.roadmapLevelId || roadmapLevelId,
          taskTitle: response?.data?.taskTitle || taskDetail?.title,
          levelProgress: response?.data?.levelProgress,
          isLevelCompleted: response?.data?.isLevelCompleted,
          nextLevelUnlocked: response?.data?.nextLevelUnlocked,
        });

        localStorage.removeItem(getDraftStorageKey(taskId));
      } catch (error) {
        response = buildFallbackSubmission({
          answerEntries,
          file,
          taskDetail,
          taskId,
          roadmapLevelId,
          payload,
          apiErrorMessage: getApiErrorMessage(error, "Failed to submit task"),
        });
      }

      localStorage.setItem("lastTaskSubmission", JSON.stringify(response));
      navigate("/daily-mission/task/result", {
        state: { submission: response },
      });
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to submit task"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-13 text-(--color-primary) space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
          </div>
        ) : error && !taskDetail ? (
          <div className="border border-(--color-primary) rounded-2xl p-6 font-semibold">
            {error}
          </div>
        ) : (
          <>
            {taskDetail && (
              <HeaderMission
                task={taskDetail}
                backText="Back to Task Detail"
                backRoute={
                  roadmapLevelId
                    ? `/daily-mission/task/${roadmapLevelId}/${taskId}`
                    : `/daily-mission/task/${taskId}`
                }
              />
            )}

            {error && (
              <div className="border border-(--color-primary) rounded-2xl p-4 font-semibold bg-(--color-primary)/5">
                {error}
              </div>
            )}

            {draftMessage && (
              <div className="border border-(--color-success-border) rounded-2xl p-4 font-semibold bg-(--color-success-bg) text-(--color-success)">
                {draftMessage}
              </div>
            )}

            <AssessmentProgress
              totalQuestions={tasks.length}
              currentQuestionIndex={currentQuestionIndex}
            />
            <AssessmentForm
              key={currentQuestionKey}
              question={currentQuestion}
              answerValue={currentAnswer}
              onAnswerChange={handleAnswerChange}
              answerError={answerErrors[currentQuestionKey]}
              linkValue={figmaLinks[currentQuestionKey] || ""}
              onLinkChange={handleFigmaLinkChange}
              fileValue={uploadedFiles[currentQuestionKey]}
              onFileChange={handleFileChange}
              onFileRemove={handleFileRemove}
              activeWorkMethod={workMethods[currentQuestionKey]}
              onWorkMethodChange={handleWorkMethodChange}
              hintText={currentQuestion?.hint}
              onSubmit={handleSubmit}
              onSaveDraft={handleSaveDraft}
              savingDraft={savingDraft}
              onPrevious={handlePreviousQuestion}
              canGoPrevious={currentQuestionIndex > 0}
              submitButtonText={
                submitting
                  ? "Submitting..."
                  : isLastQuestion
                    ? "Submit Task"
                    : "Next Question"
              }
            />
            <MissionRewardCard
              rewards={{
                xp: 50,
                badgeProgress: `${currentQuestionIndex + 1} of ${tasks.length} tasks completed`,
                skillGrowth: { [taskDetail?.role || "Skill"]: 5 },
              }}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default TaskAssessmentPage;
