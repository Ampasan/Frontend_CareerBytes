import RoadmapTimeline from "../../../components/ui/RoadmapTimeline";

function RoadmapAbout({ title, description, level, estimate }) {
  return (
    <RoadmapTimeline 
      title={title}
      description={description}
      level={level}
      estimate={estimate}
    />
  );
}

export default RoadmapAbout;