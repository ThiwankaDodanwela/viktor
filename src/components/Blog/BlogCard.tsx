import React from "react";
import DefaultImage from "../../assets/images/default-image.jpg";
import styles from "./BlogCard.module.scss";

interface Author {
	id: number;
	full_name: string;
	created_at: string;
	avatar?: Avatar;
}

interface ImageFormat {
	path: string | null;
	url: string;
}

interface CoverImage {
	id: number;
	name: string;
	alternativeText: string;
	formats: {
		medium?: ImageFormat;
	};
}

interface Avatar {
	formats: {
		thumbnail?: ImageFormat;
	};
}

interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	body: string;
	publication_date: string;
	author: Author;
	cover?: CoverImage;
}

interface BlogCardProps {
	post: BlogPost;
	getImageUrl: (url: string) => string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, getImageUrl }) => {
	return (
		<div className="col-12 col-lg-4 mb-5">
			<div className={`${styles.card} h-100`}>
				<div className={styles.cardImage}>
					<img
						src={
							post.cover?.formats
								?.medium
								? getImageUrl(
										post
											.cover
											.formats
											.medium
											.url
								  )
								: DefaultImage
						}
						alt={
							post.cover
								?.alternativeText ||
							post.title
						}
					/>
				</div>
				<div className={styles.cardBody}>
					<div className={styles.date}>
						{new Date(
							post.publication_date
						).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</div>
					<div className={styles.authorDetails}>
						<img
							src={
								post.author
									?.avatar
									?.formats
									?.thumbnail
									? getImageUrl(
											post
												.author
												.avatar
												.formats
												.thumbnail
												.url
									  )
									: DefaultImage
							}
							alt={
								post.author
									?.full_name ||
								"Author"
							}
							className={
								styles.avatar
							}
						/>
						<span className={styles.date}>
							By{" "}
							{post.author
								?.full_name ||
								"Author"}
						</span>
					</div>
					<a
						href="/"
						className={styles.titleLink}
					>
						<h3
							className={
								styles.cardTitle
							}
						>
							{post.title}
						</h3>
					</a>

					<p className={styles.cardText}>
						{post.excerpt}
					</p>
					<a href="/" className={styles.textLink}>
						Read More
					</a>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
