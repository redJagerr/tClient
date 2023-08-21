import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleSwitch,
	addFilter,
	deleteFilter,
} from 'redux/slices/filtersSlice';
import {
	clearSubcategories,
	toggleSubcategory,
} from 'redux/slices/subcategoriesSlice';
import {
	selectFilterSubcategory,
	selectSubcategories,
} from 'redux/selectors/filtersSelectors';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';

import { v4 } from 'uuid';
import { CircularProgress, Switch } from '@mui/material';

const SubcategoryFilter = () => {
	const [isExternalUrl, setIsExternalUrl] = useState(true);

	const { subcategories, subcategoriesLoadStatus } =
		useSelector(selectSubcategories);
	const subcategory = useSelector(selectFilterSubcategory);
	const darkTheme = useSelector(selectDarkTheme);

	useEffect(() => {
		if (subcategories.length !== 0) dispatch(clearSubcategories());
	}, []);

	useEffect(() => {
		if (
			isExternalUrl &&
			subcategory.length !== 0 &&
			subcategoriesLoadStatus === 'idle'
		) {
			setIsExternalUrl(false);
			subcategory.forEach(sub => {
				const categoryCode = sub.slice(0, 3);
				dispatch(
					toggleSubcategory({
						subcategory: sub,
						category: categoryCode,
					})
				);
			});
		}
	}, [subcategoriesLoadStatus]);

	const { highRating, localsChoice } = useSelector(
		state => state.filters.filters
	);

	const dispatch = useDispatch();

	const renderSubcategoryList = () =>
		subcategories.map(i => (
			<li className='filters__subcategories-item' key={v4()}>
				<span className='filters__title'>Тип {i.title}</span>
				<div className='filters__categories'>
					<ul className='list filters__list filters__list--buttons'>
						{renderSubcategoryItem(i, i.category)}
					</ul>
				</div>
			</li>
		));

	const renderSubcategoryItem = (item, category) =>
		item['filters'].map(({ name, subcategory, isActive }) => {
			const activeClass = isActive ? ` filters__button--active` : null;
			return (
				<li className='filters__item filters__item--buttons' key={v4()}>
					<button
						className={`button filters__button ${activeClass}`}
						onClick={() => {
							isActive
								? dispatch(
										deleteFilter({
											type: 'subcategory',
											filter: subcategory,
										})
								  )
								: dispatch(
										addFilter({
											type: 'subcategory',
											filter: subcategory,
										})
								  );
							dispatch(toggleSubcategory({ subcategory, category }));
						}}
					>
						{name}
					</button>
				</li>
			);
		});

	const themeClass = darkTheme ? `dark-card` : '';

	return (
		<div className={`filters__container filters__subcategories ${themeClass}`}>
			<ul className='list filters__subcategories-list'>
				{renderSubcategoryList()}
			</ul>
			{subcategoriesLoadStatus === 'loading' && (
				<CircularProgress className='loader' color='inherit' size={18} />
			)}
			<ul className='list filters__additional-filters'>
				<li className='filters__additional-filter'>
					<Switch
						checked={highRating}
						size='small'
						onChange={() => dispatch(toggleSwitch('highRating'))}
					/>
					<span className='filters__switch-name'>Рейтинг 4+</span>
				</li>
				<li className='filters__additional-filter'>
					<Switch
						checked={localsChoice}
						size='small'
						onChange={() => dispatch(toggleSwitch('localsChoice'))}
					/>{' '}
					<span className='filters__switch-name'>Выбор местных</span>
				</li>
			</ul>
		</div>
	);
};
export default SubcategoryFilter;
