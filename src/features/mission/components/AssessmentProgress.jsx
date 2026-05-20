import React from "react";
import Bar from "../../../components/ui/Bar";

function AssessmentProgress({ totalQuestions = 5, currentQuestionIndex = 0 }) {
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <section>
      <div className="w-full bg-(--color-surface) border border-(--color-primary) rounded-2xl p-6 lg:p-7">
        {/* Title */}
        <h2 className="text-(--color-primary) text-xl lg:text-xl font-bold mb-3">
          Assessment Progress
        </h2>

        {/* Progress Bar Component */}
        <div className="mb-4">
          <Bar
            progress={progress}
            variant="C"
            color="bg-(--color-primary)"
            bgColor="bg-(--color-primary)/20"
            height="h-[12px]"
            textColor="text-(--color-primary)"
            fontSize="text-sm lg:text-base font-medium"
            fontWeight="font-normal"
            text={`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
          />
        </div>

        {/* Description */}
        <p className="text-(--color-primary)/90 text-sm lg:text-base font-medium">
          Complete each step carefully to strengthen your wireframing skills.
        </p>
      </div>
    </section>
  );
}

export default AssessmentProgress;
