import { Link, useParams } from 'react-router-dom';
import { MdLocationPin } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/use-auth';
import useHandlePlace from 'hooks/useHandlePlace';
import { toggleModalOpen } from 'redux/slices/authModalSlice';
import { selectUserCities } from 'redux/selectors/userSelectors';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { checkCurrentCity, isItemInArr } from 'utils/placeUtils';
import { checkSubcategoryIcon } from 'utils/checkSubcategoryIcon';

import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

import 'react-loading-skeleton/dist/skeleton.css';

const PlaceCard = ({
	placeId,
	name,
	address,
	photos,
	likes,
	district,
	category,
	rating,
	subcategory,
}) => {
	const cities = useSelector(selectUserCities);
	const darkTheme = useSelector(selectDarkTheme);
	const dispatch = useDispatch();
	const { cityId } = useParams();
	const { isAuth } = useAuth();

	const currentCity = checkCurrentCity(cities, cityId);
	const isLiked = isItemInArr(cities, cityId)
		? isItemInArr(currentCity.places, placeId) ||
		  isItemInArr(currentCity.visited, placeId)
		: false;

	const placeObj = {
		id: placeId,
		name,
		photos,
		address,
		district,
		category,
		rating,
		subcategory,
	};

	const { handlePlace, erasePlace } = useHandlePlace({
		cities,
		cityId,
		placeObj,
		currentCity,
		likes,
	});

	const subcategoryIcon = checkSubcategoryIcon(subcategory);

	return (
		<li className={`place-card__item ${darkTheme ? 'dark-card' : ''}`}>
			{subcategoryIcon}
			<button
				className='button button--like place-card__like-button'
				onClick={
					isAuth
						? () => (isLiked ? erasePlace() : handlePlace())
						: () => dispatch(toggleModalOpen())
				}
			>
				<HiHeart
					className={`place-card__like-icon ${
						isLiked ? 'place-card__like-icon--liked' : ''
					}`}
				/>
			</button>
			<Link to={`${placeId}/info`} className='link place-card__link'>
				<div className='place-card__img'>
					<img src={photos} alt={name} className='image' />
				</div>
				<div className='place-card__info'>
					<span className='place-card__name'>
						{name.length > 40 ? `${name.slice(0, 40)}...` : name}
					</span>
					<div className='place-card__text'>
						<span className='place-card__place'>
							<MdLocationPin
								size='14'
								fill='currentColor'
								className='place-card__icon--geo'
							/>
							{`${address}, р-н ${district}`}
						</span>
						<div className='place-card__stats'>
							<div className='place-card__stats-item'>
								<FaRegStar
									size='12'
									fill='currentColor'
									className='place-card__icon--stats'
								/>
								<span>{rating}</span>
							</div>
							<div className='place-card__stats-item'>
								<FaRegHeart
									size='12'
									fill='currentColor'
									className='place-card__icon--stats'
								/>
								<span>{likes}</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};
export default PlaceCard;
