import React, { useRef, useEffect, useState } from "react";

import { TweenLite, Power3 } from "gsap";

import "./App.css";
import leftArrow from "./images/left-arrow.svg";
import rightArrow from "./images/right-arrow.svg";
import image_1 from "./images/image_1.jpg";
import image_2 from "./images/image_2.jpg";
import image_3 from "./images/image_3.jpg";

const testimonials = [
	{
		name: "Julia Cameron",
		title: "Creative Director, VISA",
		image: image_1,
		quote:
			"It's all good. I was amazed at the quality of the design. We've seen amazing results already.",
	},
	{
		name: "Mark Jacobs",
		title: "Tech Lead, Google",
		image: image_2,
		quote:
			"The rebranding has really helped our business. Definately worth the investment.",
	},
	{
		name: "Lisa Bearings",
		title: "Brand Coordinator, Facebook",
		image: image_3,
		quote:
			"The service was excellent. Absolutely wonderful! A complete redesign did it for us.",
	},
];

function App() {
	let imageList = useRef(null);
	let testimonialList = useRef(null);

	const [state, setState] = useState({
		isActive1: true,
		isActive2: false,
		isActive3: false,
	});

	useEffect(() => {
		TweenLite.to(testimonialList.children[0], 1, {
			autoAlpha: 1,
		});
	}, []);

	const slideLeft = (index, duration, multiplied = 1) => {
		TweenLite.to(imageList.children[index], duration, {
			x: -319.44 * multiplied,
			ease: Power3.easeOut,
		});
	};

	const slideRight = (index, duration, multiplied = 1) => {
		TweenLite.to(imageList.children[index], duration, {
			x: -319.44 * multiplied,
			ease: Power3.easeOut,
		});
	};

	const scale = (index, duration) => {
		TweenLite.from(imageList.children[index], duration, {
			scale: 1.2,
			ease: Power3.easeOut,
		});
	};

	const animateContent = (first, second) => {
		TweenLite.to(testimonialList.children[first], 1, {
			opacity: 0,
		});

		TweenLite.to(testimonialList.children[second], 1, {
			opacity: 1,
			ease: Power3.easeOut,
			delay: 1,
		});
	};
	const nextSlide = () => {
		if (imageList.children[0].classList.contains("active")) {
			setState({ isActive1: false, isActive2: true, isActive3: false });

			slideLeft(0, 1, 1);
			slideLeft(1, 1, 1);
			slideLeft(2, 1, 1);

			scale(1, 1);

			animateContent(0, 1);

			console.log("First Invoked");
		} else if (imageList.children[1].classList.contains("active")) {
			setState({ isActive1: false, isActive2: false, isActive3: true });

			slideLeft(0, 1, 2);
			slideLeft(1, 1, 2);
			slideLeft(2, 1, 2);
			scale(2, 1);

			animateContent(1, 2);
		} else if (imageList.children[2].classList.contains("active")) {
			setState({ isActive1: true, isActive2: false, isActive3: false });

			slideLeft(0, 1, 0);
			slideLeft(1, 1, 0);
			slideLeft(2, 1, 0);

			scale(0, 1);

			animateContent(2, 0);
		}
	};

	const backSlide = () => {
		if (imageList.children[0].classList.contains("active")) {
			setState({ isActive1: false, isActive2: false, isActive3: true });

			slideRight(0, 1, 2);
			slideRight(1, 1, 2);
			slideRight(2, 1, 2);

			scale(2, 1);

			animateContent(0, 2);
		} else if (imageList.children[1].classList.contains("active")) {
			setState({ isActive1: true, isActive2: false, isActive3: false });

			slideRight(0, 1, 0);
			slideRight(1, 1, 0);
			slideRight(2, 1, 0);
			scale(0, 1);

			animateContent(1, 0);
		} else if (imageList.children[2].classList.contains("active")) {
			setState({ isActive1: false, isActive2: true, isActive3: false });

			slideRight(0, 1, 1);
			slideRight(1, 1, 1);
			slideRight(2, 1, 1);
			scale(1, 1);

			animateContent(2, 1);
		}
	};

	return (
		<div className="App">
			<div className="slider__box">
				<div className="circle"></div>
				<div className="arrow left" onClick={backSlide}>
					<span>
						<img src={leftArrow} alt="" />
					</span>
				</div>
				<div className="content__box">
					<div className="image__holder">
						<ul ref={(el) => (imageList = el)}>
							{testimonials.map((each, i) => {
								return (
									<li
										key={i}
										className={`${
											eval(`state.isActive${i + 1}`)
												? "active"
												: ""
										}`}
									>
										<img src={each.image} alt="" />
									</li>
								);
							})}
						</ul>
					</div>
					<div className="info__holder">
						<ul ref={(el) => (testimonialList = el)}>
							{testimonials.map((each, i) => {
								return (
									<li
										key={i}
										className={`${
											eval(`state.isActive${i + 1}`)
												? "active"
												: ""
										}`}
									>
										<p className="info__quote">
											{each.quote}
										</p>
										<p className="info__name">
											{each.name}
										</p>
										<p className="info__designation">
											{each.title}
										</p>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="arrow right" onClick={nextSlide}>
					<span>
						<img src={rightArrow} alt="" />
					</span>
				</div>
			</div>
		</div>
	);
}

export default App;
