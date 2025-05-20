export default function Blog() {
    return (
        <div id="blog" className="section lb">
		<div className="container">
			<div className="section-title text-left">
                <h3>Blog</h3>
                <p>Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus.</p>
            </div>
			
			<div className="row">
				<div className="col-md-4 col-sm-6 col-lg-4 linkedin-post-container">
					<iframe 
						src="https://www.linkedin.com/embed/feed/update/urn:li:share:7272648448472981505?collapsed=1" 
						frameBorder="0" 
						allowFullScreen 
						title="Embedded post"
					></iframe>

				</div>
				<div className="col-md-4 col-sm-6 col-lg-4 linkedin-post-container">
					<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7282074958439084033?collapsed=1" height="671" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
				</div>
				<div className="col-md-4 col-sm-6 col-lg-4 linkedin-post-container">
					<iframe 
						src="https://www.linkedin.com/embed/feed/update/urn:li:share:7272648448472981505?collapsed=1" 
						frameBorder="0" 
						allowFullScreen 
						title="Embedded post"
					></iframe>
				</div>

			</div>
			
		</div>
	</div>
    );}