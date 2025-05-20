export default function Gallery() {
    return (
        <div id="gallery" className="section lb">
		<div className="container">
			<div className="section-title text-left">
                <h3>Gallery</h3>
            </div>
			
			<div className="gallery-menu row">
				<div className="col-md-12">
					<div className="button-group filter-button-group text-left">
						<button className="active" data-filter="*">All</button>
						<button data-filter=".gal_a">Career</button>
						<button data-filter=".gal_b">Travel</button>
						<button data-filter=".gal_c">Hobbies</button>
					</div>
				</div>
			</div>
			
			<div className="gallery-list row">
				<div className="col-md-4 col-sm-6 gallery-grid gal_a gal_b">
					<div className="gallery-single fix">
						<img src="uploads/gallery_img-01.jpg" className="img-fluid" alt="Image"/>
						<div className="img-overlay">
							<a href="uploads/gallery_img-01.jpg" data-rel="prettyPhoto[gal]" className="hoverbutton global-radius"><i className="fa fa-picture-o"></i></a>
						</div>
					</div>
				</div>
				
				<div className="col-md-4 col-sm-6 gallery-grid gal_c gal_b">
					<div className="gallery-single fix">
						<img src="uploads/gallery_img-02.jpg" className="img-fluid" alt="Image"/>
						<div className="img-overlay">
							<a href="uploads/gallery_img-02.jpg" data-rel="prettyPhoto[gal]" className="hoverbutton global-radius"><i className="fa fa-picture-o"></i></a>
						</div>
					</div>
				</div>
				
				<div className="col-md-4 col-sm-6 gallery-grid gal_a gal_c">
					<div className="gallery-single fix">
						<img src="uploads/gallery_img-03.jpg" className="img-fluid" alt="Image"/>
						<div className="img-overlay">
							<a href="uploads/gallery_img-03.jpg" data-rel="prettyPhoto[gal]" className="hoverbutton global-radius"><i className="fa fa-picture-o"></i></a>
						</div>
					</div>
				</div>
				
				<div className="col-md-4 col-sm-6 gallery-grid gal_b gal_a">
					<div className="gallery-single fix">
						<img src="uploads/gallery_img-04.jpg" className="img-fluid" alt="Image"/>
						<div className="img-overlay">
							<a href="uploads/gallery_img-04.jpg" data-rel="prettyPhoto[gal]" className="hoverbutton global-radius"><i className="fa fa-picture-o"></i></a>
						</div>
					</div>
				</div>
				
				<div className="col-md-4 col-sm-6 gallery-grid gal_a gal_c">
					<div className="gallery-single fix">
						<img src="uploads/gallery_img-05.jpg" className="img-fluid" alt="Image"/>
						<div className="img-overlay">
							<a href="uploads/gallery_img-05.jpg" data-rel="prettyPhoto[gal]" className="hoverbutton global-radius"><i className="fa fa-picture-o"></i></a>
						</div>
					</div>
				</div>
				
				<div className="col-md-4 col-sm-6 gallery-grid gal_c gal_a">
					<div className="gallery-single fix">
						<img src="uploads/gallery_img-06.jpg" className="img-fluid" alt="Image"/>
						<div className="img-overlay">
							<a href="uploads/gallery_img-06.jpg" data-rel="prettyPhoto[gal]" className="hoverbutton global-radius"><i className="fa fa-picture-o"></i></a>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
    );
    }