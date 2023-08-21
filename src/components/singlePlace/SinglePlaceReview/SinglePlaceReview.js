import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { Rating } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

const SinglePlaceReview = ({ name, rating, text, photo, isUserReview }) => {
	const [reviewHidden, setReviewHidden] = useState(true);
	const darkTheme = useSelector(selectDarkTheme);
	return (
		<div
			className={`single-place-review__container ${
				isUserReview ? 'single-place-review__container--user' : ''
			}
				${darkTheme ? 'single-place-review__container--dark' : ''}`}
		>
			<div className='single-place-review__user'>
				<div className='single-place-review__photo'>
					<img src={`/${photo}`} alt='' className='image' />
					<FaUserCircle className='header__profile-icon' />
				</div>
				<div className='single-place-review__info'>
					<span className='place-review__name'>{name}</span>
					<Rating
						sx={{ color: '#3359e6' }}
						defaultValue={Number(rating)}
						readOnly
						emptyIcon={null}
					/>
				</div>
			</div>
			<span className='single-place-review__review'>{`${text.slice(0, 300)}${
				reviewHidden && text.length >= 300 ? '...' : `${text.slice(300)}`
			}`}</span>
			{text.length >= 300 ? (
				<span
					className='single-place-review__more'
					onClick={() => setReviewHidden(!reviewHidden)}
				>
					{reviewHidden ? 'Читать полностью' : 'Скрыть'}
				</span>
			) : null}
		</div>
	);
};
export default SinglePlaceReview;
