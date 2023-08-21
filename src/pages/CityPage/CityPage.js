import Search from 'components/shared/Search/Search';
import PlaceCategories from 'components/placeFilters/PlaceCategories/PlaceCategories';
import FilterResult from 'components/placeFilters/FilterResult/FilterResult';
import Filters from 'components/placeFilters/Filters/Filters';

const CityPage = () => (
	<>
		<Search searchPlaceholder='Найти место...' />
		<PlaceCategories />
		<div className='places-filter'>
			<Filters />
			<FilterResult />
		</div>
	</>
);

export default CityPage;
