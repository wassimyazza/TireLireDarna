import { apiCatalog } from "../../services/apiCatalog";
import { ApiSection } from "../../components/ApiSection";

export default function DarnaWorkspace() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Darna backend</p>
          <h1>Real-estate + Daret APIs</h1>
          <p>
            Use the explorer below to call every Darna endpoint (auth, property
            listings, groups, chat, notifications, search).
          </p>
        </div>
      </header>
      {apiCatalog.darna.map((section) => (
        <ApiSection
          key={section.name}
          title={section.name}
          description={section.description}
          endpoints={section.endpoints}
          service="darna"
        />
      ))}
    </div>
  );
}

