import { createSlice } from '@reduxjs/toolkit';
import * as db from '../../Database';

const assignments = db.default.assignments;

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: 'A' + (state.assignments.length + 1),
        title: assignment.title,
        course: assignment.course,
        releaseDate: assignment.releaseDate,
        dueDate: assignment.dueDate,
        points: assignment.points,
        description: assignment.description,
        assignmentGroup: assignment.assignmentGroup,
        submissionType: assignment.submissionType,
        displayGradeAs: assignment.displayGradeAs,
        onlineEntryOptions: assignment.onlineEntryOptions,
        assignTo: assignment.assignTo,
        availableUntil: assignment.availableUntil,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
