import React, { useEffect, useState, useMemo } from 'react';
import { client } from '../client';
import { PortableText } from '@portabletext/react';

// ---------------------------- Helpers ----------------------------

const groupResearchItems = (items) => {
  const grouped = {};
  items.forEach(item => {
    const categoryKey = item.category?.toLowerCase() || 'other';
    const year = item.date ? new Date(item.date).getFullYear().toString() : 'Unknown Year';
    grouped[categoryKey] ??= {};
    grouped[categoryKey][year] ??= [];
    grouped[categoryKey][year].push(item);
  });

  // sort years desc + items by date desc
  Object.keys(grouped).forEach(category => {
    Object.keys(grouped[category]).forEach(yr => {
      grouped[category][yr].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    });
    grouped[category] = Object.fromEntries(
      Object.entries(grouped[category]).sort(([a], [b]) => b.localeCompare(a))
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

  return key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// ---------------------------- Component ----------------------------

export default function Research() {
  const [researchItems, setResearchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeArticleId, setActiveArticleId] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "research"] | order(date desc) {
        _id, title, subtitle, location, category, date,
        periodicalName, periodicity, description
      }`)
      .then(data => {
        setResearchItems(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const groupedItems = useMemo(() => groupResearchItems(researchItems), [researchItems]);

  // ✅ categories sorted A→Z by DISPLAY NAME
  const sortedCategoryKeys = useMemo(() => {
    const keys = Object.keys(groupedItems);
    return keys.sort((a, b) =>
      getDisplayTitle(a).toLowerCase().localeCompare(getDisplayTitle(b).toLowerCase())
    );
  }, [groupedItems]);

  // set initial active category (first in sorted list)
  useEffect(() => {
    if (sortedCategoryKeys.length > 0 && !activeCategory) {
      setActiveCategory(sortedCategoryKeys[0]);
    }
  }, [sortedCategoryKeys, activeCategory]);

  if (loading) return <div>Loading Research Works...</div>;
  if (researchItems.length === 0) return <div>No research works found.</div>;

  const toggleArticle = (id) => {
    setActiveArticleId(prev => (prev === id ? null : id));
  };

  const renderYearSections = (yearData) => {
    if (!yearData || Object.keys(yearData).length === 0) {
      return <p className="p-3 text-muted">No articles found in this category.</p>;
    }

    const years = Object.keys(yearData).sort((a, b) => {
      if (a === 'Unknown Year') return 1;
      if (b === 'Unknown Year') return -1;
      // numeric desc: 2024 before 2023
      return Number(b) - Number(a);
    });

    return (
      <div className="research-year-list">
        {years.map(year => (
          <div className="research-year-block" key={year}>
            {/* Year header (NOT collapsible) */}
            <div className="research-year-header">
              <h5 className="mb-0">{year}</h5>
            </div>

            {/* Single-level accordion for items within this year */}
            <div className="research-accordion" role="tablist" aria-label={`Articles in ${year}`}>
              {yearData[year].map(item => {
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
                      <span className="indicator" aria-hidden="true">{open ? '−' : '+'}</span>
                    </button>

                    <div
                      id={`article-panel-${item._id}`}
                      className={`research-article-panel ${open ? 'show' : ''}`}
                      role="region"
                      aria-labelledby={`article-header-${item._id}`}
                    >
                      <div className="panel-inner">
                        {/* <p className="meta">
                          {item.periodicalName && <>Publication/Venue: <strong>{item.periodicalName}</strong><br/></>}
                          {item.periodicity && <>Periodicity: {item.periodicity}<br/></>}
                          {item.date && <>Date: {item.date}<br/></>}
                          {item.location && <>Location: {item.location}<br/></>}
                        </p> */}

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

  return (
    <section id="research" className="section lb research-section">
      <div className="container">
        {/* ✅ Title aligned like Gallery */}
        <div className="section-title text-left">
          <h3>Research</h3>
        </div>

        <div className="row">
          {/* Left: categories (A→Z) */}
          <div className="col-md-3">
            <div className="list-group vertical-research-menu" id="researchList" role="tablist">
              {sortedCategoryKeys.map(categoryKey => (
                <button
                  key={categoryKey}
                  className={`list-group-item list-group-item-action research-cat-btn ${activeCategory === categoryKey ? 'active' : ''}`}
                  onClick={() => setActiveCategory(categoryKey)}
                  type="button"
                >
                  {getDisplayTitle(categoryKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Right: content panes in the same A→Z order */}
          <div className="col-md-9 research-content-wrapper">
            <div className="tab-content research-tab-content" id="nav-tabContent">
              {sortedCategoryKeys.map(categoryKey => (
                <div
                  key={categoryKey}
                  className={`tab-pane fade ${activeCategory === categoryKey ? 'show active' : ''}`}
                  role="tabpanel"
                >
                  {renderYearSections(groupedItems[categoryKey])}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}