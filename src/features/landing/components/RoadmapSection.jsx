import { useCallback, useEffect, useState } from "react";
import RoadmapItems from "../../../components/ui/RoadmapItems";
import { useAuth } from "../../../hooks/useAuth";
import roadmapService from "../../roadmap/services/roadmapService";

const SLIDE_INTERVAL_MS = 7500;
const DRAG_THRESHOLD_PX = 70;
const EMPTY_DRAG_STATE = {
  isDragging: false,
  startX: 0,
  deltaX: 0,
};
const FEATURED_ROADMAP_TITLE = "UI/UX Designer";

const normalizeText = (value = "") =>
  value.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

const getRoadmapKey = (roadmap, index) =>
  roadmap?.id || roadmap?.roleId || roadmap?.title || index;

const getComparableRoadmapKey = (roadmap) =>
  normalizeText(roadmap?.title || roadmap?.roleId || roadmap?.id || "");

const hasRoadmapSteps = (roadmap) => roadmap?.steps?.length > 0;

const uniqueRoadmapEntries = (roadmaps = []) => {
  const seenRoadmaps = new Set();

  return roadmaps.filter((roadmap) => {
    if (!hasRoadmapSteps(roadmap)) return false;

    const key = getComparableRoadmapKey(roadmap);
    if (!key || seenRoadmaps.has(key)) return false;

    seenRoadmaps.add(key);
    return true;
  });
};

const prioritizeFeaturedRoadmap = (roadmaps = []) => {
  const featuredIndex = roadmaps.findIndex(
    (roadmap) => normalizeText(roadmap.title) === normalizeText(FEATURED_ROADMAP_TITLE)
  );

  if (featuredIndex <= 0) return roadmaps;

  const nextRoadmaps = [...roadmaps];
  const [featuredRoadmap] = nextRoadmaps.splice(featuredIndex, 1);

  return [featuredRoadmap, ...nextRoadmaps];
};

const getLandingStepState = (index) => {
  if (index === 0) return { status: "Completed", progress: 100 };
  if (index === 1) return { status: "On Going", progress: 80 };
  return { status: false, progress: 0 };
};

const getLandingChecklist = (checklist = [], status) =>
  checklist.map((item, index) => ({
    ...item,
    isCheck: status === "Completed" || (status === "On Going" && index < 3),
  }));

const normalizeLandingRoadmap = (roadmap) => ({
  ...roadmap,
  steps: (roadmap?.steps || []).map((step, index) => {
    const stepState = getLandingStepState(index);

    return {
      ...step,
      ...stepState,
      checklist: getLandingChecklist(step.checklist, stepState.status),
      isUnlocked: index <= 1,
      isCompleted: index === 0,
    };
  }),
});

const getLandingRoadmapEntries = (preferredRoadmap, roadmaps = []) => {
  const normalizedRoadmaps = roadmaps.map(normalizeLandingRoadmap);

  if (preferredRoadmap) {
    return uniqueRoadmapEntries([
      normalizeLandingRoadmap(preferredRoadmap),
      ...normalizedRoadmaps,
    ]);
  }

  return uniqueRoadmapEntries(prioritizeFeaturedRoadmap(normalizedRoadmaps));
};

const loadPreferredRoadmap = async (role) => {
  try {
    const response = await roadmapService.getDefaultRoadmap();

    if (response.success && hasRoadmapSteps(response.data)) {
      return response.data;
    }
  } catch {
    // Fall back to the user's role below, matching the RoadmapPage behavior.
  }

  if (!role) return null;

  try {
    const response = await roadmapService.getRoadmapByRole(role);

    return response.success && hasRoadmapSteps(response.data)
      ? response.data
      : null;
  } catch {
    return null;
  }
};

function RoadmapSection() {
    const { user } = useAuth();
    const [roadmapEntries, setRoadmapEntries] = useState([]);
    const [activeRoadmapIndex, setActiveRoadmapIndex] = useState(0);
    const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);
    const [dragState, setDragState] = useState(EMPTY_DRAG_STATE);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const activeRoadmap = roadmapEntries[activeRoadmapIndex] || roadmapEntries[0];
    const slideTransform = `translateX(calc(-${activeRoadmapIndex * 100}% + ${dragState.deltaX}px))`;
    const slideTransitionClass = dragState.isDragging
      ? "transition-none"
      : "transition-transform duration-700 ease-in-out";

    const getNextRoadmapIndex = useCallback((currentIndex) => {
      if (roadmapEntries.length <= 1) return currentIndex;

      return currentIndex === roadmapEntries.length - 1 ? 0 : currentIndex + 1;
    }, [roadmapEntries.length]);

    const getPreviousRoadmapIndex = useCallback((currentIndex) => {
      if (roadmapEntries.length <= 1) return currentIndex;

      return currentIndex === 0 ? roadmapEntries.length - 1 : currentIndex - 1;
    }, [roadmapEntries.length]);

    useEffect(() => {
      let isMounted = true;

      const loadRoadmaps = async () => {
        try {
          const [preferredRoadmap, roadmapsResponse] = await Promise.all([
            loadPreferredRoadmap(user?.role || ""),
            roadmapService.getAllRoadmaps(),
          ]);

          if (!isMounted) {
            return;
          }

          const nextRoadmapEntries = getLandingRoadmapEntries(
            preferredRoadmap,
            roadmapsResponse.success ? roadmapsResponse.data : []
          );

          if (nextRoadmapEntries.length > 0) {
            setRoadmapEntries(nextRoadmapEntries);
            setActiveRoadmapIndex(0);
            setErrorMessage("");
          } else {
            setRoadmapEntries([]);
            setErrorMessage("Roadmap belum tersedia dari backend.");
          }
        } catch {
          if (!isMounted) return;

          setRoadmapEntries([]);
          setErrorMessage("Roadmap belum bisa dimuat dari backend.");
        } finally {
          if (isMounted) setIsLoading(false);
        }
      };

      loadRoadmaps();

      return () => {
        isMounted = false;
      };
    }, [user?.role]);

    useEffect(() => {
      if (isAutoSlidePaused || roadmapEntries.length <= 1) return undefined;

      const slideTimer = window.setInterval(() => {
        setActiveRoadmapIndex(getNextRoadmapIndex);
      }, SLIDE_INTERVAL_MS);

      return () => window.clearInterval(slideTimer);
    }, [getNextRoadmapIndex, isAutoSlidePaused, roadmapEntries.length]);

    const handlePointerDown = (event) => {
      if (roadmapEntries.length <= 1) return;

      event.currentTarget.setPointerCapture?.(event.pointerId);
      setIsAutoSlidePaused(true);
      setDragState({
        isDragging: true,
        startX: event.clientX,
        deltaX: 0,
      });
    };

    const handlePointerMove = (event) => {
      setDragState((currentState) => {
        if (!currentState.isDragging) return currentState;

        return {
          ...currentState,
          deltaX: event.clientX - currentState.startX,
        };
      });
    };

    const finishDrag = (event) => {
      if (!dragState.isDragging) return;

      event.currentTarget.releasePointerCapture?.(event.pointerId);

      if (Math.abs(dragState.deltaX) >= DRAG_THRESHOLD_PX) {
        setActiveRoadmapIndex((currentIndex) =>
          dragState.deltaX < 0
            ? getNextRoadmapIndex(currentIndex)
            : getPreviousRoadmapIndex(currentIndex)
        );
      }

      setDragState(EMPTY_DRAG_STATE);
      setIsAutoSlidePaused(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setActiveRoadmapIndex(getPreviousRoadmapIndex);
      }

      if (event.key === "ArrowRight") {
        setActiveRoadmapIndex(getNextRoadmapIndex);
      }
    };

    return(
      <section id="roadmap" className="scroll-mt-20 max-w-full mx-auto">
        {/* TEXT + LINE X */}
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-5 px-6 pt-10 lg:gap-8 lg:px-8">
          <h2 className="text-(--color-primary) text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight lg:whitespace-normal text-center lg:text-left">Plan Your Career Path</h2>
          <div className="hidden lg:block flex-1 h-0.75 bg-(--color-primary) "></div> 
        </div>
        {/* BAGIAN BAWAH */}
        <div className="mb-3 max-w-6xl mx-auto px-6 lg:px-8 ">
          {isLoading && (
            <div className="my-20 flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-(--color-primary-light) border-t-(--color-primary)"></div>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="my-16 rounded-lg border border-(--color-primary-light) bg-(--color-roadmap-locked-bg) px-6 py-5 text-center text-sm font-medium text-(--color-primary)">
              {errorMessage}
            </div>
          )}

          {!isLoading && activeRoadmap && (
          <div
            className={`mt-11 select-none touch-pan-y focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) ${
              dragState.isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            role="region"
            aria-label="Roadmap pilihan"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsAutoSlidePaused(true)}
            onBlur={() => setIsAutoSlidePaused(false)}
          >
            <div className="mb-8 flex w-full justify-center sm:mb-10">
              <div className="w-full max-w-2xl overflow-hidden px-2">
                <div
                  className={`flex ${slideTransitionClass}`}
                  style={{
                    transform: slideTransform,
                    willChange: "transform",
                  }}
                  aria-live="polite"
                >
                  {roadmapEntries.map((roadmap, index) => (
                    <div
                      key={getRoadmapKey(roadmap, index)}
                      className="flex w-full shrink-0 justify-center px-2 py-0.5 text-center"
                      aria-hidden={activeRoadmapIndex !== index}
                    >
                      <h3 className="max-w-full rounded-lg border-2 border-(--color-primary) px-5 py-2 font-semibold text-xl sm:text-2xl leading-tight tracking-tight text-(--color-primary)">
                        {roadmap.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ROADMAP ITEMS (ICON, LINE Y, CARD) */}
            <div className="mb-35 overflow-hidden">
              <div
                className={`flex ${slideTransitionClass}`}
                style={{
                  transform: slideTransform,
                  willChange: "transform",
                }}
              >
                {roadmapEntries.map((roadmap, index) => (
                  <div
                    key={getRoadmapKey(roadmap, index)}
                    className="w-full shrink-0"
                    aria-hidden={activeRoadmapIndex !== index}
                  >
                    <RoadmapItems data={roadmap.steps ?? []} density="landing" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    )
}

export default RoadmapSection;
