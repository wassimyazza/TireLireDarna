import { apiCatalog } from "../../services/apiCatalog";
import { ApiSection } from "../../components/ApiSection";

export default function TirelireWorkspace() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Tirelire backend</p>
          <h1>Groups, payments, messaging & admin APIs</h1>
          <p>
            Invoke every Tirelire endpoint (KYC, payments, tickets, messaging,
            admin tools) from a single workspace.
          </p>
        </div>
      </header>
      {apiCatalog.tirelire.map((section) => (
        <ApiSection
          key={section.name}
          title={section.name}
          description={section.description}
          endpoints={section.endpoints}
          service="tirelire"
        />
      ))}
    </div>
  );
}

