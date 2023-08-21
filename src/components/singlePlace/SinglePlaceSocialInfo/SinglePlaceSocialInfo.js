import pickSocialIcon from 'utils/pickSocialIcon';
import { v4 } from 'uuid';

const SinglePlaceSocialInfo = ({ social }) => (
	<ul className='list single-place-info__social-list'>
		{social.map(({ type, link }) => (
			<li className='single-place-info__social-item' key={v4()}>
				<a
					href={link}
					className='link single-place-info__link single-place-info__link--social'
				>
					{pickSocialIcon(type)}
				</a>
			</li>
		))}
	</ul>
);

export default SinglePlaceSocialInfo;
