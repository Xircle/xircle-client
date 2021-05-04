import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootDispatch, RootState } from '../store/index';

export const useAppDispatch = () => useDispatch<RootDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector