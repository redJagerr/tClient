import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import SubcategoryFilter from 'components/placeFilters/SubcategoryFilter/SubcategoryFilter';

import {
	fetchDistricts,
	toggleDistricts,
	toggleMobileVisible,
} from 'redux/slices/filtersSlice';
import {
	selectDistricts,
	selectDistrictsLoadStatus,
	selectFiltersDistricts,
	selectMobileVisible,
} from 'redux/selectors/filtersSelectors';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';

import { BsArrowLeftShort } from 'react-icons/bs';
import FiltersDistrict from '../FiltersDistrict/FiltersDistrict';

const Filters = () => {
	const [searchParams] = useSearchParams();
	const { cityId } = useParams();
	const dispatch = useDispatch();

	const filterDistricts = useSelector(selectFiltersDistricts);
	const districtsLoadStatus = useSelector(selectDistrictsLoadStatus);
	const mobileVisible = useSelector(selectMobileVisible);
	const districts = useSelector(selectDistricts);
	const darkTheme = useSelector(selectDarkTheme);

	useEffect(() => {
		dispatch(fetchDistricts(cityId));
	}, []);

	useEffect(() => {
		if (searchParams.has('district') && districtsLoadStatus === 'idle') {
			const districtsArr = searchParams.getAll('district');
			districtsArr.forEach(i => dispatch(toggleDistricts(i)));
		}
	}, [districtsLoadStatus]);

	const renderDistricts = () =>
		districts.map(district => {
			const isActive = filterDistricts.includes(district);
			return (
				<FiltersDistrict
					key={district}
					district={district}
					isActive={isActive}
				/>
			);
		});

	const themeClass = darkTheme ? `dark-card` : '';

	return (
		<div
			className={`places-filter__filters filters ${
				mobileVisible ? 'visible' : ''
			} ${darkTheme ? 'dark-theme' : ''}`}
		>
			<button
				className='button filters__close-button filter-result__button'
				onClick={() => dispatch(toggleMobileVisible())}
			>
				<BsArrowLeftShort size={36} />
			</button>
			<span className='places-filter__title places-filter__title--filter'>
				Фильтр:
			</span>
			<SubcategoryFilter />
			<div className={`filters__container ${themeClass}`}>
				<span className='filters__title'>Район</span>
				<div className='filters__categories'>
					<ul className='list filters__list'>{renderDistricts()}</ul>
				</div>
			</div>
		</div>
	);
};
export default Filters;
