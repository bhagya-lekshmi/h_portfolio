import React, { useEffect, useMemo, useState } from 'react';
import { client } from '../client';
import { PortableText } from '@portabletext/react';

// ---------- helpers ----------
const groupResearchItems = (items) => {
  const grouped = {};
  items.forEach((item) => {
    const categoryKey = item.category?.toLowerCase() || 'other';
    const year = item.date ? new Date(item.date).getFullYear().toString() : 'Unknown Year';
    grouped[categoryKey] ??= {};
    grouped[categoryKey][year] ??= [];
    grouped[categoryKey][year].push(item);
  });

  Object.keys(grouped).forEach((cat) => {
    Object.keys(grouped[cat]).forEach((yr) => {
      grouped[cat][yr].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    });
    grouped[cat] = Object.fromEntries(
      Object.entries(grouped[cat]).sort(([a], [b]) => b.localeCompare(a))
    );
  });
  return grouped;
};

const getDisplayTitle = (key) => {
  if (key === 'periodical') return 'Articles in Periodicals';
  if (key === 'journals') return 'Articles in Journals';
  if (key === 'talks') return 'Invited Talks';
  if (key === 'patents') return 'Patents';
  if (key === 'books') return 'Books';
  if (key === 'chapters') return 'Book Chapters/Articles';
  if (key === 'participation') return 'Seminars/Conferences';
  if (key === 'thesis') return 'PhD Thesis';
  if (key === 'guided') return 'PhD Guided/Adjudicated';
  if (key === 'projects') return 'Research Projects';
  if (key === 'workshops') return 'Workshop/FDP/Training Programme';
  if (key === 'awards') return 'Awards/Achievements/Others';
  if (key === 'copyright') return 'Copyrights';
  return key.replace(/\b\w/g, (m) => m.toUpperCase());
};

// ---------- component ----------
export default function Research() {
  const [researchItems, setResearchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // 👈 NEW

  // fetch
  useEffect(() => {
    client
      .fetch(`*[_type == "research"] | order(date desc) {
        _id, title, subtitle, location, category, date,
        periodicalName, periodicity, description
      }`)
      .then((data) => {
        setResearchItems(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const groupedItems = useMemo(() => groupResearchItems(researchItems), [researchItems]);

  // categories A→Z by display name
  const sortedCategoryKeys = useMemo(() => {
    const keys = Object.keys(groupedItems);
    return keys.sort((a, b) =>
      getDisplayTitle(a).toLowerCase().localeCompare(getDisplayTitle(b).toLowerCase())
    );
  }, [groupedItems]);

  // set initial category
  useEffect(() => {
  if (!isMobile && sortedCategoryKeys.length > 0 && !activeCategory) {
    setActiveCategory(sortedCategoryKeys[0]);
  }
}, [sortedCategoryKeys, activeCategory, isMobile]);

  // ✅ detect mobile (Bootstrap md breakpoint ~768px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // scroll helpers (desktop only)
  const getHeaderOffset = () => {
    const headerEl = document.querySelector('.site-header, header, .navbar, .topbar');
    return headerEl ? headerEl.getBoundingClientRect().height + 8 : 80;
  };
  const scrollToCategory = (categoryKey) => {
    if (isMobile) return; // 👈 on mobile we open inline, no right-pane scroll
    const panelId = `category-panel-${categoryKey}`;
    const el = document.getElementById(panelId);
    if (!el) return;
    const HEADER_OFFSET = getHeaderOffset();
    const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setTimeout(() => {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }, 350);
  };
  useEffect(() => {
    if (activeCategory) scrollToCategory(activeCategory);
  }, [activeCategory]); // desktop only actually scrolls

  const toggleArticle = (id) => {
    setActiveArticleId((prev) => (prev === id ? null : id));
  };

  const renderYearSections = (yearData) => {
    if (!yearData || Object.keys(yearData).length === 0) {
      return <p className="p-3 text-muted">No articles found in this category.</p>;
    }
    const years = Object.keys(yearData).sort((a, b) => {
      if (a === 'Unknown Year') return 1;
      if (b === 'Unknown Year') return -1;
      return Number(b) - Number(a);
    });

    return (
      <div className="research-year-list">
        {years.map((year) => (
          <div className="research-year-block" key={year}>
            <div className="research-year-header">
              <h5 className="mb-0">{year}</h5>
            </div>

            <div className="research-accordion" role="tablist" aria-label={`Articles in ${year}`}>
              {yearData[year].map((item) => {
                const open = activeArticleId === item._id;
                return (
                  <div className={`research-article ${open ? 'open' : ''}`} key={item._id}>
                    <button
                      className="research-article-btn"
                      aria-expanded={open}
                      aria-controls={`article-panel-${item._id}`}
                      id={`article-header-${item._id}`}
                      onClick={() => toggleArticle(item._id)}
                      type="button"
                    >
                      <span className="title">{item.title}</span>
                      <span className="indicator" aria-hidden="true">
                        {open ? '−' : '+'}
                      </span>
                    </button>

                    <div
                      id={`article-panel-${item._id}`}
                      className={`research-article-panel ${open ? 'show' : ''}`}
                      role="region"
                      aria-labelledby={`article-header-${item._id}`}
                    >
                      <div className="panel-inner">
                        {item.description && (
                          <div className="research-description">
                            <PortableText value={item.description} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Loading Research Works...</div>;
  if (researchItems.length === 0) return <div>No research works found.</div>;

  // ---------- RENDER ----------
  return (
    <section id="research" className="section lb research-section">
      <div className="container">
        <div className="section-title text-left">
          <h3>Portfolio</h3>
        </div>

        {/* MOBILE: accordion list — content opens right below the category */}
        {isMobile ? (
          <div className="vertical-research-menu-mobile" role="tablist">
            {sortedCategoryKeys.map((categoryKey) => {
              const open = activeCategory === categoryKey;
              return (
                <div className="mobile-cat-block" key={categoryKey}>
                  <button
                    type="button"
                    className={`list-group-item list-group-item-action research-cat-btn ${
                      open ? 'active' : ''
                    }`}
                    aria-expanded={open}
                    aria-controls={`mobile-cat-panel-${categoryKey}`}
                    onClick={() => {
                      setActiveArticleId(null);
                      setActiveCategory((prev) => (prev === categoryKey ? '' : categoryKey));
                    }}
                  >
                    {getDisplayTitle(categoryKey)}
                    <span className="indicator" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>

                  <div
                    id={`mobile-cat-panel-${categoryKey}`}
                    className={`mobile-cat-panel ${open ? 'show' : ''}`}
                    role="region"
                  >
                    {open && renderYearSections(groupedItems[categoryKey])}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // DESKTOP/TABLET: two-column layout
          <div className="row">
            <div className="col-md-3">
              <div className="list-group vertical-research-menu" id="researchList" role="tablist">
                {sortedCategoryKeys.map((categoryKey) => (
                  <button
                    key={categoryKey}
                    className={`list-group-item list-group-item-action research-cat-btn ${
                      activeCategory === categoryKey ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveArticleId(null);
                      setActiveCategory(categoryKey);
                    }}
                    type="button"
                  >
                    {getDisplayTitle(categoryKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-md-9 research-content-wrapper">
              <div className="tab-content research-tab-content" id="nav-tabContent">
                {sortedCategoryKeys.map((categoryKey) => (
                  <div
                    key={categoryKey}
                    id={`category-panel-${categoryKey}`}
                    className={`tab-pane fade ${
                      activeCategory === categoryKey ? 'show active' : ''
                    }`}
                    role="tabpanel"
                  >
                    {renderYearSections(groupedItems[categoryKey])}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
