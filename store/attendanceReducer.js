const initialState = {
    records: [],
};

const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RECORD':
            return {
                ...state,
                records: [...state.records, action.payload],
            };
        default:
            return state;
    }
};

export default attendanceReducer;

