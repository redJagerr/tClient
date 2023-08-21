import { IoRestaurant, IoCafe, IoFastFood } from 'react-icons/io5';
import {
	FaGlassCheers,
	FaChurch,
	FaMonument,
	FaTheaterMasks,
} from 'react-icons/fa';
import { GiSpookyHouse, GiParkBench, GiFlowerEmblem } from 'react-icons/gi';
import {
	MdPlace,
	MdMuseum,
	MdMovie,
	MdPalette,
	MdNature,
} from 'react-icons/md';
import { RiBankFill } from 'react-icons/ri';

const iconClassNames = 'place-card__icon place-card__icon--';

export const checkSubcategoryIcon = subcategory => {
	switch (subcategory) {
		case 'f00res':
			return <IoRestaurant className={`${iconClassNames}food`} fill='white' />;
		case 'f00caf':
			return <IoCafe className={`${iconClassNames}food`} fill='white' />;
		case 'f00fas':
			return <IoFastFood className={`${iconClassNames}food`} fill='white' />;
		case 'f00bar':
			return <FaGlassCheers className={`${iconClassNames}food`} fill='white' />;
		case 'a00bld':
			return (
				<GiSpookyHouse className={`${iconClassNames}architect`} fill='white' />
			);
		case 'a00chr':
			return <FaChurch className={`${iconClassNames}architect`} fill='white' />;
		case 'd00sta':
			return <FaMonument className={`${iconClassNames}attract`} fill='white' />;
		case 'd00plc':
			return <MdPlace className={`${iconClassNames}attract`} fill='white' />;
		case 'd00bld':
			return <RiBankFill className={`${iconClassNames}attract`} fill='white' />;
		case 'с00mus':
			return <MdMuseum className={`${iconClassNames}culture`} fill='white' />;
		case 'c00the':
			return (
				<FaTheaterMasks className={`${iconClassNames}culture`} fill='white' />
			);
		case 'c00cin':
			return <MdMovie className={`${iconClassNames}culture`} fill='white' />;
		case 'c00art':
			return <MdPalette className={`${iconClassNames}culture`} fill='white' />;
		case 'p00old':
			return <MdNature className={`${iconClassNames}parks`} fill='white' />;
		case 'p00imp':
			return <GiParkBench className={`${iconClassNames}parks`} fill='white' />;
		case 'c00grd':
			return (
				<GiFlowerEmblem className={`${iconClassNames}parks`} fill='white' />
			);
		default:
	}
};
