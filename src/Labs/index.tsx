import Lab1 from './Lab1';
import { Route, Routes, Navigate } from 'react-router';
import TOC from './TOC';
import Lab2 from './Lab2';
import Lab3 from './Lab3';
import Lab4 from './Lab4';
import { Provider } from 'react-redux';
import store from './store';
export default function Labs() {
  return (
    <div className="container">
      <Provider store={store}>
        <h1>Labs</h1>
        <h3>Jacob Kline</h3>
        <h4>Section 01</h4>
        <TOC />
        <Routes>
          <Route path="/" element={<Navigate to="Lab1" />} />
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2" element={<Lab2 />} />
          <Route path="Lab3" element={<Lab3 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4" element={<Lab4 />} />
        </Routes>
      </Provider>
    </div>
  );
}
