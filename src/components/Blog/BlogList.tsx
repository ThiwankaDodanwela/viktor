import React, { useEffect, useState } from "react";
import { BLOGPOST_API_URL } from "../../config";
import BlogCard from "./BlogCard";
import Pagination from "../common/Pagination";
import styles from "./BlogList.module.scss";

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

const BlogList: React.FC = () => {
	const [posts, setPost] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const postPerPage = 6;
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const responce = await fetch(BLOGPOST_API_URL);
				if (!responce.ok)
					throw new Error(
						"Failed to fetch blog posts"
					);
				const data = await responce.json();
				setPost(data);
			} catch (err: any) {
				setError(err.message || "Smothing went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, []);

	const filteredPosts = posts.filter(
		(post) =>
			post.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			post.excerpt
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
	);

	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = filteredPosts.slice(
		indexOfFirstPost,
		indexOfLastPost
	);
	const totalPages = Math.ceil(filteredPosts.length / postPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};
	const clearText = () => {
		setSearchQuery("");
	};
	const getImageUrl = (url: string) => {
		const BASE_URL = process.env.REACT_APP_BASE_URL || "";
		const sanitizedBase = BASE_URL.endsWith("/")
			? BASE_URL.slice(0, -1)
			: BASE_URL;
		const sanitizedUrl = url.startsWith("/") ? url.slice(1) : url;
		return url.startsWith("http")
			? url
			: `${sanitizedBase}/${sanitizedUrl}`;
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className={styles.wrapper}>
			<div className="container">
				<div className={styles.searchWrapper}>
					<input
						type="text"
						className="form-control"
						placeholder="Search posts..."
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={clearText}
							className={
								styles.clearBtn
							}
						>
							&times;
						</button>
					)}
				</div>
				<div className="row">
					{currentPosts.map((post) => (
						<BlogCard
							key={post.id}
							post={post}
							getImageUrl={
								getImageUrl
							}
						/>
					))}
				</div>
			</div>

			{/* Pagination */}
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default BlogList;
