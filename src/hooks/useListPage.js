// import { useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
//
// export function useListPage(slice, fetchAction) {
//   const dispatch = useDispatch();
//   const sliceState = useSelector((state) => state[slice]);
//
//   console.log('sliceState', sliceState);
//   console.log('slice', slice);
//   // const rowsPerPage = useSelector((state) => state[slice].rowsPerPage);
//   // const totalCount = useSelector((state) => state[slice].totalCount);
//   // const items = useSelector((state) => state[slice][slice]);
//
//   useEffect(() => {
//     dispatch(fetchAction({}));
//   }, [dispatch, fetchAction]);
//
//   const handlePageChange = useCallback(
//     (event) => {
//       dispatch(slice.actions.setPage(event));
//       dispatch(fetchAction({}));
//     },
//     [dispatch, fetchAction, slice.actions],
//   );
//
//   const handleRowsPerPageChange = useCallback(
//     (value) => {
//       dispatch(slice.actions.setRowsPerPage(value));
//       dispatch(fetchAction({}));
//     },
//     [dispatch, fetchAction, slice.actions],
//   );
//
//   return {
//     page,
//     rowsPerPage,
//     totalCount,
//     items,
//     handlePageChange,
//     handleRowsPerPageChange,
//   };
// }
