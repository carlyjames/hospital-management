import { FadeLoader } from "react-spinners";


const Loader = ({ text = "Loading..." }) => {
	return (
		<div className="fixed inset-0 bg-black/80 bg-opacity-50 flex flex-col items-center justify-center z-50">
			<div className="relative ">
				<FadeLoader
					color="#ffffff"
					width={10}
					height={10}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
			<p className="mt-6 text-sm font-semibold text-white">{text}</p>
		</div>
	);
};

export default Loader;

