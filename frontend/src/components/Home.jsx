import { useEffect, useState } from 'react';
import { client } from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home() {
  const [banner, setBanner] = useState({ image: '', note: '' });

  useEffect(() => {
    client
      .fetch(`*[_type == "banner"][0]{ bannerNote, imgUrl }`)
      .then(data => {
        if (data?.imgUrl) {
          setBanner({
            note: data.bannerNote,
            image: urlFor(data.imgUrl).url(),
          });
        }
      });
  }, []);

  return (
    <section
      id="home"
      className="main-banner parallaxie"
      style={{
        backgroundImage: banner.image ? `url(${banner.image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="heading">
        <p>{banner.note || 'I am Helen...'}</p>
      </div>
    </section>
  );
}
