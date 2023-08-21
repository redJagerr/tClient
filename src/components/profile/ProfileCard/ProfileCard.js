import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlace, postPlace } from 'redux/slices/userSlice';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';

import { checkSubcategoryIcon } from 'utils/checkSubcategoryIcon';
import { Reorder } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { MdLocationPin } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const ProfileCard = ({ item, visited }) => {
	const dispatch = useDispatch();
	const { cityId } = useParams();

	const darkTheme = useSelector(selectDarkTheme);

	const themeClass = darkTheme ? 'dark-card' : '';

	const dndFix = event => {
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	};

	const handleErasePlace = () => {
		dispatch(
			deletePlace({
				place: {
					id: item.id,
				},
				cityId,
				type: visited ? 'deleteVisitedPlace' : 'deletePlace',
				both: true,
				placeObj: null,
			})
		);
	};

	const handleAddPlace = () => {
		dispatch(
			deletePlace({
				cityId,
				type: visited ? 'deleteVisitedPlace' : 'deletePlace',
				place: {
					id: item.id,
				},
				both: false,
				placeObj: item,
			})
		);
		dispatch(
			postPlace({
				cityId,
				placeObj: item,
				type: visited ? 'places' : 'visited',
				isChangingStatus: true,
			})
		);
	};

	let drag = false;
	const subcategoryIcon = checkSubcategoryIcon(item.subcategory);

	return (
		<Reorder.Item
			whileDrag={{
				scale: 1.05,
			}}
			key={item.id}
			value={item}
			className={`link profile-cards__item ${themeClass} ${
				visited === true ? 'profile-cards__item--visited' : ''
			}`}
		>
			<Link
				to={`/${cityId}/places/${item.id}/info`}
				className='profile-cards__link'
				onMouseDown={e => {
					drag = false;
					dndFix(e);
				}}
				onMouseMove={e => {
					drag = true;
				}}
				onClick={e => {
					if (drag) e.preventDefault();
				}}
			/>
			<div className='profile-cards__img'>
				{subcategoryIcon}
				<img src={item.photos} alt={item.name} className='image' />
			</div>
			<div className='profile-cards__text'>
				<span className='profile-cards__name'>
					{item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}
				</span>
				<span className='profile-cards__place'>
					<MdLocationPin
						size='14'
						fill='currentColor'
						className='profile-cards__icon'
					/>
					{item.address}
				</span>
			</div>
			<div className='profile-cards__buttons'>
				<button
					className='profile-cards__button profile-cards__button--delete'
					onClick={() => handleErasePlace()}
				>
					<MdDelete className='profile-cards__button-icon' />
				</button>
				<button
					className='profile-cards__button profile-cards__button--add'
					onClick={() => {
						handleAddPlace();
					}}
				>
					{visited ? (
						<MdClose className='profile-cards__button-icon' />
					) : (
						<FiCheck className='profile-cards__button-icon' />
					)}
				</button>
			</div>
		</Reorder.Item>
	);
};
export default ProfileCard;
