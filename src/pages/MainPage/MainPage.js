import Cities from 'components/home/Cities/Cities';
import Search from 'components/shared/Search/Search';

const MainPage = () => (
	<>
		<h2 className='main-title'>Посетите лучшие места городов России!</h2>
		<Search isMain={true} searchPlaceholder='Найти город...' />
		<Cities />
	</>
);

export default MainPage;
