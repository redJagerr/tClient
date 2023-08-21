import { Link } from 'react-router-dom';
import declarationOfNumber from 'utils/declarationOfNumber';

const CityCard = ({ id, name, photos, places }) => (
	<li className='cities__item'>
		<Link to={`/${id}/places`} className='link cities__link' tabIndex={0}>
			<div className='cities__text'>
				<span className='cities__name'>{name}</span>
				<span className='cities__count'>
					{places.length}{' '}
					{declarationOfNumber(places.length, [
						'интересное место',
						'интересных места',
						'интересных мест',
					])}
				</span>
			</div>
			<img src={photos} alt='Moscow' className='image dark-bg' />
		</Link>
	</li>
);

export default CityCard;
