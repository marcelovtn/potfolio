import { useState } from 'react';

/*
 * A poster with a play button. The YouTube player, its scripts and its cookies
 * are not requested until the visitor clicks, so the trailer costs the page one
 * lazily decoded WebP and nothing else. nocookie keeps it that way after the
 * click too.
 */

type Props = {
	youtubeId: string;
	poster: string;
	play: string;
	title: string;
};

const Trailer = ({ youtubeId, poster, play, title }: Props) => {
	const [started, setStarted] = useState(false);

	return (
		<div className="trailer">
			{started ? (
				<iframe
					className="trailer__frame"
					src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
					title={title}
					allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
					allowFullScreen
				/>
			) : (
				<button type="button" className="trailer__poster" onClick={() => setStarted(true)}>
					<img
						className="trailer__img"
						src={poster}
						alt=""
						width={960}
						height={540}
						loading="lazy"
						decoding="async"
					/>
					<span className="trailer__play">
						<svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false">
							<path d="M4 2.5v11l9-5.5z" />
						</svg>
						{play}
					</span>
				</button>
			)}
		</div>
	);
};

export default Trailer;
