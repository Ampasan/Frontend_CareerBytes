import { useState } from "react";
import { Lightbulb, Upload, Link2, FileText } from "lucide-react";

import TextAreaForm from "../../../components/ui/TextAreaForm";
import Button from "../../../components/ui/Button";
import TaskSummaryCard from "./TaskSummaryCard";

import { mockMissions } from "../../../constants/dummy/mission";

function AssessmentForm({
  question,
  answerValue,
  onAnswerChange,
  hintText,
  onSubmit,
}) {
  const [showHint, setShowHint] = useState(false);
  const [localAnswer, setLocalAnswer] = useState("");

  // Fetch dummy data fallback from mockMissions (ID 2 is "Practice Wireframing with Figma")
  const defaultQuestion = mockMissions.missions.find((m) => m.id === 2)?.assessment?.tasks[0];
  const activeQuestion = question || defaultQuestion;
  const activeHint = hintText || activeQuestion?.hint;

  const displayAnswerValue = answerValue !== undefined ? answerValue : localAnswer;
  const displayOnAnswerChange = onAnswerChange || ((e) => setLocalAnswer(e.target.value));

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
              className="
              border
              border-(--color-primary)
              bg-(--color-surface)!
              text-(--color-primary)!
              "
              onClick={() => setShowHint(!showHint)}
            />
          </div>

          {showHint && (
            <div
              className="
              border
              border-(--color-primary)
              rounded-xl
              p-4
              text-(--color-primary)
              bg-(--color-primary-soft)
              "
            >
              {activeHint}
            </div>
          )}
        </div>

        {/* Submit Work */}
        <div className="mt-8">
          <h2
            className="
            font-bold
            text-(--color-primary)
            text-xl
            mb-5
            "
          >
            Submit Your Work
          </h2>

          {/* buttons */}
          <div className="flex flex-wrap gap-3 mb-5">
            <button
              className="
              px-5 py-3
              font-medium
              rounded-xl
              border
              border-(--color-primary)
              text-(--color-primary)
              text-sm lg:text-base
              flex items-center gap-2
              cursor-pointer
              "
            >
              <Upload size={18}/>
              Upload File
            </button>

            <button
              className="
              px-5 py-3
              font-medium
              rounded-xl
              bg-(--color-primary)
              text-white
              text-sm lg:text-base
              flex items-center gap-2
              cursor-pointer
              "
            >
              <Link2 size={18}/>
              Figma Link
            </button>

            <button
              className="
              px-5 py-3
              font-medium
              rounded-xl
              border
              border-(--color-primary)
              text-(--color-primary)
              text-sm lg:text-base
              flex items-center gap-2
              cursor-pointer
              "
            >
              <FileText size={18}/>
              Text Explanation
            </button>
          </div>

          <input
            placeholder="Paste your Figma prototype link here..."
            className="
            w-180
            border
            border-(--color-primary)/50
            rounded-xl
            px-4
            py-3
            text-sm lg:text-base
            outline-none
            placeholder:text-(--color-primary-placeholder)
            "
          />

          <p
            className="
            font-medium
            text-xs lg:text-sm
            text-(--color-primary)/70
            mt-3
            "
          >
            Make sure sharing permission is set to public.
          </p>
        </div>
      </TaskSummaryCard>

      {/* Text Area */}

      <div
        className="
        border
        border-(--color-primary)
        rounded-2xl
        p-6 lg:p-9
        bg-(--color-surface)
        "
      >
        <TextAreaForm
          label="What design decisions did you make?"
          placeholder="Explain your layout choices, hierarchy decisions, and user flow considerations..."
          name="answer"
          value={displayAnswerValue}
          onChange={displayOnAnswerChange}
          rows={4}
        />
      </div>

      {/* Bottom buttons */}

      <div className="flex justify-between items-center mb-12">

        <Button
          text={<span className="inline-block scale-125 font-semibold">Save Draft</span>}
          variant="secondary"
          className="
          border
          border-(--color-primary)
          bg-(--color-surface)!
          text-(--color-primary)!
          "
        />

        <Button
          text={<span className="inline-block scale-125">Submit Task</span>}
          variant="primary"
          className="
          hover:bg-(--color-primary)/70"
          onClick={onSubmit}
        />

      </div>

    </div>
  );
}

export default AssessmentForm;
