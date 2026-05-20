import { useState } from "react";
import { Lightbulb, Upload, Link2, FileText } from "lucide-react";

import TextAreaForm from "../../../components/ui/TextAreaForm";
import Button from "../../../components/ui/Button";
import TaskSummaryCard from "./TaskSummaryCard";

import { mockMissions } from "../../../constants/dummy/mission";

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

function AssessmentForm({
  question,
  answerValue,
  onAnswerChange,
  linkValue,
  onLinkChange,
  hintText,
  onSubmit,
  onPrevious,
  canGoPrevious = false,
  submitButtonText = "Submit Task",
}) {
  const [showHint, setShowHint] = useState(false);
  const [localAnswer, setLocalAnswer] = useState("");
  const [localLink, setLocalLink] = useState("");

  // Fetch dummy data fallback from mockMissions (ID 2 is "Practice Wireframing with Figma")
  const defaultQuestion = mockMissions.missions.find((m) => m.id === 2)?.assessment?.tasks[0];
  const activeQuestion = question || defaultQuestion;
  const activeHint = hintText || activeQuestion?.hint;
  const activeSubmission = activeQuestion?.submission || defaultSubmission;
  const activeWorkMethods = (activeSubmission.workMethods || [])
    .map(normalizeWorkMethod)
    .filter((method) => method?.type && workMethodOptions[method.type]);
  const activeLinkInput = activeSubmission.linkInput;
  const activeEssay = activeSubmission.essay;
  const shouldShowSubmitWork = activeWorkMethods.length > 0 || Boolean(activeLinkInput);

  const displayAnswerValue = answerValue !== undefined ? answerValue : localAnswer;
  const displayOnAnswerChange = onAnswerChange || ((e) => setLocalAnswer(e.target.value));
  const displayLinkValue = linkValue !== undefined ? linkValue : localLink;
  const displayOnLinkChange = onLinkChange || ((e) => setLocalLink(e.target.value));

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
                  const isPrimaryMethod = method.type === "figmaLink";

                  return (
                    <button
                      key={method.type}
                      type="button"
                      className={`px-5 py-3 font-medium rounded-xl text-sm lg:text-base flex items-center gap-2 cursor-pointer ${isPrimaryMethod ? "bg-(--color-primary) text-white" : "border border-(--color-primary) text-(--color-primary)"}`}
                    >
                      <Icon size={18}/>
                      {method.label || option.label}
                    </button>
                  );
                })}
              </div>
            )}

            {activeLinkInput && (
              <>
                <input
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
            rows={activeEssay.rows || 4}
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
            text={<span className="inline-block scale-125 font-semibold">Save Draft</span>}
            variant="secondary"
            className="border border-(--color-primary) bg-(--color-surface)! text-(--color-primary)!"
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
