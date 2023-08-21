import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from 'redux/slices/citiesSlice';
import { selectCities } from 'redux/selectors/globalSelectors';
import CityCard from '../CityCard/CityCard';
import CityCardSkeleton from '../CityCard/CityCardSkeleton';
import { v4 } from 'uuid';
import declarationOfNumber from 'utils/declarationOfNumber';

const Cities = () => {
	const { items, status, isSearch } = useSelector(selectCities);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCities());
	}, []);

	const citiesRender = arr =>
		arr.map(({ _id, ...props }) => <CityCard key={_id} id={_id} {...props} />);

	const elements = citiesRender(items);
	return (
		<section className='cities'>
			<h3 className='title-30 cities__title'>
				{isSearch
					? `Найден${declarationOfNumber(items.length, ['', 'о', 'о'])}: ${
							items.length
					  } ${declarationOfNumber(items.length, [
							'город',
							'города',
							'городов',
					  ])}`
					: 'Популярные города'}
			</h3>
			<ul className='list cities__list' data-testid='list'>
				{status === 'loading'
					? [
							<CityCardSkeleton key={v4()} />,
							<CityCardSkeleton key={v4()} />,
							<CityCardSkeleton key={v4()} />,
					  ]
					: elements}
			</ul>
		</section>
	);
};
export default Cities;
