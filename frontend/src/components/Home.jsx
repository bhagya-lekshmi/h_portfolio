import bannerImage from '/uploads/h_bnr2.jpg';

export default function Home() {
    return (
        <section id="home" className="main-banner parallaxie" 
        style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="heading">
                <h1>Hello...</h1>
                <p>
                    I’m an assistant professor who enjoys inspiring and guiding students,<br />
                    kind of like a cognitive coach helping them grow and learn.
                </p>
            </div>
        </section>
    );
  }
  