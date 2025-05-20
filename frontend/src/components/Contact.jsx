export default function Contact() {
    return (
        <div id="contact" className="section db">
        <div className="container">
            <div className="section-title text-left">
                <h3>Contact</h3>
                <p>Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus.</p>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="contact_form">
                        <div id="message"></div>
                        <form id="contactForm" name="sentMessage" noValidate="novalidate">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input className="form-control" id="name" type="text" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name."/>
										<p className="help-block text-danger"></p>
									</div>
									<div className="form-group">
										<input className="form-control" id="email" type="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email address."/>
										<p className="help-block text-danger"></p>
									</div>
									<div className="form-group">
										<input className="form-control" id="phone" type="tel" placeholder="Your Phone" required="required" data-validation-required-message="Please enter your phone number."/>
										<p className="help-block text-danger"></p>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<textarea className="form-control" id="message" placeholder="Your Message" required="required" data-validation-required-message="Please enter a message."></textarea>
										<p className="help-block text-danger"></p>
									</div>
								</div>
								<div className="clearfix"></div>
								<div className="col-lg-12 text-center">
									<div id="success"></div>
									<button id="sendMessageButton" className="sim-btn btn-hover-new" data-text="Send Message" type="submit">Send Message</button>
								</div>
							</div>
						</form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );}