import "./RecordsState.scss";

// Shows a message while a list is loading, failed, or is empty.
// Only when there are records does it call children(records) to draw them.
//
// Usage:
//   <RecordsState records={allergens} loadingMessage={loadingMessage} emptyMessage="No allergens">
//     {(list) => list.map((allergen) => <Tag key={allergen.allergenID}>...</Tag>)}
//   </RecordsState>
function RecordsState({ records, loadingMessage, emptyMessage, children }) {
  // Initialisation--------------------------------------
  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  // 1. Still loading, or the load failed (useLoad puts the error in loadingMessage)
  if (!records) {
    return <p className="recordsState">{loadingMessage}</p>;
  }

  // 2. Loaded, but the list is empty (the backend sends 200 [])
  if (records.length === 0) {
    return <p className="recordsState">{emptyMessage}</p>;
  }

  // 3. We have records: children is a function, so we call it with the list
  return children(records);
}

export default RecordsState;
