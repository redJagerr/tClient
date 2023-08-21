import { MdFastfood, MdTheaterComedy, MdPark } from 'react-icons/md';
import { GiMedievalGate } from 'react-icons/gi';
import { IoCamera } from 'react-icons/io5';

const iconClassName = 'place-categories__icon';
export const chooseCategoryIcon = category => {
	switch (category) {
		case 'f00':
			return <MdFastfood className={iconClassName} />;
		case 'c00':
			return <MdTheaterComedy className={iconClassName} />;
		case 'p00':
			return <MdPark className={iconClassName} />;
		case 'd00':
			return <IoCamera className={iconClassName} />;
		case 'a00':
			return <GiMedievalGate className={iconClassName} />;
		default:
	}
};
