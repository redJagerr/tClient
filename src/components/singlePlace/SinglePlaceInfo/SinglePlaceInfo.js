import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectPlaceDataInfo } from 'redux/selectors/placeSelectors';
import Map from 'components/mapGis/Map/Map';

import { v4 } from 'uuid';
import { FiClock } from 'react-icons/fi';
import { BiWorld } from 'react-icons/bi';
import { MdLocalPhone } from 'react-icons/md';
import SinglePlaceSocialInfo from '../SinglePlaceSocialInfo/SinglePlaceSocialInfo';
import SinglePlaceInfoContact from '../SinglePlaceInfoContact/SinglePlaceInfoContact';
import SinglePlaceWorkTime from '../SinglePlaceWorkTime/SinglePlaceWorkTime';
import SinglePlaceScheduleItem from '../SinglePlaceScheduleItem/SinglePlaceScheduleItem';

const SinglePlaceInfo = () => {
	const [schedule, setSchedule] = useState(false);
	const darkTheme = useSelector(selectDarkTheme);
	const { phone, social, website, worktime, location } =
		useSelector(selectPlaceDataInfo);

	const toggleSchedule = () => {
		setSchedule(!schedule);
	};

	const isNoWorkTime = worktime.length !== 0;
	const isAroudTheClock = !!(
		worktime.length === 1 && worktime[0].name === 'Круглосуточно'
	);

	const contactsInfo = phone.map(({ name, phone }) => (
		<SinglePlaceInfoContact name={name} phone={phone} />
	));

	const workTimeInfo = isNoWorkTime ? (
		<SinglePlaceWorkTime
			worktime={worktime}
			handleClick={() => toggleSchedule()}
		/>
	) : (
		<span className='single-place-info__no-time'>График работы не указан</span>
	);

	const webSiteInfo =
		website.length !== 0 ? (
			<div className='single-place-info__link'>
				<a href={website} className='link single-place-info__site'>
					{website}
				</a>
			</div>
		) : (
			<span className='single-place-info__no-time'>Сайт не указан</span>
		);

	const workScheduleInfo = worktime.map(({ name, start, end }) => (
		<SinglePlaceScheduleItem name={name} start={start} end={end} />
	));

	return (
		<div className='single-place-info__container'>
			<div
				className={`single-place-info__items ${darkTheme ? 'dark-card' : ''}`}
			>
				<MdLocalPhone
					className={`single-place-info__icon single-place-info__icon--phoneSingle ${
						darkTheme ? 'dark-icon' : ''
					}`}
				/>
				<div className='single-place-info__contact'>
					<span className='single-place-info__title'>Контакты</span>
					<ul className='list single-place-info__phone-list'>
						{phone.length === 0 ? (
							<span className='single-place-info__no-time'>
								Контакты не указаны
							</span>
						) : (
							contactsInfo
						)}
					</ul>
				</div>
				<FiClock
					className={`single-place-info__icon ${darkTheme ? 'dark-icon' : ''}`}
				/>
				<div className='single-place-info__work-time'>
					<span className='single-place-info__title'>Время работы</span>
					{isAroudTheClock ? (
						<span className='single-place-info__work-status'>
							Круглосуточно
						</span>
					) : (
						workTimeInfo
					)}
				</div>
				{schedule && isNoWorkTime ? (
					<ul className='list single-place-info__schedule-list'>
						{workScheduleInfo}
					</ul>
				) : null}
				<BiWorld
					className={`single-place-info__icon ${darkTheme ? 'dark-icon' : ''}`}
				/>{' '}
				{webSiteInfo}
				{social.length !== 0 && <SinglePlaceSocialInfo social={social} />}
			</div>
			<Map location={location} />
		</div>
	);
};
export default SinglePlaceInfo;
