import { MdKeyboardArrowDown } from 'react-icons/md';
import checkPlaceOpen from 'utils/checkPlaceOpen';

const SinglePlaceWorkTime = ({ worktime, handleClick }) => {
	const { isOpen, startTime, endTime, nextDayStart } = checkPlaceOpen(worktime);
	return (
		<>
			<span
				className={`single-place-info__work-status ${
					!isOpen && 'single-place-info__work-status--closed'
				}`}
			>
				{isOpen ? 'Открыто' : `Закрыто до ${nextDayStart}`}
			</span>
			<span className='single-place-info__time'>
				{isOpen ? `с ${startTime} до ${endTime}` : ''}
			</span>
			<button
				className='button single-place-info__more-button'
				onClick={handleClick}
			>
				График <MdKeyboardArrowDown size={18} />
			</button>
		</>
	);
};

export default SinglePlaceWorkTime;
