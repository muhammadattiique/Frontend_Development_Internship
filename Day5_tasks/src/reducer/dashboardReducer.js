export const initialState = {
  users: [],
  products: [],
  tasks: [],
  viewMode: "cards",
  filterText: "",
  isModalOpen: false,
  editingRecord: null,
  recordToDelete: null,
  previousState: null, // Holds snapshot for rolling back
};

export const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return {
        ...state,
        users: action.payload.users,
        products: action.payload.products,
        tasks: action.payload.tasks,
      };

    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };

    case "SET_FILTER_TEXT":
      return { ...state, filterText: action.payload };

    case "OPEN_ADD_MODAL":
      return { ...state, editingRecord: null, isModalOpen: true };

    case "OPEN_EDIT_MODAL":
      return { ...state, editingRecord: action.payload, isModalOpen: true };

    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, editingRecord: null };

    case "INITIATE_DELETE":
      return { ...state, recordToDelete: action.payload };

    case "CANCEL_DELETE":
      return { ...state, recordToDelete: null };

    case "OPTIMISTIC_SAVE_RECORD": {
      const { type, recordData, isEditing } = action.payload;
      const key = `${type}s`;

      const updatedList = isEditing
        ? state[key].map((item) =>
            item.id === recordData.id ? { ...item, ...recordData } : item,
          )
        : [recordData, ...state[key]];

      return {
        ...state,
        previousState: {
          users: state.users,
          products: state.products,
          tasks: state.tasks,
        }, // Snapshot for rollback
        [key]: updatedList,
        isModalOpen: false,
        editingRecord: null,
      };
    }

    case "OPTIMISTIC_DELETE": {
      if (!state.recordToDelete) return state;
      const { type, record } = state.recordToDelete;
      const key = `${type}s`;

      const updatedList = state[key].filter((item) => item.id !== record.id);

      return {
        ...state,
        previousState: {
          users: state.users,
          products: state.products,
          tasks: state.tasks,
        }, // Snapshot for rollback
        [key]: updatedList,
        recordToDelete: null,
      };
    }

    case "ROLLBACK_STATE": {
      if (!state.previousState) return state;
      return {
        ...state,
        users: state.previousState.users,
        products: state.previousState.products,
        tasks: state.previousState.tasks,
        previousState: null,
      };
    }

    default:
      return state;
  }
};
