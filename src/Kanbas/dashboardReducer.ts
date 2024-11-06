import { createSlice } from '@reduxjs/toolkit';
import * as db from './Database';

const enrollments = db.default.enrollments;

const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: 'E' + (state.enrollments.length + 1),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e._id !== enrollmentId
      );
    },
  },
});
export const { addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
