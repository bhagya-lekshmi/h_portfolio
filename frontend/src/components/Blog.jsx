import React, { useEffect, useState } from 'react';
import { client } from '../client'; // your sanity client setup

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const query = `*[_type == "blog"] | order(_createdAt desc) {
      _id,
      title,
      platform,
      embedUrl
    }`;

    client.fetch(query).then((data) => {
      setPosts(data);
    });
  }, []);
    return (
        <div id="blog" className="section lb">
		<div className="container">
			<div className="section-title text-left">
                <h3>Blog</h3>
                <p>Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus.</p>
            </div>
			
			<div className="row">
				{posts.map((post) => (
				<div className="col-md-4 col-sm-6 col-lg-4 linkedin-post-container">
					<iframe 
						src={post.embedUrl} 
						frameBorder="0" 
						allowFullScreen 
						title="Embedded post"
					></iframe>

				</div>
				))}


			</div>
			
		</div>
	</div>
    );}
