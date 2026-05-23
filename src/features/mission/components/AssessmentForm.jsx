import { useMemo, useRef, useState } from "react";
import { Lightbulb, Upload, Link2, FileText, X } from "lucide-react";

import TextAreaForm from "../../../components/ui/TextAreaForm";
import Button from "../../../components/ui/Button";
import TaskSummaryCard from "./TaskSummaryCard";

const defaultSubmission = {
  workMethods: ["upload", "figmaLink", "textExplanation"],
  linkInput: {
    placeholder: "Paste your Figma prototype link here...",
    helperText: "Make sure sharing permission is set to public."
  },
  essay: {
    label: "What design decisions did you make?",
    placeholder: "Explain your layout choices, hierarchy decisions, and user flow considerations...",
    rows: 4
  }
};

const defaultQuestion = {
  id: "default",
  taskName: "Daily Mission Task",
  description: "Complete this task and explain your work.",
  requirements: [],
  hint: "Review the task instructions before submitting.",
  submission: defaultSubmission,
};

const workMethodOptions = {
  upload: {
    label: "Upload File",
    icon: Upload
  },
  figmaLink: {
    label: "Figma Link",
    icon: Link2
  },
  textExplanation: {
    label: "Text Explanation",
    icon: FileText
  }
};

const normalizeWorkMethod = (method) => {
  if (typeof method === "string") {
    return {
      type: method,
      label: workMethodOptions[method]?.label
    };
  }

  return method;
};

const formatFileSize = (size = 0) => {
  if (!size) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1
  );
  const value = size / 1024 ** unitIndex;

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

function AssessmentForm({
  question,
  answerValue,
  onAnswerChange,
  answerError,
  linkValue,
  onLinkChange,
  fileValue,
  onFileChange,
  onFileRemove,
  activeWorkMethod,
  onWorkMethodChange,
  hintText,
  onSubmit,
  onPrevious,
  onSaveDraft,
  canGoPrevious = false,
  savingDraft = false,
  submitButtonText = "Submit Task",
}) {
  const [showHint, setShowHint] = useState(false);
  const [localAnswer, setLocalAnswer] = useState("");
  const [localLink, setLocalLink] = useState("");
  const [localFile, setLocalFile] = useState(null);
  const [localWorkMethod, setLocalWorkMethod] = useState("");
  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const activeQuestion = question || defaultQuestion;
  const activeHint = hintText || activeQuestion?.hint;
  const activeSubmission = activeQuestion?.submission || defaultSubmission;
  const activeWorkMethods = (activeSubmission.workMethods || [])
    .map(normalizeWorkMethod)
    .filter((method) => method?.type && workMethodOptions[method.type]);
  const activeLinkInput = activeSubmission.linkInput;
  const activeEssay = activeSubmission.essay;
  const shouldShowSubmitWork = activeWorkMethods.length > 0 || Boolean(activeLinkInput);
  const defaultWorkMethod = useMemo(() => {
    if (activeWorkMethods.some((method) => method.type === "figmaLink")) {
      return "figmaLink";
    }

    if (activeWorkMethods[0]?.type) return activeWorkMethods[0].type;
    if (activeLinkInput) return "figmaLink";
    return "textExplanation";
  }, [activeLinkInput, activeWorkMethods]);

  const displayAnswerValue = answerValue !== undefined ? answerValue : localAnswer;
  const displayOnAnswerChange = onAnswerChange || ((e) => setLocalAnswer(e.target.value));
  const displayLinkValue = linkValue !== undefined ? linkValue : localLink;
  const displayOnLinkChange = onLinkChange || ((e) => setLocalLink(e.target.value));
  const displayFileValue = fileValue !== undefined ? fileValue : localFile;
  const displayOnFileChange = onFileChange || ((e) => setLocalFile(e.target.files?.[0] || null));
  const displayOnFileRemove = onFileRemove || (() => setLocalFile(null));
  const selectedWorkMethod = activeWorkMethod || localWorkMethod || defaultWorkMethod;

  const updateWorkMethod = (method) => {
    setLocalWorkMethod(method);
    onWorkMethodChange?.(method);
  };

  const handleMethodClick = (method) => {
    updateWorkMethod(method);

    if (method === "upload") {
      window.setTimeout(() => fileInputRef.current?.click(), 0);
      return;
    }

    if (method === "figmaLink") {
      window.setTimeout(() => linkInputRef.current?.focus(), 0);
      return;
    }

    if (method === "textExplanation") {
      window.setTimeout(() => textAreaRef.current?.focus(), 0);
    }
  };

  const handleFileInputChange = (event) => {
    displayOnFileChange(event);
    event.target.value = "";
  };

  const handleRemoveFile = () => {
    displayOnFileRemove();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">

      {/* TOP TASK CARD */}

      <TaskSummaryCard
        taskNumber={activeQuestion?.id}
        title={activeQuestion?.taskName}
        description={activeQuestion?.description}
        requirements={activeQuestion?.requirements}
      >
        {/* Hint */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex">
            <Button
              text={
                <span className="flex items-center gap-2">
                  <Lightbulb size={18} />
                  Show Hint
                </span>
              }
              variant="secondary"
              className="border border-(--color-primary) bg-(--color-surface)! text-(--color-primary)!"
              onClick={() => setShowHint(!showHint)}
            />
          </div>

          {showHint && (
            <div
              className="border border-(--color-primary) rounded-xl p-4 text-(--color-primary) bg-(--color-primary-soft)"
            >
              {activeHint}
            </div>
          )}
        </div>

        {/* Submit Work */}
        {shouldShowSubmitWork && (
          <div className="mt-8">
            <h2 className="font-bold text-(--color-primary) text-xl mb-5">
              Submit Your Work
            </h2>

            {activeWorkMethods.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-5">
                {activeWorkMethods.map((method) => {
                  const option = workMethodOptions[method.type];
                  const Icon = option.icon;
                  const isActiveMethod = selectedWorkMethod === method.type;

                  return (
                    <button
                      key={method.type}
                      type="button"
                      className={`px-5 py-3 font-medium rounded-xl text-sm lg:text-base flex items-center gap-2 cursor-pointer transition ${
                        isActiveMethod
                          ? "bg-(--color-primary) text-white"
                          : "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary)/10"
                      }`}
                      onClick={() => handleMethodClick(method.type)}
                    >
                      <Icon size={18}/>
                      {method.label || option.label}
                    </button>
                  );
                })}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {selectedWorkMethod === "upload" && (
              <div className="w-full max-w-180 rounded-xl border border-dashed border-(--color-primary)/60 bg-(--color-primary)/5 p-4 mb-5">
                {displayFileValue ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-(--color-primary)">
                    <div className="min-w-0">
                      <p className="font-semibold truncate">
                        {displayFileValue.name}
                      </p>
                      <p className="text-xs lg:text-sm text-(--color-primary)/70">
                        {formatFileSize(displayFileValue.size)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-(--color-primary) text-white text-sm font-semibold cursor-pointer hover:bg-(--color-primary)/80"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg border border-(--color-primary) text-(--color-primary) cursor-pointer hover:bg-(--color-primary)/10"
                        onClick={handleRemoveFile}
                        aria-label="Remove selected file"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-(--color-primary) font-semibold cursor-pointer hover:bg-(--color-primary)/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={18} />
                    Choose a file
                  </button>
                )}
              </div>
            )}

            {activeLinkInput && selectedWorkMethod === "figmaLink" && (
              <>
                <input
                  ref={linkInputRef}
                  value={displayLinkValue}
                  onChange={displayOnLinkChange}
                  placeholder={activeLinkInput.placeholder}
                  className="w-full max-w-180 min-w-0 box-border border border-(--color-primary)/50 rounded-xl px-4 py-3 text-sm lg:text-base outline-none placeholder:text-(--color-primary-placeholder)"
                />

                {activeLinkInput.helperText && (
                  <p className="font-medium text-xs lg:text-sm text-(--color-primary)/70 mt-3">
                    {activeLinkInput.helperText}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </TaskSummaryCard>

      {/* Text Area */}

      {activeEssay && (
        <div className="border border-(--color-primary) rounded-2xl p-6 lg:p-9 bg-(--color-surface)">
          <TextAreaForm
            label={activeEssay.label}
            placeholder={activeEssay.placeholder}
            name={`answer-${activeQuestion?.id || "default"}`}
            value={displayAnswerValue}
            onChange={displayOnAnswerChange}
            error={answerError}
            rows={activeEssay.rows || 4}
            textareaRef={textAreaRef}
          />
        </div>
      )}

      {/* Bottom buttons */}

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-12">
        <div className="flex flex-col sm:flex-row gap-3">
          {canGoPrevious && (
            <Button
              text={<span className="inline-block scale-125 font-semibold">Previous</span>}
              variant="secondary"
              className="border border-(--color-primary) bg-(--color-surface)! text-(--color-primary)!"
              onClick={onPrevious}
            />
          )}

          <Button
            text={
              <span className="inline-block scale-125 font-semibold">
                {savingDraft ? "Saving..." : "Save Draft"}
              </span>
            }
            variant="secondary"
            className="border border-(--color-primary) bg-(--color-surface)! text-(--color-primary)!"
            onClick={onSaveDraft}
          />
        </div>

        <Button
          text={<span className="inline-block scale-125">{submitButtonText}</span>}
          variant="primary"
          className="hover:bg-(--color-primary)/70"
          onClick={onSubmit}
        />

      </div>

    </div>
  );
}

export default AssessmentForm;
