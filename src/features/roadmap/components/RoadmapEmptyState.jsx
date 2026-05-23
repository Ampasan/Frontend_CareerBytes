import EmptyState from "../../../components/layout/EmptyState";

function RoadmapEmptyState({ searchTerm, onSearchAgain, onSelectRole }) {
  return (
    <EmptyState 
      searchTerm={searchTerm} 
      onSearchAgain={onSearchAgain}
      onSelectRole={onSelectRole}
    />
  );
}

export default RoadmapEmptyState;