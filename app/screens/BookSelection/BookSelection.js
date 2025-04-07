import BookTile from './BookTile.js';
import Slider from "./Slider.js";

export default function BookSelection({ book_list, setCurrBook }) {
	
	const props = {'data': book_list,
					'activeSlide': 0,
					'setCurrBook': setCurrBook};

	return (
		
		<Slider props={props}/>
	);
}
