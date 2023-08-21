import React from 'react';
import { useDispatch } from 'react-redux';
import {
	addFilter,
	deleteFilter,
	toggleDistricts,
} from 'redux/slices/filtersSlice';

const FiltersDistrict = ({ district, isActive }) => {
	const dispatch = useDispatch();
	const handleClick = e => {
		e.target.checked
			? dispatch(addFilter({ type: 'district', filter: district }))
			: dispatch(
					deleteFilter({
						type: 'district',
						filter: district,
					})
			  );
		dispatch(toggleDistricts(district));
	};
	return (
		<li className='filters__item '>
			<label className='filters__names'>
				<input
					type='checkbox'
					className='filters__checkbox'
					checked={isActive}
					onChange={handleClick}
				/>
				{district}
			</label>
		</li>
	);
};

export default FiltersDistrict;
