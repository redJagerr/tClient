import { v4 } from 'uuid';

const SinglePlaceScheduleItem = ({ name, start, end }) => (
	<li className='single-place-info__schedule-item' key={v4()}>
		<span className='single-place-info__schedule-text'>{name}</span>
		<span className='single-place-info__schedule-text'>
			| {start}-{end}
		</span>
	</li>
);

export default SinglePlaceScheduleItem;
